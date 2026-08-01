<template>
  <div class="error-state" role="alert">
    <div class="error-image-wrapper">
      <img :src="image" alt="Ilustración error" class="error-img" />
    </div>

    <h2 class="error-title">{{ title }}</h2>

    <p class="error-message">{{ subtitle }}</p>

    <Button
      class="error-btn"
      data-testid="btn-retry"
      @click="handleButtonClick"
    >
      {{ textButton }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';

interface Props {
  image: string;
  title: string;
  subtitle: string;
  textButton: string;
  action: () => void;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'retry'): void;
  (e: 'action'): void;
}>();

const handleButtonClick = () => {
  if (props.action) {
    props.action();
  }
  emit('retry');
  emit('action');
};
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 100%;
  max-width: 540px;
  margin: 0 auto;
  font-family: $font-family;
}

.error-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 16px 16px;
}

.error-img {
  width: 185px;
  height: 215px;
  object-fit: contain;
}

.error-title {
  font-size: 2rem;
  font-weight: 700;
  color: $text-title;
  margin: 0 16px 8px;

  @media (max-width: $bp-mobile) {
    font-size: 1.6rem;
  }
}

.error-message {
  font-size: 1.05rem;
  font-weight: 400;
  color: $text-secondary;
  line-height: 1.4;
  max-width: 440px;
  margin: 0 16px 16px;

  @media (max-width: $bp-mobile) {
    font-size: 0.95rem;
  }
}

.error-btn {
  margin: 0 auto 40px;
}
</style>
