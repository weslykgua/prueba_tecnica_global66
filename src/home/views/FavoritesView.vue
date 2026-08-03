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
import { ref, onActivated, onDeactivated } from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import InfoState from '@/common/component/InfoState.vue';
import ViewHeader from '@/common/component/ViewHeader.vue';
import emptyStateIllustration from '@/assets/images/illustrations/empty_state_illustration_fish.svg';
import PokemonList from '@/pokemon/component/PokemonList.vue';
import { usePokemon } from '@/pokemon/composable/usePokemon';
import FavoritesTexts from '../text/favorites.texts';

const router = useRouter();
const scrollPosition = ref(0);

const saveScrollPosition = () => {
  scrollPosition.value = window.scrollY || document.documentElement.scrollTop || 0;
};

onDeactivated(() => {
  saveScrollPosition();
});

onBeforeRouteLeave(() => {
  saveScrollPosition();
});

onActivated(() => {
  window.scrollTo({
    top: scrollPosition.value,
    behavior: 'instant',
  });
  requestAnimationFrame(() => {
    window.scrollTo({
      top: scrollPosition.value,
      behavior: 'instant',
    });
  });
});

const onSelectPokemon = (id: number) => {
  saveScrollPosition();
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
  width: $size-100-percent;
  height: $size-100-percent;
  flex: 1;
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  justify-content: var(--justify-flex-start);
  min-height: $size-100-percent;
  max-width: $size-800px;
  margin: $size-0px $size-auto;
}
</style>
