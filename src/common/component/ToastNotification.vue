<template>
  <Teleport to="body">
    <div class="toast-container" role="region" aria-label="Notificaciones">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast-item"
          :class="toast.type || 'success'"
        >
          <div class="toast-icon">
            <svg
              v-if="toast.type === 'success'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <svg
              v-else-if="toast.type === 'error'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <span class="toast-text">{{ toast.message }}</span>
          <button
            @click="$emit('dismiss', toast.id)"
            class="toast-close"
            aria-label="Cerrar notificación"
          >
            &times;
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
  bottom: 2rem;
  right: 2rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 360px;
  width: calc(100% - 4rem);
  pointer-events: none;
}

.toast-item {
  pointer-events: auto;
  @include flex-between;
  gap: 0.75rem;
  padding: 0.8rem 1.1rem;
  border-radius: $size-12px;
  box-shadow: $shadow-md;
  color: $color-white;
  font-weight: $font-weight-500;
  font-size: $font-size-14;
  background-color: $color-1f1f1f;
  border: 1px solid $color-3e3e3e;

  &.success {
    border-left: 4px solid $color-10b981;
  }
  &.error {
    border-left: 4px solid $color-d32f2f;
  }
  &.info {
    border-left: 4px solid $color-1e88e5;
  }
}

.toast-icon {
  @include flex-center;
  svg {
    width: 18px;
    height: 18px;
  }
}

.toast-text {
  flex: 1;
}

.toast-close {
  background: none;
  border: none;
  color: $color-white;
  font-size: $font-size-20;
  line-height: 1;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity $anim-duration $anim-ease;

  &:hover {
    opacity: 1;
  }
}

.toast-enter-active {
  animation: toast-slide-in 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.toast-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
