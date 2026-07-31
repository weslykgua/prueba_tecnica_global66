<template>
  <div class="main-layout">
    <AppHeader />
    <main class="main-content container">
      <slot></slot>
    </main>
    <ToastNotification :toasts="activeToasts" @dismiss="removeToast" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/layout/AppHeader.vue';
import ToastNotification from '../components/common/ToastNotification.vue';
import { useClipboard } from '../composables/useClipboard';

const { activeToasts, removeToast } = useClipboard();
</script>

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 2rem;
  padding-bottom: 3rem;
}
</style>
