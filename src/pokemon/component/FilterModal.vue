<template>
  <Teleport to="body">
    <Transition name="filter-modal-fade">
      <div v-if="isOpen" class="filter-backdrop" @click.self="$emit('close')">
        <div
          class="filter-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="filter-modal-title"
        >
          <button class="close-btn" type="button" aria-label="Cerrar modal" @click="$emit('close')">
            <img :src="closeIcon" alt="Cerrar" class="close-icon-img" />
          </button>

          <h2 id="filter-modal-title" class="filter-title">{{ FILTER_MODAL_TITLE }}</h2>

          <div class="filter-section">
            <div class="section-header" @click="isTypeExpanded = !isTypeExpanded">
              <span class="section-label">{{ FILTER_SECTION_TYPE_LABEL }}</span>
              <button
                type="button"
                class="toggle-btn"
                :aria-expanded="isTypeExpanded"
                aria-label="Contraer/Extender tipos"
              >
                <img
                  :src="chevronUpIcon"
                  alt="Extender o contraer"
                  class="chevron-icon-img"
                  :class="{ collapsed: !isTypeExpanded }"
                />
              </button>
            </div>

            <div v-show="isTypeExpanded" class="types-container">
              <div v-for="type in allTypes" :key="type" class="type-item" @click="toggleType(type)">
                <span class="type-name">{{ formatTypeName(type) }}</span>

                <div class="checkbox-wrapper">
                  <img
                    v-if="selectedTypes.includes(type)"
                    :src="checkboxCheckedIcon"
                    alt="Seleccionado"
                    class="checkbox-icon-img"
                  />
                  <img
                    v-else
                    :src="checkboxUncheckedIcon"
                    alt="No seleccionado"
                    class="checkbox-icon-img"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="filter-actions">
            <Button
              custom-class="apply-btn"
              :label="FILTER_APPLY_BUTTON_LABEL"
              @click="applyFilters"
            />
            <Button
              custom-class="cancel-btn"
              :label="FILTER_CANCEL_BUTTON_LABEL"
              @click="cancelFilters"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Button from '@/common/component/Button.vue';
import closeIcon from '@/assets/icons/actions/ic_close.svg';
import chevronUpIcon from '@/assets/icons/actions/ic_chevron_up.svg';
import checkboxCheckedIcon from '@/assets/icons/actions/ic_checkbox_checked.svg';
import checkboxUncheckedIcon from '@/assets/icons/actions/ic_checkbox_unchecked.svg';
import { PokemonType } from '../type/PokemonType';

import { formatTypeName } from '../utils/formatters';
import {
  FILTER_MODAL_TITLE,
  FILTER_SECTION_TYPE_LABEL,
  FILTER_APPLY_BUTTON_LABEL,
  FILTER_CANCEL_BUTTON_LABEL,
} from '../utils/pokemon.constants';

const props = defineProps<{
  isOpen: boolean;
  selectedTypes: PokemonType[];
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'apply', selectedTypes: PokemonType[]): void;
}>();

const isTypeExpanded = ref(true);
const selectedTypes = ref<PokemonType[]>([...props.selectedTypes]);

const allTypes = Object.values(PokemonType);

watch(
  () => props.isOpen,
  newVal => {
    if (newVal) {
      selectedTypes.value = [...props.selectedTypes];
    }
  }
);

const toggleType = (type: PokemonType) => {
  const index = selectedTypes.value.indexOf(type);
  if (index >= 0) {
    selectedTypes.value.splice(index, 1);
  } else {
    selectedTypes.value.push(type);
  }
};

const applyFilters = () => {
  emit('apply', selectedTypes.value);
  emit('close');
};

const cancelFilters = () => {
  selectedTypes.value = [...props.selectedTypes];
  emit('close');
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;

.filter-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
}

.filter-modal {
  background-color: $color-white;
  width: 100%;
  max-width: 480px;
  height: 75vh;
  border-radius: 24px 24px 0 0;
  padding: 20px 24px 24px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.close-btn {
  background: none;
  border: none;
  padding: 0;
  margin-bottom: 14px;
  cursor: pointer;
  align-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.filter-title {
  font-family: $font-family;
  font-weight: $font-weight-600;
  font-size: $font-size-24;
  line-height: 32px;
  letter-spacing: 0px;
  text-align: center;
  color: $color-121212;
  margin: 0 0 20px 0;
}

.filter-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;

  .section-label {
    font-family: $font-family;
    font-weight: $font-weight-600;
    font-size: $font-size-16;
    color: $color-121212;
  }

  .toggle-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      transition: transform 0.2s ease;

      &.collapsed {
        transform: rotate(180deg);
      }
    }
  }
}

.types-container {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-right: 4px;
  margin-top: 8px;
}

.type-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid $color-ececec;

  .type-name {
    font-family: $font-family;
    font-weight: $font-weight-500;
    font-size: $font-size-16;
    line-height: 24px;
    letter-spacing: 0px;
    color: $color-424242;
  }

  .checkbox-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
  }
}

.filter-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
  width: 100%;

  :deep(.app-button.apply-btn) {
    background-color: $color-1e88e5;
    color: $color-white;
    width: 100%;
    max-width: 100%;
    border-radius: $size-60px;
    padding: 14px;
    font-size: $font-size-16;
    font-weight: $font-weight-500;
    margin: 0;
  }

  :deep(.app-button.cancel-btn) {
    background-color: $color-eeeeee;
    color: $color-424242;
    width: 100%;
    max-width: 100%;
    border-radius: $size-60px;
    padding: 14px;
    font-size: $font-size-16;
    font-weight: $font-weight-500;
    margin: 0;
    box-shadow: none;

    &:hover {
      background-color: $color-e0e0e0;
    }
  }
}

.filter-modal-fade-enter-active,
.filter-modal-fade-leave-active {
  transition: opacity 0.25s ease;

  .filter-modal {
    transition: transform 0.25s ease;
  }
}

.filter-modal-fade-enter-from,
.filter-modal-fade-leave-to {
  opacity: 0;

  .filter-modal {
    transform: translateY(100%);
  }
}
</style>
