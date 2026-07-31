<template>
  <div class="home-view">
    <SearchBar v-model="searchQuery" placeholder="Buscar por nombre o número de Pokédex..." />

    <!-- Initial Loading State -->
    <PokeballLoader v-if="isLoading && filteredPokemonList.length === 0" label="Descubriendo Pokémon..." />

    <!-- Network / Fetch Error State -->
    <ErrorState
      v-else-if="error && filteredPokemonList.length === 0"
      :message="error"
      @retry="retryFetch"
    />

    <!-- Empty Search Results State -->
    <EmptyState
      v-else-if="filteredPokemonList.length === 0"
      title="No se encontraron Pokémon"
      :description="`No encontramos ningún Pokémon que coincida con '${searchQuery}'.`"
      action-label="Limpiar búsqueda"
      @action="searchQuery = ''"
    />

    <!-- Pokemon Cards Grid -->
    <PokemonList
      v-else
      :pokemon-list="filteredPokemonList"
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
import SearchBar from '../components/common/SearchBar.vue';
import PokeballLoader from '../components/common/PokeballLoader.vue';
import ErrorState from '../components/common/ErrorState.vue';
import EmptyState from '../components/common/EmptyState.vue';
import PokemonList from '../components/pokemon/PokemonList.vue';
import PokemonDetailModal from '../components/pokemon/PokemonDetailModal.vue';
import { usePokemon } from '../composables/usePokemon';
import { useClipboard } from '../composables/useClipboard';

const {
  searchQuery,
  isLoading,
  isDetailLoading,
  error,
  filteredPokemonList,
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
