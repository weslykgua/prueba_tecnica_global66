<template>
  <div class="pokeball-loader" role="status" aria-label="Cargando">
    <div class="pokeball-spinner">
      <div class="pokeball">
        <div class="pokeball-top"></div>
        <div class="pokeball-band"></div>
        <div class="pokeball-bottom"></div>
        <div class="pokeball-center-button">
          <div class="pokeball-center-dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
}>();
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/animations' as *;

.pokeball-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex: 1;
}

.pokeball-spinner {
  animation: pokeball-spin 1.2s infinite linear;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokeball {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 3.5px solid #222222;
  position: relative;
  overflow: hidden;
  box-shadow: $shadow-sm;
  background: white;

  .pokeball-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: $pokeball-top;
  }

  .pokeball-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: #ffffff;
  }

  .pokeball-band {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 12px;
    background-color: #222222;
    transform: translateY(-50%);
    z-index: 2;
  }

  .pokeball-center-button {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 44px;
    height: 44px;
    background-color: #ffffff;
    border: 5px solid #222222;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;

    .pokeball-center-dot {
      width: 7px;
      height: 7px;
      background-color: #ececec;
      border: 1px solid #7a7a7a;
      border-radius: 50%;
    }
  }
}
</style>
