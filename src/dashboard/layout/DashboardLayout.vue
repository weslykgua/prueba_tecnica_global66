<template>
  <div class="dashboard-layout">
    <main class="dashboard-content" :style="{ paddingBottom: `${tabBarHeight}px` }">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <keep-alive include="HomeView,FavoritesView">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </main>
    <div class="nav-container">
      <AppTabBar />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import AppTabBar from '../component/AppTabBar.vue';

const tabBarHeight = ref(0);
let resizeObserver: ResizeObserver | null = null;

const updateTabBarHeight = () => {
  const tabbarEl = document.querySelector('.app-tabbar') as HTMLElement | null;
  if (tabbarEl) {
    const rect = tabbarEl.getBoundingClientRect();
    if (rect.height > 0) {
      tabBarHeight.value = Math.round(rect.height);
    }
  }
};

onMounted(() => {
  nextTick(() => {
    updateTabBarHeight();
    const tabbarEl = document.querySelector('.app-tabbar');
    if (tabbarEl && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateTabBarHeight();
      });
      resizeObserver.observe(tabbarEl);
    }
  });
  window.addEventListener('resize', updateTabBarHeight);
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  window.removeEventListener('resize', updateTabBarHeight);
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/sizes' as *;

.dashboard-layout {
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  min-height: $size-100-vh;
  position: var(--position-relative);
  width: $size-100-percent;
}

.dashboard-content {
  flex: 1;
  width: $size-100-percent;
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  box-sizing: var(--border-box);

  :deep(> *) {
    flex: 1;
    display: var(--display-flex);
    flex-direction: var(--flex-direction-column);
    width: $size-100-percent;
  }

  :deep(.home-view) {
    flex: 1;
    display: var(--display-flex);
    flex-direction: var(--flex-direction-column);
    width: $size-100-percent;
  }
}

.nav-container {
  width: $size-100-percent;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 150ms ease-out;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
