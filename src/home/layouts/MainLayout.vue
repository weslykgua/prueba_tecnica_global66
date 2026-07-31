<template>
  <div class="main-layout">
    <AppHeader />
    <main class="main-content">
      <div class="container">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/common/component/AppHeader.vue';
</script>

<style lang="scss" scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem 0 4rem 0;
}
</style>
