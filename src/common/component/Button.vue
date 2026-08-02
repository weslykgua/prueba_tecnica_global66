<template>
  <button
    :type="type"
    class="app-button"
    :class="[customClass]"
    :data-testid="dataTestid"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    type?: 'button' | 'submit' | 'reset';
    dataTestid?: string;
    disabled?: boolean;
    customClass?: string;
  }>(),
  {
    label: '',
    type: 'button',
    dataTestid: undefined,
    disabled: false,
    customClass: '',
  }
);

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/variables' as *;

.app-button {
  background-color: $color-1e88e5;
  color: $color-white;
  border: none;
  border-radius: $size-60px;
  padding: $size-16px;
  font-size: $font-size-19;
  font-weight: $font-weight-500;
  font-family: $font-family;
  cursor: pointer;
  outline: none;
  box-shadow: 0 4px 14px rgba(30, 136, 229, 0.25);
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  width: calc(100% - #{$size-32px});
  justify-content: center;
  align-items: center;

  &:hover:not(:disabled) {
    background-color: $color-1565c0;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(30, 136, 229, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
