<template>
  <div class="favorites-view">
    <InfoState
      v-if="favoritesCount === 0"
      :image="emptyStateIllustration"
      :title="FavoritesTexts.emptyTitle"
      :subtitle="FavoritesTexts.emptySubtitle"
    />

    <template v-else>
      <ViewHeader :title="FavoritesTexts.headerTitle" />

      <PokemonList
        :pokemon-list="favoritesList"
        :is-favorite="isFavorite"
        :enable-swipe="true"
        @select-pokemon="onSelectPokemon"
        @toggle-favorite="toggleFavorite"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import InfoState from '@/common/component/InfoState.vue';
import { useRouter } from 'vue-router';
import ViewHeader from '@/common/component/ViewHeader.vue';
import emptyStateIllustration from '@/assets/images/illustrations/empty_state_illustration_fish.svg';
import PokemonList from '@/pokemon/component/PokemonList.vue';
import { usePokemon } from '@/pokemon/composable/usePokemon';
import FavoritesTexts from '../text/favorites.texts';

const router = useRouter();

const onSelectPokemon = (id: number) => {
  router.push(`/pokemon/${id}`);
};

const {
  favoritesCount,
  favoritesList,
  isFavorite,
  toggleFavorite,
} = usePokemon();
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;

.favorites-view {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100%;
  max-width: 800px;
  margin: 0 auto;
}
</style>
