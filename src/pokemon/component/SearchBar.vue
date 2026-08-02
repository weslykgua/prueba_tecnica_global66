<template>
  <div class="search-bar-container">
    <div class="search-input-wrapper">
      <img :src="searchIcon" alt="Buscar" class="search-left-icon" />
      <input
        type="text"
        :value="modelValue"
        @input="onInput"
        :placeholder="placeholder"
        class="search-input"
        aria-label="Buscar Pokémon por nombre o número"
      />
      <button
        v-if="modelValue"
        @click="clear"
        class="clear-button"
        type="button"
        aria-label="Limpiar búsqueda"
      >
        <img :src="clearIcon" alt="Limpiar" class="clear-icon-img" />
      </button>
    </div>

    <button
      class="search-action-button"
      type="button"
      aria-label="Buscar"
      @click="$emit('open-filter')"
    >
      <div v-if="isSearching" class="mini-spinner"></div>
      <img v-else :src="searchIcon" alt="Buscar" class="action-icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import searchIcon from '@/assets/ic_search.svg';
import clearIcon from '@/assets/ic_clear.svg';

withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    isSearching?: boolean;
  }>(),
  {
    placeholder: 'Procurar Pókemon...',
    isSearching: false,
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'search'): void;
  (e: 'open-filter'): void;
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
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;

.search-bar-container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 11px;
  width: calc(100% - 32px);
  margin: 44px 16px 16px 16px;
  padding: 0;
  box-sizing: border-box;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
  height: 48px;
  background-color: $surface-color;
  border: 1.5px solid $border-color;
  border-radius: 30px;
  padding: 0 16px;
  gap: 10px;
  box-sizing: border-box;
  position: relative;
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: $primary-color;
  }
}

.search-left-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  filter: invert(68%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(92%) contrast(88%);
}

.search-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: $font-family;
  font-size: $font-size-md;
  color: $text-subtle;
  padding: 0;

  &::placeholder {
    color: $text-subtle;
  }
}

.clear-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  cursor: pointer;

  .clear-icon-img {
    width: 14px;
    height: 14px;
    filter: invert(68%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(92%) contrast(88%);
  }
}

.search-action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  min-width: 48px;
  max-width: 48px;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  flex: 0 0 48px;
  border-radius: 50%;
  background-color: $surface-color;
  border: 1.5px solid $border-color;
  box-sizing: border-box;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: $primary-color;
  }

  .action-icon {
    width: 20px;
    height: 20px;
    filter: invert(68%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(92%) contrast(88%);
  }
}

.mini-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid $border-color;
  border-top-color: $primary-color;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
