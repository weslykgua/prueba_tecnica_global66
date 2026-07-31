import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue';
import { usePokemonStore } from '../../stores/usePokemonStore';
import { useFavoritesStore } from '../../stores/useFavoritesStore';
import { PokemonRepositoryImpl } from '../../data/repositories/pokemon.repository.impl';
import { IPokemonRepository } from '../../domain/repositories/pokemon.repository';
import { GetPokemonListUseCase } from '../../domain/usecases/getPokemonList.usecase';
import { GetPokemonDetailUseCase } from '../../domain/usecases/getPokemonDetail.usecase';
import { useDebounce } from '../../composables/useDebounce';
import { ActiveTabEntity, PokemonListItemEntity, PokemonDetailEntity } from '../../domain/entities/pokemon.entity';
import { ITEMS_PER_PAGE } from '../../constants/pokemon.constants';

/**
 * Presentation ViewModel for Pokemon catalog views.
 * Bridges Vue Templates (Views) with Domain UseCases and Pinia Local Stores.
 */
export function usePokemonViewModel(
  repository: IPokemonRepository = new PokemonRepositoryImpl()
) {
  const pokemonStore = usePokemonStore();
  const favoritesStore = useFavoritesStore();

  const getPokemonListUseCase = new GetPokemonListUseCase(repository);
  const getPokemonDetailUseCase = new GetPokemonDetailUseCase(repository);

  const searchQuery = ref('');
  const debouncedSearch = useDebounce(searchQuery, 250);
  const isSearching = ref(false);
  const activeTab = ref<ActiveTabEntity>('all');
  const isModalOpen = ref(false);
  const currentPage = ref(1);

  watch(searchQuery, (newVal) => {
    if (newVal.trim() !== debouncedSearch.value.trim()) {
      isSearching.value = true;
    }
  });

  watch(debouncedSearch, () => {
    isSearching.value = false;
    currentPage.value = 1;
  });

  watch(activeTab, () => {
    currentPage.value = 1;
  });

  const fetchPokemonList = async (limit?: number, force = false): Promise<void> => {
    if (pokemonStore.isInitialized && !force && pokemonStore.pokemonList.length > 0) return;

    pokemonStore.setLoading(true);
    pokemonStore.setError(null);

    try {
      const list = await getPokemonListUseCase.execute(limit);
      pokemonStore.setPokemonList(list);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ha ocurrido un error inesperado al obtener la lista de Pokémon.';
      pokemonStore.setError(errorMessage);
    } finally {
      pokemonStore.setLoading(false);
    }
  };

  const fetchPokemonDetail = async (name: string): Promise<PokemonDetailEntity | null> => {
    pokemonStore.setDetailLoading(true);
    pokemonStore.setError(null);

    try {
      const detail = await getPokemonDetailUseCase.execute(name);
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

  const favoritesList = computed<PokemonListItemEntity[]>(() => {
    return pokemonStore.pokemonList.filter(item => favoritesStore.favoriteNames.has(item.name.toLowerCase()));
  });

  const filteredPokemonList = computed<PokemonListItemEntity[]>(() => {
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

  const totalPages = computed(() => {
    return Math.ceil(filteredPokemonList.value.length / ITEMS_PER_PAGE);
  });

  const paginatedPokemonList = computed<PokemonListItemEntity[]>(() => {
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
    searchQuery,
    debouncedSearch,
    isSearching,
    activeTab,
    isModalOpen,
    currentPage,
    totalPages,

    isLoading: computed(() => pokemonStore.isLoading),
    isDetailLoading: computed(() => pokemonStore.isDetailLoading),
    error: computed(() => pokemonStore.error),
    selectedPokemon: computed(() => pokemonStore.selectedPokemon),
    favoritesCount: computed(() => favoritesStore.favoritesCount),
    favoritesList,
    totalCount: computed(() => pokemonStore.pokemonList.length),
    filteredPokemonList,
    paginatedPokemonList,

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
