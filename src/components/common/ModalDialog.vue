<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen"
        class="modal-backdrop"
        role="dialog"
        aria-modal="true"
        @click.self="onBackdropClick"
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
  background-color: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(8px);
  z-index: 1000;
  @include flex-center;
  padding: 1.5rem;
  overflow-y: auto;
}

.modal-card {
  width: 100%;
  max-width: 540px;
  background: white;
  border-radius: $radius-lg;
  box-shadow: $shadow-lg;
  overflow: hidden;
  position: relative;

  @media (prefers-color-scheme: dark) {
    background: $dark-surface;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}

.modal-fade-enter-active {
  transition: opacity 0.25s ease;
  .modal-card {
    animation: modal-scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

.modal-fade-leave-active {
  transition: opacity 0.2s ease;
  .modal-card {
    transition: transform 0.2s ease, opacity 0.2s ease;
    transform: scale(0.95);
    opacity: 0;
  }
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
