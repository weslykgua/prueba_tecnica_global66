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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

.app-button {
  background-color: #1e88e5;
  color: #ffffff;
  border: none;
  border-radius: 60px;
  padding: 1.05rem;
  font-size: 1.15rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  outline: none;
  box-shadow: 0 4px 14px rgba(30, 136, 229, 0.25);
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  width: calc(100% - 32px);
  max-width: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px auto 40px;

  &:hover:not(:disabled) {
    background-color: #1565c0;
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
