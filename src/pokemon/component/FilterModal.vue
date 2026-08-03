<template>
  <BaseModal
    :is-open="isOpen"
    :title="FILTER_MODAL_TITLE"
    max-width="480px"
    @close="$emit('close')"
  >
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

    <template #footer>
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
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseModal from '@/common/component/BaseModal.vue';
import Button from '@/common/component/Button.vue';
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

.filter-section {
  flex: 1;
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  overflow: var(--overflow-hidden);
}

.section-header {
  display: var(--display-flex);
  justify-content: var(--justify-between);
  align-items: var(--align-center);
  padding: $size-8px $size-0px;
  cursor: pointer;

  .section-label {
    font-family: $font-family;
    font-weight: $font-weight-600;
    font-size: $font-size-16;
    color: $color-121212;
  }

  .toggle-btn {
    background: none;
    border: var(--border-none);
    padding: $size-0px;
    cursor: pointer;
    display: var(--display-flex);
    align-items: var(--align-center);
    justify-content: var(--justify-center);

    .chevron-icon-img {
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
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  gap: $size-12px;
  padding-right: $size-4px;
  margin-top: $size-8px;
}

.type-item {
  display: var(--display-flex);
  justify-content: var(--justify-between);
  align-items: var(--align-center);
  padding: $size-10px $size-0px;
  cursor: pointer;
  border-bottom: $size-1px solid $color-ececec;

  .type-name {
    font-family: $font-family;
    font-weight: $font-weight-500;
    font-size: $font-size-16;
    line-height: 24px;
    letter-spacing: 0px;
    color: $color-424242;
  }

  .checkbox-wrapper {
    display: var(--display-flex);
    align-items: var(--align-center);
    justify-content: var(--justify-center);
    width: $size-18px;
    height: $size-18px;
  }
}

.filter-actions {
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  gap: $size-12px;
  width: $size-100-percent;

  :deep(.app-button.apply-btn) {
    background-color: $color-1e88e5;
    color: $color-white;
    width: $size-100-percent;
    max-width: $size-100-percent;
    border-radius: $size-60px;
    padding: $size-14px;
    font-size: $font-size-16;
    font-weight: $font-weight-500;
    margin: $size-0px;
  }

  :deep(.app-button.cancel-btn) {
    background-color: $color-eeeeee;
    color: $color-424242;
    width: $size-100-percent;
    max-width: $size-100-percent;
    border-radius: $size-60px;
    padding: $size-14px;
    font-size: $font-size-16;
    font-weight: $font-weight-500;
    margin: $size-0px;
    box-shadow: none;

    &:hover {
      background-color: $color-e0e0e0;
    }
  }
}
</style>
