import { ref, computed, onMounted, getCurrentInstance } from 'vue';
import { usePokemonStore } from '../stores/usePokemonStore';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import { pokemonService } from '../services/pokemon.service';
import { useDebounce } from './useDebounce';
import { ActiveTab, PokemonListItem, PokemonDetail } from '../types/pokemon.types';

/**
 * Main orchestrator composable handling remote API calls and state synchronization with Pinia stores.
 */
export function usePokemon() {
  const pokemonStore = usePokemonStore();
  const favoritesStore = useFavoritesStore();

  const searchQuery = ref('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const activeTab = ref<ActiveTab>('all');
  const isModalOpen = ref(false);

  // API Call: Fetch Pokemon List
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
    activeTab,
    isModalOpen,

    // Store Proxies
    isLoading: computed(() => pokemonStore.isLoading),
    isDetailLoading: computed(() => pokemonStore.isDetailLoading),
    error: computed(() => pokemonStore.error),
    selectedPokemon: computed(() => pokemonStore.selectedPokemon),
    favoritesCount: computed(() => favoritesStore.favoritesCount),
    favoritesList,
    totalCount: computed(() => pokemonStore.pokemonList.length),
    filteredPokemonList,

    // Actions
    fetchPokemonList,
    fetchPokemonDetail,
    isFavorite,
    toggleFavorite,
    openDetailModal,
    closeDetailModal,
    retryFetch,
  };
}
