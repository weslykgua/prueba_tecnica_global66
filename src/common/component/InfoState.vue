<template>
  <div class="info-state" role="status">
    <div v-if="image" class="info-image-wrapper">
      <img :src="image" :alt="title" class="info-img" />
    </div>

    <Typography variant="h2" align="center" class="info-title">
      {{ title }}
    </Typography>

    <Typography
      v-if="subtitle || description"
      variant="body"
      align="center"
      class="info-message"
    >
      {{ subtitle || description }}
    </Typography>

    <Button
      v-if="textButton || actionLabel"
      class="info-btn"
      data-testid="btn-action"
      @click="handleButtonClick"
    >
      {{ textButton || actionLabel }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import Typography from './Typography.vue';

interface Props {
  image?: string;
  title: string;
  subtitle?: string;
  description?: string;
  textButton?: string;
  actionLabel?: string;
  action?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  image: '',
  subtitle: '',
  description: '',
  textButton: '',
  actionLabel: '',
  action: undefined,
});

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
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;

.info-state {
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
  padding: 2rem 1rem;
  box-sizing: border-box;
  font-family: $font-family;
}

.info-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 16px 20px;
}

.info-img {
  width: 169px;
  height: 209px;
  object-fit: contain;
}

.info-title {
  font-family: $font-family;
  font-weight: 600;
  font-style: normal;
  font-size: $font-size-subtitle;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  color: $text-title;
  margin: 0 16px 8px 16px;
}

.info-message {
  font-family: $font-family;
  font-weight: 400;
  font-style: normal;
  font-size: $font-size-md;
  line-height: 140%;
  letter-spacing: 0%;
  text-align: center;
  color: $text-body;
  max-width: 440px;
  margin: 0 16px 16px;
}

.info-btn {
  margin: 16px 16px;

  @media (min-width: $bp-tablet) {
    margin: 24px auto 40px auto;
  }
}
</style>
