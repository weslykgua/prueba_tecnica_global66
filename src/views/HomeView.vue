<template>
  <div class="home-view">
    <SearchBar
      v-model="searchQuery"
      :is-searching="isSearching"
      placeholder="Buscar por nombre o número de Pokédex..."
    />

    <!-- Initial Loading State -->
    <PokeballLoader v-if="isLoading && paginatedPokemonList.length === 0" label="Descubriendo Pokémon..." />

    <!-- Active Search Loading State -->
    <PokeballLoader v-else-if="isSearching" label="Buscando en la Pokédex..." />

    <!-- Network / Fetch Error State -->
    <ErrorState
      v-else-if="error && paginatedPokemonList.length === 0"
      :message="error"
      @retry="retryFetch"
    />

    <!-- Empty Search Results State -->
    <EmptyState
      v-else-if="paginatedPokemonList.length === 0"
      title="No se encontraron Pokémon"
      :description="`No encontramos ningún Pokémon que coincida con '${searchQuery}'.`"
      action-label="Limpiar búsqueda"
      @action="searchQuery = ''"
    />

    <!-- Pokemon Cards Grid & Pagination -->
    <template v-else>
      <PokemonList
        :pokemon-list="paginatedPokemonList"
        :is-favorite="isFavorite"
        @select-pokemon="openDetailModal"
        @toggle-favorite="toggleFavorite"
      />

      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @change-page="changePage"
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
import SearchBar from '../components/common/SearchBar.vue';
import PokeballLoader from '../components/common/PokeballLoader.vue';
import ErrorState from '../components/common/ErrorState.vue';
import EmptyState from '../components/common/EmptyState.vue';
import Pagination from '../components/common/Pagination.vue';
import PokemonList from '../components/pokemon/PokemonList.vue';
import PokemonDetailModal from '../components/pokemon/PokemonDetailModal.vue';
import { usePokemon } from '../composables/usePokemon';
import { useClipboard } from '../composables/useClipboard';

const {
  searchQuery,
  isSearching,
  isLoading,
  isDetailLoading,
  error,
  paginatedPokemonList,
  currentPage,
  totalPages,
  changePage,
  selectedPokemon,
  isModalOpen,
  isFavorite,
  toggleFavorite,
  openDetailModal,
  closeDetailModal,
  retryFetch,
} = usePokemon();

const { sharePokemon } = useClipboard();
</script>

<style lang="scss" scoped>
.home-view {
  width: 100%;
}
</style>
