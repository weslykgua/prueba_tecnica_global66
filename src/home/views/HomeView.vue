<template>
  <div class="home-view">
    <SearchBar
      v-if="!isLoading && !error && (paginatedPokemonList.length > 0 || isSearching)"
      v-model="searchQuery"
      :is-searching="isSearching"
      placeholder="Procurar Pókemon..."
    />

    <div v-if="isLoading && paginatedPokemonList.length === 0" class="loader-container">
      <PokeballLoader />
    </div>

    <div v-else-if="isSearching" class="loader-container">
      <PokeballLoader />
    </div>

    <ErrorState
      v-else-if="error && paginatedPokemonList.length === 0"
      :image="errorIllustration"
      title="Algo salió mal..."
      :subtitle="error"
      text-button="Reintentar"
      :action="retryFetch"
    />

    <EmptyState
      v-else-if="paginatedPokemonList.length === 0 && !isLoading"
      title="No se encontraron Pokémon"
      :description="`No encontramos ningún Pokémon que coincida con '${searchQuery}'.`"
      action-label="Limpiar búsqueda"
      @action="searchQuery = ''"
    />

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
import errorIllustration from '@/assets/error_illustration.svg';
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
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.loader-container {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}
</style>
