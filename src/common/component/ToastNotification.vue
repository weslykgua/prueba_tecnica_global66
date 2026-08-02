<template>
  <Teleport to="body">
    <div class="toast-container" role="region" aria-label="Notificaciones">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast-item"
          :class="[toast.type || 'success', { 'custom-bg': !!toast.backgroundColor }]"
          :style="toast.backgroundColor ? { backgroundColor: toast.backgroundColor } : {}"
        >
          <div class="toast-icon">
            <svg
              v-if="toast.type === 'success'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <svg
              v-else-if="toast.type === 'error'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <svg
              v-else
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>

          <span class="toast-text">{{ toast.message }}</span>

          <button
            class="toast-close"
            aria-label="Cerrar notificación"
            @click="$emit('dismiss', toast.id)"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import ToastMessage from '@/common/model/ToastMessage';

defineProps<{
  toasts: ToastMessage[];
}>();

defineEmits<{
  (e: 'dismiss', id: string): void;
}>();
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  max-width: 380px;
  width: calc(100% - 48px);
  pointer-events: none;
}

.toast-item {
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 16px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.18),
    0 2px 8px rgba(0, 0, 0, 0.12);
  color: $color-white;
  font-family: $font-family;
  font-weight: $font-weight-600;
  font-size: $font-size-14;
  line-height: 1.35;
  background-color: $color-121212;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  width: 100%;
  box-sizing: border-box;

  &.custom-bg {
    color: $color-white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  }

  &.success:not(.custom-bg) {
    background-color: $color-10b981;
  }
  &.error:not(.custom-bg) {
    background-color: $color-d32f2f;
  }
  &.info:not(.custom-bg) {
    background-color: $color-1e88e5;
  }
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
  }
}

.toast-text {
  flex: 1;
  word-break: break-word;
}

.toast-close {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  color: $color-white;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.35);
    transform: scale(1.1);
  }

  svg {
    width: 14px;
    height: 14px;
  }
}

.toast-enter-active {
  transition:
    transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.25s ease;
}
.toast-leave-active {
  transition:
    transform 0.22s ease-in,
    opacity 0.22s ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(40px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(40px) scale(0.95);
}
</style>
