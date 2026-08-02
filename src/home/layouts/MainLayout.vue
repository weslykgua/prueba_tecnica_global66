<template>
  <div class="main-layout">
    <main class="main-content">
      <div class="container">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use '@/assets/styles/sizes' as *;

.container {
  padding: $size-0px;
  max-width: $size-100-percent;
  width: $size-100-percent;
}

.main-layout {
  display: flex;
  flex-direction: column;
  min-height: $size-100-vh;
  position: relative;
}

.main-content {
  flex: 1;
  padding: $size-0px;
}
</style>
