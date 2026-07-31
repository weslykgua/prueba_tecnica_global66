<template>
  <div class="empty-state">
    <div class="icon-container">
      <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="8" y1="15" x2="16" y2="15"></line>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    </div>
    <h3 class="title">{{ title }}</h3>
    <p class="description">{{ description }}</p>
    <button v-if="actionLabel" class="action-button" @click="$emit('action')">
      {{ actionLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    actionLabel?: string;
  }>(),
  {
    title: 'No se encontraron resultados',
    description: 'Intenta realizar una nueva búsqueda o limpia tus filtros.',
    actionLabel: '',
  }
);

defineEmits<{
  (e: 'action'): void;
}>();
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;
@use '../../assets/styles/mixins' as *;

.empty-state {
  @include flex-center;
  flex-direction: column;
  padding: 4rem 2rem;
  text-align: center;
  width: 100%;
}

.icon-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(148, 163, 184, 0.1);
  @include flex-center;
  margin-bottom: 1.5rem;
}

.empty-icon {
  width: 44px;
  height: 44px;
  color: $text-muted;
}

.title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.description {
  font-size: 1rem;
  color: $text-muted;
  max-width: 420px;
  margin-bottom: 1.5rem;
}

.action-button {
  padding: 0.75rem 1.75rem;
  background-color: $primary-color;
  color: white;
  font-weight: 600;
  border-radius: $radius-full;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(230, 57, 70, 0.3);

  &:hover {
    background-color: $primary-hover;
    transform: translateY(-2px);
  }
}
</style>
