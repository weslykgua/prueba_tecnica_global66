<template>
  <div class="pokeball-loader" :class="[sizeClass]" role="status" aria-label="Cargando">
    <div class="pokeball-spinner">
      <div class="pokeball">
        <div class="pokeball-top"></div>
        <div class="pokeball-band"></div>
        <div class="pokeball-bottom"></div>
        <div class="pokeball-center-button">
          <div class="pokeball-center-dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    label?: string;
    size?: 'small' | 'medium' | 'large';
  }>(),
  {
    size: 'large',
  }
);

const sizeClass = computed(() => `size-${props.size}`);
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/animations' as *;

.pokeball-loader {
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  align-items: var(--align-center);
  justify-content: var(--justify-center);
  width: $size-100-percent;
  height: $size-100-percent;
  flex: 1;

  &.size-small {
    width: auto;
    height: auto;
    flex: none;

    .pokeball {
      width: $size-24px;
      height: $size-24px;
      border: 1.5px solid $color-222222;

      .pokeball-band {
        height: 3px;
      }

      .pokeball-center-button {
        width: 8px;
        height: 8px;
        border: 1.5px solid $color-222222;

        .pokeball-center-dot {
          width: 2px;
          height: 2px;
          border: 0.5px solid $color-7a7a7a;
        }
      }
    }
  }
}

.pokeball-spinner {
  animation: pokeball-spin 1.2s infinite linear;
  display: var(--display-flex);
  justify-content: var(--justify-center);
  align-items: var(--align-center);
}

.pokeball {
  width: $size-160px;
  height: $size-160px;
  border-radius: 50%;
  border: 3.5px solid $color-222222;
  position: var(--position-relative);
  overflow: var(--overflow-hidden);
  box-shadow: $shadow-sm;
  background: $color-white;

  .pokeball-top {
    position: var(--position-absolute);
    top: $size-0px;
    left: $size-0px;
    width: $size-100-percent;
    height: $size-50-percent;
    background-color: $color-f22539;
  }

  .pokeball-bottom {
    position: var(--position-absolute);
    bottom: $size-0px;
    left: $size-0px;
    width: $size-100-percent;
    height: $size-50-percent;
    background-color: $color-white;
  }

  .pokeball-band {
    position: var(--position-absolute);
    top: 50%;
    left: $size-0px;
    width: $size-100-percent;
    height: $size-12px;
    background-color: $color-222222;
    transform: translateY(-50%);
    z-index: 2;
  }

  .pokeball-center-button {
    position: var(--position-absolute);
    top: 50%;
    left: 50%;
    width: $size-44px;
    height: $size-44px;
    background-color: $color-white;
    border: $size-5px solid $color-222222;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    display: var(--display-flex);
    align-items: var(--align-center);
    justify-content: var(--justify-center);

    .pokeball-center-dot {
      width: $size-7px;
      height: $size-7px;
      background-color: $color-ececec;
      border: $size-1px solid $color-7a7a7a;
      border-radius: 50%;
    }
  }
}
</style>
