<template>
  <div class="search-results-bar">
    <span class="search-results-count">
      {{ SearchTexts.resultsPrefix }}
      <strong class="count-highlight"
        >{{ count }}
        {{
          count === 1 ? SearchTexts.resultsSuffixSingular : SearchTexts.resultsSuffixPlural
        }}</strong
      >
    </span>
    <button type="button" class="clear-filter-btn" @click="$emit('clear')">
      {{ SearchTexts.clearFilterButton }}
    </button>
  </div>
</template>

<script setup lang="ts">
import SearchTexts from '../text/search.texts';

defineProps<{
  count: number;
}>();

defineEmits<{
  (e: 'clear'): void;
}>();
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/variables' as *;

.search-results-bar {
  display: var(--display-flex);
  justify-content: var(--justify-between);
  align-items: var(--align-center);
  width: calc(#{$size-100-percent} - #{$size-46px});
  margin: $size-8px $size-30px $size-16px $size-16px;
  padding: $size-0px;
  box-sizing: var(--border-box);
  gap: $size-4px;
  white-space: nowrap;

  @media (min-width: $bp-tablet) {
    max-width: $size-820px;
  }

  @media (min-width: $bp-desktop) {
    max-width: $size-1100px;
  }
}

.search-results-count {
  font-family: $font-family;
  font-weight: $font-weight-500;
  font-size: $font-size-14;
  line-height: 1.4;
  color: $color-9e9e9e;
  display: var(--display-inline-flex);
  gap: $size-4px;
  align-items: var(--align-center);
  white-space: nowrap;
  flex-shrink: 1;
  min-width: $size-0px;
  overflow: var(--overflow-hidden);
  text-overflow: ellipsis;

  .count-highlight {
    font-weight: $font-weight-700;
    color: $color-9e9e9e;
    white-space: nowrap;
  }
}

.clear-filter-btn {
  background: none;
  border: var(--border-none);
  padding: $size-0px;
  cursor: pointer;
  font-family: $font-family;
  font-weight: $font-weight-500;
  font-size: $font-size-14;
  line-height: 1.4;
  color: $color-1e88e5;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: $size-4px;
  text-decoration: underline;
  text-decoration-style: solid;
  text-decoration-thickness: auto;
  text-underline-offset: 0%;

  &:hover {
    color: $color-1565c0;
  }
}
</style>
