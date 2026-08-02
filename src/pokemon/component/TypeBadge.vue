<template>
  <span
    class="type-badge"
    :style="{ backgroundColor: typeColor }"
  >
    <span v-if="typeIcon" class="type-icon-wrapper">
      <span
        class="type-icon-mask"
        :style="({
          backgroundColor: typeColor,
          maskImage: `url(${typeIcon})`,
          WebkitMaskImage: `url(${typeIcon})`,
        }) as Record<string, string>"
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
  getTypeIcon,
} from '@/pokemon/utils/formatters';

const props = defineProps<{
  type: PokemonType;
}>();

const typeColor = computed(() => getTypeBackgroundColor(props.type));
const typeIcon = computed(() => getTypeIcon(props.type));
const typeLabel = computed(() => formatTypeName(props.type));
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/colors' as *;

.type-badge {
  display: inline-flex;
  align-items: center;
  gap: $spacing-2xs;
  padding: $spacing-2xs 10px;
  border-radius: $radius-full;
  font-family: $font-family;
  font-size: $font-size-badge;
  font-weight: $font-weight-semibold;
  color: $text-light;
  white-space: nowrap;
  box-sizing: border-box;
  flex-shrink: 0;
}

.type-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: $spacing-lg;
  height: $spacing-lg;
  flex-shrink: 0;
  background-color: $color-white;
  border-radius: $radius-full;
  box-sizing: border-box;
}

.type-icon-mask {
  display: block;
  width: 12px;
  height: 12px;
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
}
</style>
