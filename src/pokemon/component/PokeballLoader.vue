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
    <p v-if="label" class="loader-label">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: 'Cargando Pokédex...',
  }
);
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;
@use '../../assets/styles/mixins' as *;
@use '../../assets/styles/animations' as *;

.pokeball-loader {
  @include flex-center;
  flex-direction: column;
  padding: 3rem 1.5rem;
  width: 100%;
}

.pokeball-spinner {
  animation: pokeball-spin 1.2s infinite linear;
  margin-bottom: 1rem;
}

.pokeball {
  width: 76px;
  height: 76px;
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
    background-color: $primary-color;
  }

  .pokeball-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background-color: #FFFFFF;
  }

  .pokeball-band {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 7px;
    background-color: #222222;
    transform: translateY(-50%);
    z-index: 2;
  }

  .pokeball-center-button {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 22px;
    height: 22px;
    background-color: #FFFFFF;
    border: 3px solid #222222;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    @include flex-center;

    .pokeball-center-dot {
      width: 7px;
      height: 7px;
      background-color: #ECECEC;
      border: 1px solid #7A7A7A;
      border-radius: 50%;
    }
  }
}

.loader-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: $text-secondary;
  letter-spacing: 0.2px;
}
</style>
