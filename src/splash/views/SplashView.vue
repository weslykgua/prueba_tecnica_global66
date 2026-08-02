<template>
  <div class="splash-screen" data-testid="splash-overlay">
    <div class="splash-pokeball">
      <img :src="pokeballUrl" alt="Pokebola" class="pokeball-svg-img" />
    </div>
  </div>
</template>

<script setup lang="ts">
import pokeballUrl from '@/assets/icons/common/pokeball.svg';
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/sizes' as *;

.splash-screen {
  position: fixed;
  inset: $size-0px;
  z-index: 9999;
  background-color: $color-white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.splash-pokeball {
  display: flex;
  align-items: center;
  justify-content: center;

  .pokeball-svg-img {
    width: $size-155px;
    height: $size-155px;
    user-select: none;
  }
}
</style>
