import { ref, computed, watch, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import { usePokemonStore } from '../local/store/pokemon.store';
import { useFavoritesStore } from '../local/store/favorites.store';
import { useDebounce } from '../../common/utils/useDebounce';
import PokemonDetail from '../model/PokemonDetail';
import PokemonListItem from '../model/PokemonListItem';
import { pokemonApi } from '../remote/api/pokemon.api';
import { PokemonType } from '../type/PokemonType';
import { PokemonListItemMapper } from '../mapper/PokemonListMapper';

export function usePokemon(api = pokemonApi) {
  const pokemonStore = usePokemonStore();
  const favoritesStore = useFavoritesStore();

  const searchQuery = ref('');
  const debouncedSearch = useDebounce(searchQuery, 250);
  const isSearching = ref(false);
  const isModalOpen = ref(false);
  const visibleCount = ref(30);

  watch(searchQuery, newVal => {
    if (newVal.trim() !== debouncedSearch.value.trim()) {
      isSearching.value = true;
    }
  });

  watch(debouncedSearch, () => {
    isSearching.value = false;
    visibleCount.value = 30;
  });

  const fetchPokemonList = async (limit?: number, force = false): Promise<void> => {
    if (pokemonStore.isInitialized && !force && pokemonStore.pokemonList.length > 0) {
      return;
    }

    pokemonStore.setLoading(true);
    pokemonStore.setError(undefined);

    try {
      const list = await api.getPokemonList(limit);
      pokemonStore.setPokemonList(list);
    } catch (err: unknown) {
      pokemonStore.setError(
        'No pudimos cargar la información en este momento. Verifica tu conexión o intenta nuevamente más tarde.'
      );
    } finally {
      pokemonStore.setLoading(false);
    }
  };

  const loadMore = () => {
    if (visibleCount.value < pokemonList.value.length) {
      visibleCount.value += 30;
    }
  };

  const handleScroll = (event?: Event) => {
    let scrollBottom = 0;
    if (event?.target && event.target !== document && event.target !== window) {
      const target = event.target as HTMLElement;
      scrollBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
    } else {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      scrollBottom = documentHeight - (scrollTop + windowHeight);
    }

    if (scrollBottom < 600) {
      loadMore();
    }
  };

  if (getCurrentInstance()) {
    onMounted(() => {
      if (!pokemonStore.isInitialized) {
        fetchPokemonList();
      }
      window.addEventListener('scroll', handleScroll, { passive: true });
      document.addEventListener('scroll', handleScroll, { passive: true });
      const dashboardContainer = document.querySelector('.dashboard-content');
      if (dashboardContainer) {
        dashboardContainer.addEventListener('scroll', handleScroll, { passive: true });
      }
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      const dashboardContainer = document.querySelector('.dashboard-content');
      if (dashboardContainer) {
        dashboardContainer.removeEventListener('scroll', handleScroll);
      }
    });
  }

  const fetchPokemonDetail = async (id: number): Promise<PokemonDetail | undefined> => {
    pokemonStore.setDetailLoading(true);
    pokemonStore.setError(undefined);

    try {
      const detail = await api.getPokemonDetail(id);
      pokemonStore.setSelectedPokemon(detail);
      return detail;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Ha ocurrido un error al cargar el detalle del Pokémon.';

      pokemonStore.setError(errorMessage);
      return undefined;
    } finally {
      pokemonStore.setDetailLoading(false);
    }
  };

  const selectedTypes = ref<PokemonType[]>([]);

  const favoritesList = computed<PokemonListItem[]>(() => {
    return pokemonStore.pokemonList.filter(item =>
      favoritesStore.favoriteNames.has(item.name.toLowerCase())
    );
  });

  const filteredPokemonList = ref<PokemonListItem[] | undefined>();

  const pokemonList = computed<PokemonListItem[]>(() => {
    const list: PokemonListItem[] = []

    if (filteredPokemonList.value != undefined) {
      list.push(...filteredPokemonList.value);

    } else {
      list.push(...PokemonListItemMapper.fromLocalArray(pokemonStore.pokemonList));
    }

    return filterByQuery(debouncedSearch.value, list)
  });

  const filterByQuery = (
    query: string,
    pokemonList: PokemonListItem[]
  ) => {
    const queryParsed = query.trim().toLowerCase()

    return pokemonList.filter(pokemon => {
      const matchesQuery =
        !queryParsed
        || pokemon.name.toLowerCase().includes(queryParsed)
        || String(pokemon.id).includes(queryParsed);

      return matchesQuery;
    });
  }

  const totalPages = computed(() => {
    return Math.ceil(pokemonList.value.length / 30);
  });

  const paginatedPokemonList = computed<PokemonListItem[]>(() => {
    return pokemonList.value.slice(0, visibleCount.value);
  });

  const isFavorite = (name: string): boolean => {
    return favoritesStore.isFavorite(name);
  };

  const toggleFavorite = (name: string) => {
    favoritesStore.toggleFavorite(name);
  };

  const openDetailModal = async (id: number) => {
    isModalOpen.value = true;
    await fetchPokemonDetail(id);
  };

  const closeDetailModal = () => {
    isModalOpen.value = false;
    pokemonStore.clearSelectedPokemon();
  };

  const retryFetch = () => {
    fetchPokemonList(undefined, true);
  };

  const loadFilter = async () => {
    pokemonStore.setLoading(true);

    const pokemons: PokemonListItem[] = await pokemonApi.getPokemonsByTypes(selectedTypes.value)

    filteredPokemonList.value = filterByQuery(debouncedSearch.value, pokemons)

    pokemonStore.setLoading(false);
  };

  return {
    searchQuery,
    debouncedSearch,
    isSearching,
    isModalOpen,
    currentPage: computed(() => Math.ceil(visibleCount.value / 30)),
    totalPages,

    isLoading: computed(() => pokemonStore.isLoading),
    isDetailLoading: computed(() => pokemonStore.isDetailLoading),
    error: computed(() => pokemonStore.error),
    selectedPokemon: computed(() => pokemonStore.selectedPokemon),
    favoritesCount: computed(() => favoritesStore.favoritesCount),
    favoritesList,
    totalCount: computed(() => pokemonStore.pokemonList.length),
    filteredPokemonList: computed(() => filteredPokemonList.value ?? pokemonStore.pokemonList),
    paginatedPokemonList,

    selectedTypes,
    applyTypeFilters: (types: PokemonType[]) => {
      selectedTypes.value = types;
      visibleCount.value = 30;
      loadFilter();
    },
    clearFilters: () => {
      searchQuery.value = '';
      selectedTypes.value = [];
      visibleCount.value = 30;
      filteredPokemonList.value = undefined;
    },

    fetchPokemonList,
    fetchPokemonDetail,
    loadMore,
    isFavorite,
    toggleFavorite,
    openDetailModal,
    closeDetailModal,
    retryFetch,
  };
}
