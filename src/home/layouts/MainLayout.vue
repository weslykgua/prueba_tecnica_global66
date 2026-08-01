<template>
  <div class="main-layout">
    <main class="main-content">
      <div class="container">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.container {
  padding: 0px;
}

.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.main-content {
  flex: 1;
  padding: 0;
}
</style>
