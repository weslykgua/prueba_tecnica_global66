<template>
  <div class="error-state" role="alert">
    <div class="error-icon-wrapper">
      <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    </div>
    <h3 class="error-title">{{ title }}</h3>
    <p class="error-message">{{ message }}</p>
    <button class="retry-button" @click="$emit('retry')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: rgba(230, 57, 70, 0.1);
  @include flex-center;
  margin-bottom: 1.25rem;
}

.error-icon {
  width: 36px;
  height: 36px;
  color: $primary-color;
}

.error-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.error-message {
  font-size: 0.95rem;
  color: $text-muted;
  max-width: 440px;
  margin-bottom: 1.5rem;
}

.retry-button {
  @include flex-center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  background-color: $primary-color;
  color: white;
  font-weight: 600;
  border-radius: $radius-full;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(230, 57, 70, 0.3);

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    background-color: $primary-hover;
    transform: translateY(-2px);
  }
}
</style>
