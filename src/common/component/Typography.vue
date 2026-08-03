<template>
  <component
    :is="computedTag"
    class="app-typography"
    :class="[
      `variant-${variant}`,
      colorClass,
      alignClass,
      weightClass,
      customClass,
    ]"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'caption';
export type TypographyColor =
  | 'title'
  | 'primary'
  | 'body'
  | 'secondary'
  | 'muted'
  | 'subtle'
  | 'light'
  | 'inherit';
export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';
export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';

interface Props {
  variant?: TypographyVariant;
  tag?: string;
  color?: TypographyColor;
  align?: TypographyAlign;
  weight?: TypographyWeight;
  text?: string;
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'body',
  tag: undefined,
  color: undefined,
  align: 'left',
  weight: undefined,
  text: '',
  customClass: '',
});

const computedTag = computed(() => {
  if (props.tag) return props.tag;
  switch (props.variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'subtitle':
      return 'p';
    case 'caption':
      return 'span';
    case 'body':
    default:
      return 'p';
  }
});

const colorClass = computed(() => (props.color ? `color-${props.color}` : ''));
const alignClass = computed(() => (props.align ? `align-${props.align}` : ''));
const weightClass = computed(() => (props.weight ? `weight-${props.weight}` : ''));
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/variables' as *;

.app-typography {
  font-family: $font-family;
  margin: 0;
  padding: 0;
  box-sizing: var(--border-box);

  &.variant-h1 {
    font-size: $font-size-32;
    line-height: 1.3;
    font-weight: $font-weight-600;
    color: $color-121212;
  }

  &.variant-h2 {
    font-size: $font-size-24;
    line-height: 1.35;
    font-weight: $font-weight-600;
    color: $color-121212;
  }

  &.variant-h3 {
    font-size: $font-size-20;
    line-height: 1.4;
    font-weight: $font-weight-600;
    color: $color-121212;
  }

  &.variant-subtitle {
    font-size: $font-size-16;
    line-height: 1.4;
    font-weight: $font-weight-500;
    color: $color-5e5e5e;
  }

  &.variant-body {
    font-size: $font-size-14;
    line-height: 1.5;
    font-weight: $font-weight-400;
    color: $color-424242;
  }

  &.variant-caption {
    font-size: $font-size-12;
    line-height: 1.4;
    font-weight: $font-weight-400;
    color: $color-7a7a7a;
  }

  &.color-title {
    color: $color-121212;
  }
  &.color-primary {
    color: $color-222222;
  }
  &.color-body {
    color: $color-424242;
  }
  &.color-secondary {
    color: $color-5e5e5e;
  }
  &.color-muted {
    color: $color-7a7a7a;
  }
  &.color-subtle {
    color: $color-9e9e9e;
  }
  &.color-light {
    color: $color-white;
  }
  &.color-inherit {
    color: inherit;
  }

  &.align-left {
    text-align: left;
  }
  &.align-center {
    text-align: center;
  }
  &.align-right {
    text-align: right;
  }
  &.align-justify {
    text-align: justify;
  }

  &.weight-normal {
    font-weight: 400;
  }
  &.weight-medium {
    font-weight: 500;
  }
  &.weight-semibold {
    font-weight: 600;
  }
  &.weight-bold {
    font-weight: 700;
  }
}
</style>
