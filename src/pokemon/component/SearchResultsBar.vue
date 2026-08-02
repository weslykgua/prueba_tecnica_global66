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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 46px);
  margin: 8px 30px 16px 16px;
  padding: 0;
  box-sizing: border-box;
  gap: 4px;
  white-space: nowrap;

  @media (min-width: $bp-tablet) {
    max-width: 820px;
  }

  @media (min-width: $bp-desktop) {
    max-width: 1100px;
  }
}

.search-results-count {
  font-family: $font-family;
  font-weight: $font-weight-500;
  font-size: $font-size-14;
  line-height: 1.4;
  color: $color-9e9e9e;
  display: inline-flex;
  gap: 4px;
  align-items: center;
  white-space: nowrap;
  flex-shrink: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;

  .count-highlight {
    font-weight: $font-weight-700;
    color: $color-9e9e9e;
    white-space: nowrap;
  }
}

.clear-filter-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: $font-family;
  font-weight: $font-weight-500;
  font-size: $font-size-14;
  line-height: 1.4;
  color: $color-1e88e5;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 4px;
  text-decoration: underline;
  text-decoration-style: solid;
  text-decoration-thickness: auto;
  text-underline-offset: 0%;

  &:hover {
    color: $color-1565c0;
  }
}
</style>
