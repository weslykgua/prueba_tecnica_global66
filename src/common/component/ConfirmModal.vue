<template>
  <BaseModal
    :is-open="isOpen"
    :title="title"
    max-width="400px"
    @close="$emit('cancel')"
  >
    <div class="confirm-modal-body">
      <p v-if="message" class="confirm-message">{{ message }}</p>
      <slot />
    </div>

    <template #footer>
      <div class="confirm-actions">
        <Button
          custom-class="confirm-btn"
          :class="[variant]"
          :label="confirmLabel"
          @click="$emit('confirm')"
        />
        <Button
          custom-class="cancel-btn"
          :label="cancelLabel"
          @click="$emit('cancel')"
        />
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/common/component/BaseModal.vue';
import Button from '@/common/component/Button.vue';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'primary' | 'danger';
}

withDefaults(defineProps<ConfirmModalProps>(), {
  message: '',
  confirmLabel: 'Confirmar',
  cancelLabel: 'Cancelar',
  variant: 'primary',
});

defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;

.confirm-modal-body {
  padding: $size-8px $size-0px;
  text-align: center;
}

.confirm-message {
  font-family: $font-family;
  font-weight: $font-weight-400;
  font-size: $font-size-16;
  line-height: 24px;
  color: $color-424242;
  margin: $size-0px;
}

.confirm-actions {
  display: flex;
  flex-direction: column;
  gap: $size-12px;
  width: $size-100-percent;

  :deep(.app-button.confirm-btn) {
    width: $size-100-percent;
    max-width: $size-100-percent;
    border-radius: $size-60px;
    padding: $size-14px;
    font-size: $font-size-16;
    font-weight: $font-weight-500;
    margin: $size-0px;

    &.primary {
      background-color: $color-1e88e5;
      color: $color-white;
    }

    &.danger {
      background-color: #e53935;
      color: $color-white;
      box-shadow: 0 4px 14px rgba(229, 57, 53, 0.25);

      &:hover {
        background-color: #d32f2f;
      }
    }
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
