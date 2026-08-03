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
      <SearchBar
        v-model="searchQuery"
        :is-searching="isSearching"
        :placeholder="HomeTexts.searchPlaceholder"
        @open-filter="isFilterModalOpen = true"
      />

      <div v-if="isSearching" class="loader-container">
        <PokeballLoader />
      </div>

      <InfoState
        v-else-if="paginatedPokemonList.length === 0"
        :title="HomeTexts.emptyTitle"
        :description="HomeTexts.emptyDescription"
        :action-label="HomeTexts.clearSearchButton"
        @action="clearFilters"
      />

      <template v-else>
        <SearchResultsBar
          v-if="searchQuery.trim() !== '' || selectedTypes.length > 0"
          :count="paginatedPokemonList.length"
          @clear="clearFilters"
        />

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
      @apply="applyTypeFilters"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import emptyStateIllustration from '@/assets/images/illustrations/empty_state_illustration_fish.svg';
import { usePokemon } from '@/pokemon/composable/usePokemon';
import SearchBar from '@/pokemon/component/SearchBar.vue';
import PokeballLoader from '@/pokemon/component/PokeballLoader.vue';
import PokemonList from '@/pokemon/component/PokemonList.vue';
import { useRouter } from 'vue-router';
import FilterModal from '@/pokemon/component/FilterModal.vue';
import InfoState from '@/common/component/InfoState.vue';
import SearchResultsBar from '@/pokemon/component/SearchResultsBar.vue';
import HomeTexts from '../text/home.texts';

const router = useRouter();
const isFilterModalOpen = ref(false);

const onSelectPokemon = (id: number) => {
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
