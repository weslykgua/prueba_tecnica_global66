<template>
  <div class="favorites-view">
    <div class="view-header">
      <h1 class="view-title">Mis Favoritos</h1>
      <p class="view-subtitle">Pokémon guardados en tu colección</p>
    </div>

    <SearchBar
      v-if="favoritesCount > 0"
      v-model="searchQuery"
      placeholder="Filtrar en mis favoritos..."
    />

    <!-- Empty Favorites State -->
    <EmptyState
      v-if="favoritesCount === 0"
      title="No tienes favoritos guardados"
      description="Explora la lista principal y presiona el ícono de estrella para agregar tus Pokémon preferidos."
      action-label="Explorar Pokémon"
      @action="$router.push('/')"
    />

    <!-- Empty Search Results in Favorites -->
    <EmptyState
      v-else-if="filteredFavorites.length === 0"
      title="No hay coincidencias en favoritos"
      :description="`No encontramos ninguno de tus favoritos que coincida con '${searchQuery}'.`"
      action-label="Limpiar filtro"
      @action="searchQuery = ''"
    />

    <!-- Pokemon Cards Grid -->
    <PokemonList
      v-else
      :pokemon-list="filteredFavorites"
      :is-favorite="isFavorite"
      @select-pokemon="openDetailModal"
      @toggle-favorite="toggleFavorite"
    />

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
import { ref, computed } from 'vue';
import SearchBar from '../components/common/SearchBar.vue';
import EmptyState from '../components/common/EmptyState.vue';
import PokemonList from '../components/pokemon/PokemonList.vue';
import PokemonDetailModal from '../components/pokemon/PokemonDetailModal.vue';
import { usePokemon } from '../composables/usePokemon';
import { useClipboard } from '../composables/useClipboard';
import { useDebounce } from '../composables/useDebounce';

const searchQuery = ref('');
const debouncedSearch = useDebounce(searchQuery, 300);

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
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

.favorites-view {
  width: 100%;
}

.view-header {
  margin-bottom: 2rem;
  text-align: center;
}

.view-title {
  font-size: 2rem;
  font-weight: 800;
  color: $secondary-color;
  text-shadow: 0 2px 10px rgba(255, 203, 5, 0.2);
}

.view-subtitle {
  color: $text-muted;
  font-size: 1rem;
}
</style>
