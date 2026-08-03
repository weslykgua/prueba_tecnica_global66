<template>
  <span
    class="type-badge"
    :style="{ backgroundColor: typeColor }"
  >
    <span v-if="typeIcon" class="type-icon-wrapper">
      <span
        class="type-badge-icon"
        :style="{ color: typeColor }"
        v-html="typeIcon"
      ></span>
    </span>
    {{ typeLabel }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { PokemonType } from '@/pokemon/type/PokemonType';
import {
  formatTypeName,
  getTypeBackgroundColor,
  getTypeIconSvg,
} from '@/pokemon/utils/formatters';

const props = defineProps<{
  type: PokemonType;
}>();

const typeColor = computed(() => getTypeBackgroundColor(props.type));
const typeIcon = computed(() => getTypeIconSvg(props.type));
const typeLabel = computed(() => formatTypeName(props.type));
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/variables' as *;

.type-badge {
  display: var(--display-inline-flex);
  align-items: var(--align-center);
  gap: $size-4px;
  padding: $size-4px $size-10px;
  border-radius: $size-full;
  font-family: $font-family;
  font-size: $font-size-11;
  font-weight: $font-weight-600;
  color: $color-white;
  white-space: nowrap;
  box-sizing: var(--border-box);
  flex-shrink: 0;
}

.type-icon-wrapper {
  display: var(--display-flex);
  align-items: var(--align-center);
  justify-content: var(--justify-center);
  width: $size-20px;
  height: $size-20px;
  flex-shrink: 0;
  background-color: $color-white;
  border: 2px solid $color-white;
  border-radius: $size-full;
  box-sizing: var(--border-box);
}

.type-badge-icon {
  display: var(--display-block);
  width: $size-12px;
  height: $size-12px;
  color: inherit;
}

.type-badge-icon :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
  color: inherit;
}

.type-badge-icon :deep(svg path),
.type-badge-icon :deep(svg circle),
.type-badge-icon :deep(svg rect),
.type-badge-icon :deep(svg polygon),
.type-badge-icon :deep(svg ellipse) {
  fill: currentColor;
  stroke: currentColor;
}
</style>
