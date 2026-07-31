<template>
  <nav v-if="totalPages > 1" class="pagination-container" aria-label="Navegación de páginas">
    <!-- Previous Button -->
    <button
      class="page-btn prev-next"
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)"
      aria-label="Página anterior"
      type="button"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
      
      <span class="btn-text">Anterior</span>
    </button>

    <!-- Page Numbers List -->
    <div class="page-numbers">
      <button
        v-for="page in visiblePages"
        :key="page"
        class="page-btn number"
        :class="{ active: page === currentPage }"
        @click="changePage(page)"
        type="button"
      >
        {{ page }}
      </button>
    </div>

    <!-- Next Button -->
    <button
      class="page-btn prev-next"
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
      aria-label="Siguiente página"
      type="button"
    >
      <span class="btn-text">Siguiente</span>
      
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'change-page', page: number): void;
}>();

const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('change-page', page);
  }
};

const visiblePages = computed(() => {
  const pages: number[] = [];
  const maxVisible = 5;
  let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  if (end > props.totalPages) {
    end = props.totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;
@use '../../assets/styles/mixins' as *;

.pagination-container {
  @include flex-center;
  gap: 0.75rem;
  margin: 2.5rem 0 1.5rem 0;
  flex-wrap: wrap;
}

.page-numbers {
  @include flex-center;
  gap: 0.35rem;
}

.page-btn {
  @include flex-center;
  gap: 0.35rem;
  padding: 0.5rem 0.85rem;
  border-radius: $radius-md;
  font-weight: 600;
  font-size: 0.875rem;
  color: $text-secondary;
  background: $surface-color;
  border: 1px solid $border-color;
  box-shadow: $shadow-sm;
  transition: all $anim-duration $anim-ease;

  @media (prefers-color-scheme: dark) {
    background: $dark-card;
    border-color: $border-dark;
  }

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover:not(:disabled) {
    border-color: $primary-color;
    color: $primary-color;
  }

  &.active {
    background: $primary-color;
    border-color: $primary-color;
    color: white;
    box-shadow: $shadow-sm;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.number {
  min-width: 36px;
  height: 36px;
  padding: 0;
}

@media (max-width: 480px) {
  .btn-text {
    display: none;
  }
}
</style>
