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
  max-width: 580px;
  margin: 0 auto 2rem auto;
}

.search-input-wrapper {
  position: relative;
  @include flex-center;
  width: 100%;
  border-radius: $radius-md;
  border: 1px solid $border-color;
  box-shadow: $shadow-sm;
  transition: border-color $anim-duration $anim-ease, box-shadow $anim-duration $anim-ease;
  background: $surface-color;

  @media (prefers-color-scheme: dark) {
    background: $dark-surface;
    border-color: $border-dark;
  }

  &:focus-within {
    border-color: $primary-color;
    box-shadow: $shadow-md;
  }
}

.search-icon {
  position: absolute;
  left: 1.05rem;
  width: 17px;
  height: 17px;
  color: $text-muted;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.8rem 2.75rem 0.8rem 2.85rem;
  font-size: 0.925rem;
  font-weight: 500;
  border: none;
  border-radius: $radius-md;
  background: transparent;
  color: inherit;
  outline: none;

  &::placeholder {
    color: $text-muted;
  }
}

.search-loading-spinner {
  position: absolute;
  right: 1.05rem;
  @include flex-center;

  .mini-spinner {
    width: 15px;
    height: 15px;
    border: 2px solid $border-color;
    border-top-color: $primary-color;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
}

.clear-button {
  position: absolute;
  right: 0.8rem;
  @include flex-center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: $text-muted;
  transition: color $anim-duration $anim-ease, background-color $anim-duration $anim-ease;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: $primary-color;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
