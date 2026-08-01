<template>
  <div class="empty-state">
    <div class="icon-container">
      <img :src="emptyIcon" alt="Sin resultados" class="empty-icon" />
    </div>
    <h3 class="title">{{ title }}</h3>
    <p class="description">{{ description }}</p>
    <Button v-if="actionLabel" class="empty-state-btn" @click="$emit('action')">
      {{ actionLabel }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import emptyIcon from '@/assets/ic_empty_state.svg';
import Button from '@/common/component/Button.vue';

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
}

.empty-icon {
  width: 38px;
  height: 38px;
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

.empty-state-btn {
  margin: 24px auto 40px;
}
</style>
