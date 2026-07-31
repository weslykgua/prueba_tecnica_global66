<template>
  <div class="favorites-view">
    <div class="view-header">
      <h1 class="view-title">Mis Favoritos</h1>
      <p class="view-subtitle">Pokémon guardados en tu colección</p>
    </div>

    <SearchBar
      v-if="favoritesCount > 0"
      v-model="searchQuery"
      :is-searching="isSearching"
      placeholder="Filtrar en mis favoritos..."
    />

    <!-- Active Search Loading State -->
    <PokeballLoader
      v-if="isSearching"
      label="Buscando en tus favoritos..."
    />

    <!-- Empty Favorites State -->
    <EmptyState
      v-else-if="favoritesCount === 0"
      title="No tienes favoritos guardados"
      description="Explora la lista principal y presiona el ícono de estrella para agregar tus Pokémon preferidos."
      action-label="Explorar Pokémon"
      @action="$router.push('/')"
    />

    <!-- Empty Search Results in Favorites -->
    <EmptyState
      v-else-if="paginatedFavorites.length === 0"
      title="No hay coincidencias en favoritos"
      :description="`No encontramos ninguno de tus favoritos que coincida con '${searchQuery}'.`"
      action-label="Limpiar filtro"
      @action="searchQuery = ''"
    />

    <!-- Pokemon Cards Grid & Pagination -->
    <template v-else>
      <PokemonList
        :pokemon-list="paginatedFavorites"
        :is-favorite="isFavorite"
        @select-pokemon="openDetailModal"
        @toggle-favorite="toggleFavorite"
      />

      <Pagination
        :current-page="favPage"
        :total-pages="favTotalPages"
        @change-page="changeFavPage"
      />
    </template>

    <!-- Pokemon Detail Modal -->
    <PokemonDetailModal
      :is-open="isModalOpen"
      :pokemon="selectedPokemon"
      :is-loading="isDetailLoading"
      :is-favorite="selectedPokemon ? isFavorite(selectedPokemon.name) : false"
      @close="closeDetailModal"
      @share="sharePokemon"
      @toggle-favorite="toggleFavorite"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import SearchBar from '@/pokemon/component/SearchBar.vue';
import PokeballLoader from '@/pokemon/component/PokeballLoader.vue';
import EmptyState from '@/pokemon/component/EmptyState.vue';
import PokemonList from '@/pokemon/component/PokemonList.vue';
import PokemonDetailModal from '@/pokemon/component/PokemonDetailModal.vue';
import { usePokemon } from '@/pokemon/composable/usePokemon';
import { useClipboard } from '@/common/utils/useClipboard';
import { useDebounce } from '@/common/utils/useDebounce';
import { ITEMS_PER_PAGE } from '@/pokemon/utils/pokemon.constants';
import Pagination from '@/common/component/Pagination.vue';

const searchQuery = ref('');
const debouncedSearch = useDebounce(searchQuery, 250);
const isSearching = ref(false);
const favPage = ref(1);

watch(searchQuery, (newVal) => {
  if (newVal.trim() !== debouncedSearch.value.trim()) {
    isSearching.value = true;
  }
});

watch(debouncedSearch, () => {
  isSearching.value = false;
  favPage.value = 1;
});

const {
  isModalOpen,
  isDetailLoading,
  selectedPokemon,
  favoritesCount,
  favoritesList,
  isFavorite,
  toggleFavorite,
  openDetailModal,
  closeDetailModal,
} = usePokemon();

const { sharePokemon } = useClipboard();

const filteredFavorites = computed(() => {
  const query = debouncedSearch.value.trim().toLowerCase();
  if (!query) return favoritesList.value;
  return favoritesList.value.filter(item => item.name.toLowerCase().includes(query));
});

const favTotalPages = computed(() => {
  return Math.ceil(filteredFavorites.value.length / ITEMS_PER_PAGE);
});

const paginatedFavorites = computed(() => {
  const start = (favPage.value - 1) * ITEMS_PER_PAGE;
  return filteredFavorites.value.slice(start, start + ITEMS_PER_PAGE);
});

const changeFavPage = (page: number) => {
  if (page >= 1 && page <= favTotalPages.value) {
    favPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;

.favorites-view {
  width: 100%;
}

.view-header {
  margin-bottom: 2rem;
  text-align: center;
}

.view-title {
  font-size: 1.85rem;
  font-weight: 700;
  color: $secondary-color;
}

.view-subtitle {
  color: $text-muted;
  font-size: 1rem;
}
</style>
