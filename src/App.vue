<template>
  <div class="app-root">
    <MainLayout>
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <keep-alive include="HomeView,FavoritesView">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>

      <ToastNotification :toasts="activeToasts" @dismiss="removeToast" />
    </MainLayout>
  </div>
</template>

<script setup lang="ts">
import ToastNotification from './common/component/ToastNotification.vue';
import MainLayout from './home/layouts/MainLayout.vue';
import { useClipboard } from './common/utils/useClipboard';

const { activeToasts, removeToast } = useClipboard();
</script>

<style lang="scss">
.app-root {
  background-color: #ffffff;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition:
    opacity 150ms ease,
    transform 150ms ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>