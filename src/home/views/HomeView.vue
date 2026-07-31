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
import { usePokemon } from '@/pokemon/composable/usePokemon';
import { useClipboard } from '@/common/utils/useClipboard';
import SearchBar from '@/pokemon/component/SearchBar.vue';
import PokeballLoader from '@/pokemon/component/PokeballLoader.vue';
import EmptyState from '@/pokemon/component/EmptyState.vue';
import PokemonList from '@/pokemon/component/PokemonList.vue';
import PokemonDetailModal from '@/pokemon/component/PokemonDetailModal.vue';
import ErrorState from '@/common/component/ErrorState.vue';
import Pagination from '@/common/component/Pagination.vue';

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
