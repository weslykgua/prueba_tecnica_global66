<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="modal-backdrop"
        @click.self="onBackdropClick"
        role="dialog"
        aria-modal="true"
      >
        <div class="modal-card">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    closeOnBackdrop?: boolean;
  }>(),
  {
    closeOnBackdrop: true,
  }
);

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const onBackdropClick = () => {
  if (props.closeOnBackdrop) {
    emit('close');
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close');
  }
};

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
);

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  document.body.style.overflow = '';
});
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;
@use '../../assets/styles/mixins' as *;
@use '../../assets/styles/animations' as *;

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(31, 31, 31, 0.65);
  z-index: 1000;
  @include flex-center;
  padding: 1.5rem;
  overflow-y: auto;
}

.modal-card {
  width: 100%;
  max-width: 520px;
  background-color: $surface-color;
  border: 1px solid $border-color;
  border-radius: $radius-card;
  box-shadow: $shadow-lg;
  overflow: hidden;
  position: relative;

  @media (prefers-color-scheme: dark) {
    background-color: $dark-surface;
    border-color: $border-dark;
  }
}

.modal-fade-enter-active {
  transition: opacity 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
  .modal-card {
    animation: modal-scale-in 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }
}

.modal-fade-leave-active {
  transition: opacity 180ms ease;
  .modal-card {
    transition: transform 180ms ease, opacity 180ms ease;
    transform: scale(0.97);
    opacity: 0;
  }
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
