<template>
  <div class="home-view">
    <div class="loader-container">
      <PokeballLoader />
    </div>

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
import PokeballLoader from '@/pokemon/component/PokeballLoader.vue';
import PokemonDetailModal from '@/pokemon/component/PokemonDetailModal.vue';

const {
  isDetailLoading,
  selectedPokemon,
  isModalOpen,
  isFavorite,
  toggleFavorite,
  closeDetailModal,
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
  align-items: center;
  justify-content: center;
}

.loader-container {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
