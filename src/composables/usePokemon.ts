import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue';
import { usePokemonStore } from '../stores/usePokemonStore';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import { pokemonService } from '../services/pokemon.service';
import { useDebounce } from './useDebounce';
import { ActiveTab, PokemonListItem, PokemonDetail } from '../types/pokemon.types';
import { ITEMS_PER_PAGE } from '../constants/pokemon.constants';

/**
 * Main orchestrator composable handling remote API calls, search feedback, pagination, and Pinia stores.
 */
export function usePokemon() {
  const pokemonStore = usePokemonStore();
  const favoritesStore = useFavoritesStore();

  const searchQuery = ref('');
  const debouncedSearch = useDebounce(searchQuery, 250);
  const isSearching = ref(false);
  const activeTab = ref<ActiveTab>('all');
  const isModalOpen = ref(false);
  const currentPage = ref(1);

  // Set isSearching indicator while typing and debouncing
  watch(searchQuery, (newVal) => {
    if (newVal.trim() !== debouncedSearch.value.trim()) {
      isSearching.value = true;
    }
  });

  watch(debouncedSearch, () => {
    isSearching.value = false;
    currentPage.value = 1; // Reset to page 1 on new search query
  });

  watch(activeTab, () => {
    currentPage.value = 1; // Reset to page 1 on tab change
  });

  // API Call: Fetch Pokemon List (Complete catalog)
  const fetchPokemonList = async (limit?: number, force = false): Promise<void> => {
    if (pokemonStore.isInitialized && !force && pokemonStore.pokemonList.length > 0) return;

    pokemonStore.setLoading(true);
    pokemonStore.setError(null);

    try {
      const list = await pokemonService.getPokemonList(limit);
      pokemonStore.setPokemonList(list);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ha ocurrido un error inesperado al obtener la lista de Pokémon.';
      pokemonStore.setError(errorMessage);
    } finally {
      pokemonStore.setLoading(false);
    }
  };

  // API Call: Fetch Pokemon Detail
  const fetchPokemonDetail = async (name: string): Promise<PokemonDetail | null> => {
    pokemonStore.setDetailLoading(true);
    pokemonStore.setError(null);

    try {
      const detail = await pokemonService.getPokemonDetail(name);
      pokemonStore.setSelectedPokemon(detail);
      return detail;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ha ocurrido un error al cargar el detalle del Pokémon.';
      pokemonStore.setError(errorMessage);
      return null;
    } finally {
      pokemonStore.setDetailLoading(false);
    }
  };

  if (getCurrentInstance()) {
    onMounted(() => {
      if (!pokemonStore.isInitialized) {
        fetchPokemonList();
      }
    });
  }

  // Computed: Favorites derived from local favoritesStore and pokemonStore list
  const favoritesList = computed<PokemonListItem[]>(() => {
    return pokemonStore.pokemonList.filter(item => favoritesStore.favoriteNames.has(item.name.toLowerCase()));
  });

  // Computed: Filtered list based on active tab and search query
  const filteredPokemonList = computed<PokemonListItem[]>(() => {
    const baseList = activeTab.value === 'favorites' ? favoritesList.value : pokemonStore.pokemonList;
    const query = debouncedSearch.value.trim().toLowerCase();

    if (!query) {
      return baseList;
    }

    return baseList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query) ||
      String(pokemon.id).includes(query)
    );
  });

  // Pagination Computations
  const totalPages = computed(() => {
    return Math.ceil(filteredPokemonList.value.length / ITEMS_PER_PAGE);
  });

  const paginatedPokemonList = computed<PokemonListItem[]>(() => {
    const start = (currentPage.value - 1) * ITEMS_PER_PAGE;
    return filteredPokemonList.value.slice(start, start + ITEMS_PER_PAGE);
  });

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isFavorite = (name: string): boolean => {
    return favoritesStore.isFavorite(name);
  };

  const toggleFavorite = (name: string) => {
    favoritesStore.toggleFavorite(name);
  };

  const openDetailModal = async (name: string) => {
    isModalOpen.value = true;
    await fetchPokemonDetail(name);
  };

  const closeDetailModal = () => {
    isModalOpen.value = false;
    pokemonStore.clearSelectedPokemon();
  };

  const retryFetch = () => {
    fetchPokemonList(undefined, true);
  };

  return {
    // State & Filters
    searchQuery,
    debouncedSearch,
    isSearching,
    activeTab,
    isModalOpen,
    currentPage,
    totalPages,

    // Store Proxies
    isLoading: computed(() => pokemonStore.isLoading),
    isDetailLoading: computed(() => pokemonStore.isDetailLoading),
    error: computed(() => pokemonStore.error),
    selectedPokemon: computed(() => pokemonStore.selectedPokemon),
    favoritesCount: computed(() => favoritesStore.favoritesCount),
    favoritesList,
    totalCount: computed(() => pokemonStore.pokemonList.length),
    filteredPokemonList,
    paginatedPokemonList,

    // Actions
    fetchPokemonList,
    fetchPokemonDetail,
    changePage,
    isFavorite,
    toggleFavorite,
    openDetailModal,
    closeDetailModal,
    retryFetch,
  };
}
