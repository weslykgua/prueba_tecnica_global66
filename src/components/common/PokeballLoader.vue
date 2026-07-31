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
  animation: pokeball-spin 1.4s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
  margin-bottom: 1.25rem;
}

.pokeball {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 5px solid #1e293b;
  position: relative;
  overflow: hidden;
  box-shadow: $shadow-glow;
  background: white;

  .pokeball-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(135deg, #ff2a2a 0%, #d62828 100%);
  }

  .pokeball-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  }

  .pokeball-band {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 10px;
    background-color: #1e293b;
    transform: translateY(-50%);
    z-index: 2;
  }

  .pokeball-center-button {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 28px;
    height: 28px;
    background-color: #ffffff;
    border: 4px solid #1e293b;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    @include flex-center;
    animation: pokeball-pulse 1.8s infinite ease-in-out;

    .pokeball-center-dot {
      width: 10px;
      height: 10px;
      background-color: #e2e8f0;
      border: 1px solid #94a3b8;
      border-radius: 50%;
    }
  }
}

.loader-label {
  font-size: 1.05rem;
  font-weight: 600;
  color: $text-muted;
  letter-spacing: 0.5px;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
</style>
