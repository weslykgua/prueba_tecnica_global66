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
    <button v-if="actionLabel" @click="$emit('action')" class="action-button" type="button">
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
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.04);
  @include flex-center;
  margin-bottom: 1.25rem;
  border: 1px solid $border-color;

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.04);
    border-color: $border-dark;
  }
}

.empty-icon {
  width: 38px;
  height: 38px;
  color: $text-muted;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
  color: $text-primary;
}

.description {
  font-size: 0.95rem;
  color: $text-secondary;
  max-width: 420px;
  margin-bottom: 1.5rem;
}

.action-button {
  padding: 0.65rem 1.5rem;
  background-color: $primary-color;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: $radius-md;
  transition: background-color $anim-duration $anim-ease, transform $anim-duration $anim-ease;
  box-shadow: $shadow-sm;

  &:hover {
    background-color: $primary-hover;
    transform: translateY(-1px);
  }
}
</style>
