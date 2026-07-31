<template>
  <div
    class="error-state"
    role="alert"
  >
    <div class="error-icon-wrapper">
      <svg
        class="error-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line
          x1="12"
          y1="9"
          x2="12"
          y2="13"
        ></line>
        <line
          x1="12"
          y1="17"
          x2="12.01"
          y2="17"
        ></line>
      </svg>
    </div>

    <h3 class="error-title">{{ title }}</h3>

    <p class="error-message">{{ message }}</p>

    <button
      @click="$emit('retry')"
      class="retry-button"
      type="button"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M23 4v6h-6"></path>
        <path d="M1 20v-6h6"></path>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
      </svg>
      Reintentar
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    message: string;
  }>(),
  {
    title: 'Algo salió mal',
  }
);

defineEmits<{
  (e: 'retry'): void;
}>();
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;
@use '../../assets/styles/mixins' as *;

.error-state {
  @include flex-center;
  flex-direction: column;
  padding: 3.5rem 2rem;
  text-align: center;
  width: 100%;
}

.error-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: rgba(216, 59, 59, 0.08);
  border: 1px solid rgba(216, 59, 59, 0.2);
  @include flex-center;
  margin-bottom: 1.25rem;
}

.error-icon {
  width: 32px;
  height: 32px;
  color: $primary-color;
}

.error-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: $text-primary;
}

.error-message {
  font-size: 0.95rem;
  color: $text-secondary;
  max-width: 440px;
  margin-bottom: 1.5rem;
}

.retry-button {
  @include flex-center;
  gap: 0.5rem;
  padding: 0.65rem 1.5rem;
  background-color: $primary-color;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: $radius-md;
  transition: background-color $anim-duration $anim-ease, transform $anim-duration $anim-ease;
  box-shadow: $shadow-sm;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background-color: $primary-hover;
    transform: translateY(-1px);
  }
}
</style>
