<template>
  <Teleport to="body">
    <Transition name="base-modal-fade">
      <div
        v-if="isOpen"
        class="base-modal-backdrop"
        tabindex="-1"
        @click.self="onBackdropClick"
        @keydown.escape="onEscapeKey"
      >
        <div
          class="base-modal-container"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? 'base-modal-title' : undefined"
          :style="{ maxWidth }"
        >
          <button
            v-if="showClose"
            class="close-btn"
            type="button"
            aria-label="Cerrar modal"
            @click="close"
          >
            <img :src="closeIcon" alt="Cerrar" class="close-icon-img" />
          </button>

          <header v-if="title || $slots.header" class="base-modal-header">
            <slot name="header">
              <h2 id="base-modal-title" class="base-modal-title">{{ title }}</h2>
            </slot>
          </header>

          <main class="base-modal-body">
            <slot />
          </main>

          <footer v-if="$slots.footer" class="base-modal-footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from 'vue';
import closeIcon from '@/assets/icons/actions/ic_close.svg';

interface BaseModalProps {
  isOpen: boolean;
  title?: string;
  showClose?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  maxWidth?: string;
}

const props = withDefaults(defineProps<BaseModalProps>(), {
  title: '',
  showClose: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
  maxWidth: '480px',
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const close = () => {
  emit('close');
};

const onBackdropClick = () => {
  if (props.closeOnBackdrop) {
    close();
  }
};

const onEscapeKey = () => {
  if (props.closeOnEscape) {
    close();
  }
};

const handleGlobalKeydown = (event: KeyboardEvent) => {
  if (props.isOpen && props.closeOnEscape && event.key === 'Escape') {
    close();
  }
};

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      window.addEventListener('keydown', handleGlobalKeydown);
    } else {
      window.removeEventListener('keydown', handleGlobalKeydown);
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown);
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;

.base-modal-backdrop {
  position: fixed;
  top: $size-0px;
  left: $size-0px;
  width: $size-100-vw;
  height: $size-100-vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;

  @media (min-width: $size-600px) {
    align-items: center;
  }
}

.base-modal-container {
  background-color: $color-white;
  width: $size-100-percent;
  max-height: $size-75-vh;
  border-radius: $size-24px $size-24px $size-0px $size-0px;
  padding: $size-20px $size-24px $size-24px $size-24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.15);

  @media (min-width: $size-600px) {
    border-radius: $size-24px;
  }
}

.close-btn {
  background: none;
  border: none;
  padding: $size-0px;
  margin-bottom: $size-14px;
  cursor: pointer;
  align-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: center;
  width: $size-24px;
  height: $size-24px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
}

.base-modal-header {
  width: $size-100-percent;
  margin-bottom: $size-16px;
}

.base-modal-title {
  font-family: $font-family;
  font-weight: $font-weight-600;
  font-size: $font-size-24;
  line-height: 32px;
  text-align: center;
  color: $color-121212;
  margin: $size-0px;
}

.base-modal-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.base-modal-footer {
  margin-top: $size-16px;
  width: $size-100-percent;
}

.base-modal-fade-enter-active,
.base-modal-fade-leave-active {
  transition: opacity 0.25s ease;

  .base-modal-container {
    transition: transform 0.25s ease;
  }
}

.base-modal-fade-enter-from,
.base-modal-fade-leave-to {
  opacity: 0;

  .base-modal-container {
    transform: translateY(100%);

    @media (min-width: $size-600px) {
      transform: scale(0.95);
    }
  }
}
</style>
