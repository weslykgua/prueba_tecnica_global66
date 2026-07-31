<template>
  <div class="search-bar-container">
    <div class="search-input-wrapper">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="text"
        :value="modelValue"
        @input="onInput"
        :placeholder="placeholder"
        class="search-input"
        aria-label="Buscar Pokémon por nombre"
      />

      <!-- Search loading spinner indicator -->
      <div v-if="isSearching" class="search-loading-spinner" title="Buscando...">
        <div class="mini-spinner"></div>
      </div>

      <!-- Clear button -->
      <button
        v-else-if="modelValue"
        @click="clear"
        class="clear-button"
        type="button"
        aria-label="Limpiar búsqueda"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    isSearching?: boolean;
  }>(),
  {
    placeholder: 'Buscar Pokémon...',
    isSearching: false,
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const clear = () => {
  emit('update:modelValue', '');
};
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;
@use '../../assets/styles/mixins' as *;

.search-bar-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto 2rem auto;
}

.search-input-wrapper {
  position: relative;
  @include flex-center;
  width: 100%;
  border-radius: $radius-lg;
  box-shadow: $shadow-md;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;

  @media (prefers-color-scheme: dark) {
    background: $dark-surface;
  }

  &:focus-within {
    box-shadow: $shadow-glow;
    transform: translateY(-2px);
  }
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  width: 20px;
  height: 20px;
  color: $text-muted;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 1rem 3rem 1rem 3.25rem;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: $radius-lg;
  background: transparent;
  color: inherit;
  outline: none;

  &::placeholder {
    color: $text-muted;
  }
}

.search-loading-spinner {
  position: absolute;
  right: 1.25rem;
  @include flex-center;

  .mini-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(230, 57, 70, 0.2);
    border-top-color: $primary-color;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
}

.clear-button {
  position: absolute;
  right: 1rem;
  @include flex-center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: $text-muted;
  transition: all 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background-color: rgba(148, 163, 184, 0.2);
    color: $primary-color;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
