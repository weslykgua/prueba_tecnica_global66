<template>
  <div class="dashboard-layout">
    <main class="dashboard-content">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <keep-alive include="HomeView,FavoritesView">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </main>
    <AppTadBar />
  </div>
</template>

<script setup lang="ts">
import AppTadBar from '../component/AppTadBar.vue';
</script>

<style lang="scss" scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  width: 100%;
  overflow: hidden;
}

.dashboard-content {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  > :deep(*) {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
