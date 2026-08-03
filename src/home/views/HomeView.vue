<template>
  <div class="home-view">
    <div v-if="isLoading && paginatedPokemonList.length === 0" class="loader-container">
      <PokeballLoader />
    </div>

    <InfoState
      v-else-if="error && paginatedPokemonList.length === 0"
      :image="emptyStateIllustration"
      :title="HomeTexts.errorTitle"
      :subtitle="error"
      :text-button="HomeTexts.retryButton"
      :action="retryFetch"
    />

    <template v-else>
      <div class="sticky-controls">
        <SearchBar
          v-model="searchQuery"
          :is-searching="isSearching || isLoading"
          :placeholder="HomeTexts.searchPlaceholder"
          @open-filter="isFilterModalOpen = true"
        />

        <SearchResultsBar
          v-if="searchQuery.trim() !== '' || selectedTypes.length > 0"
          :count="paginatedPokemonList.length"
          @clear="handleClearFilters"
        />
      </div>

      <div v-if="isSearching || isLoading" class="loader-container">
        <PokeballLoader />
      </div>

      <InfoState
        v-else-if="paginatedPokemonList.length === 0"
        :title="HomeTexts.emptyTitle"
        :description="HomeTexts.emptyDescription"
        :action-label="HomeTexts.clearSearchButton"
        @action="handleClearFilters"
      />

      <template v-else>
        <PokemonList
          :pokemon-list="paginatedPokemonList"
          :is-favorite="isFavorite"
          @select-pokemon="onSelectPokemon"
          @toggle-favorite="toggleFavorite"
        />
      </template>
    </template>

    <FilterModal
      :is-open="isFilterModalOpen"
      :selected-types="selectedTypes"
      @close="isFilterModalOpen = false"
      @apply="handleApplyTypeFilters"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onActivated, onDeactivated } from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import emptyStateIllustration from '@/assets/images/illustrations/empty_state_illustration_fish.svg';
import { usePokemon } from '@/pokemon/composable/usePokemon';
import SearchBar from '@/pokemon/component/SearchBar.vue';
import PokeballLoader from '@/pokemon/component/PokeballLoader.vue';
import PokemonList from '@/pokemon/component/PokemonList.vue';
import FilterModal from '@/pokemon/component/FilterModal.vue';
import InfoState from '@/common/component/InfoState.vue';
import SearchResultsBar from '@/pokemon/component/SearchResultsBar.vue';
import HomeTexts from '../text/home.texts';
import { PokemonType } from '@/pokemon/type/PokemonType';

const router = useRouter();
const isFilterModalOpen = ref(false);
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
  searchQuery,
  isSearching,
  isLoading,
  error,
  paginatedPokemonList,
  selectedTypes,
  applyTypeFilters,
  clearFilters,
  isFavorite,
  toggleFavorite,
  retryFetch,
} = usePokemon();

const handleClearFilters = () => {
  scrollPosition.value = 0;
  clearFilters();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleApplyTypeFilters = (types: PokemonType[]) => {
  scrollPosition.value = 0;
  applyTypeFilters(types);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/sizes' as *;

.home-view {
  width: $size-100-percent;
  height: $size-100-percent;
  flex: 1;
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  min-height: $size-100-percent;
  max-width: $size-800px;
  margin: $size-0px $size-auto;
}

.sticky-controls {
  position: sticky;
  top: 0;
  z-index: 20;
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  width: $size-100-percent;
  padding: $size-8px $size-0px $size-8px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.loader-container {
  width: $size-100-percent;
  height: $size-100-percent;
  flex: 1;
  display: var(--display-flex);
  align-items: var(--align-center);
  justify-content: var(--justify-center);
  min-height: $size-100-percent;
}
</style>
