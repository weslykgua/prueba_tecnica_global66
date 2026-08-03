<template>
  <div class="search-bar-container">
    <div class="search-input-wrapper">
      <img :src="searchIcon" alt="Buscar" class="search-left-icon" />
      <input
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        class="search-input"
        aria-label="Buscar Pokémon por nombre o número"
        @input="onInput"
      />
      <button
        v-if="modelValue"
        class="clear-button"
        type="button"
        aria-label="Limpiar búsqueda"
        @click="clear"
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
      <PokeballLoader v-if="isSearching" size="small" />
      <img v-else :src="searchIcon" alt="Buscar" class="action-icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import searchIcon from '@/assets/icons/actions/ic_search.svg';
import clearIcon from '@/assets/icons/actions/ic_clear.svg';
import PokeballLoader from '@/pokemon/component/PokeballLoader.vue';

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
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/variables' as *;

.search-bar-container {
  display: var(--display-flex);
  flex-direction: var(--flex-direction-row);
  align-items: stretch;
  gap: $size-11px;
  width: calc(#{$size-100-percent} - #{$size-32px});
  margin: $size-44px $size-16px $size-16px $size-16px;
  padding: $size-0px;
  box-sizing: var(--border-box);
}

.search-input-wrapper {
  display: var(--display-flex);
  align-items: var(--align-center);
  flex: 1;
  height: $size-48px;
  background-color: $color-white;
  border: 1.5px solid $color-e0e0e0;
  border-radius: $size-30px;
  padding: $size-0px $size-16px;
  gap: $size-10px;
  box-sizing: var(--border-box);
  position: var(--position-relative);
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: $color-1e88e5;
  }
}

.search-left-icon {
  width: $size-20px;
  height: $size-20px;
  flex-shrink: 0;
  filter: invert(68%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(92%) contrast(88%);
}

.search-input {
  width: $size-100-percent;
  border: var(--border-none);
  outline: none;
  background: transparent;
  font-family: $font-family;
  font-size: $font-size-14;
  color: $color-9e9e9e;
  padding: $size-0px;

  &::placeholder {
    color: $color-9e9e9e;
  }
}

.clear-button {
  display: var(--display-flex);
  align-items: var(--align-center);
  justify-content: var(--justify-center);
  width: $size-24px;
  height: $size-24px;
  border: var(--border-none);
  background: transparent;
  cursor: pointer;

  .clear-icon-img {
    width: $size-14px;
    height: $size-14px;
    filter: invert(68%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(92%) contrast(88%);
  }
}

.search-action-button {
  display: var(--display-flex);
  align-items: var(--align-center);
  justify-content: var(--justify-center);
  width: $size-48px;
  min-width: $size-48px;
  max-width: $size-48px;
  height: $size-48px;
  min-height: $size-48px;
  max-height: $size-48px;
  flex: 0 0 $size-48px;
  border-radius: 50%;
  background-color: $color-white;
  border: 1.5px solid $color-e0e0e0;
  box-sizing: var(--border-box);
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: $color-1e88e5;
  }

  .action-icon {
    width: $size-20px;
    height: $size-20px;
    filter: invert(68%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(92%) contrast(88%);
  }
}

.mini-spinner {
  width: $size-18px;
  height: $size-18px;
  border: $size-2px solid $color-e0e0e0;
  border-top-color: $color-1e88e5;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
