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
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/variables' as *;

.info-state {
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  align-items: var(--align-center);
  justify-content: var(--justify-center);
  text-align: center;
  width: $size-100-percent;
  height: $size-100-percent;
  flex: 1;
  min-height: $size-100-percent;
  max-width: $size-540px;
  margin: $size-0px $size-auto;
  padding: $size-32px $size-16px;
  box-sizing: var(--border-box);
  font-family: $font-family;
}

.info-image-wrapper {
  display: var(--display-flex);
  justify-content: var(--justify-center);
  align-items: var(--align-center);
  margin: $size-16px $size-16px $size-20px;
}

.info-img {
  width: $size-169px;
  height: $size-209px;
  object-fit: var(--object-contain);
}

.info-title {
  font-family: $font-family;
  font-weight: $font-weight-600;
  font-style: normal;
  font-size: $font-size-20;
  line-height: $size-100-percent;
  letter-spacing: 0%;
  text-align: center;
  color: $color-121212;
  margin: $size-0px $size-16px $size-8px $size-16px;
}

.info-message {
  font-family: $font-family;
  font-weight: $font-weight-400;
  font-style: normal;
  font-size: $font-size-14;
  line-height: 140%;
  letter-spacing: 0%;
  text-align: center;
  color: $color-424242;
  max-width: $size-440px;
  margin: $size-0px $size-16px $size-16px;
}

.info-btn {
  margin: $size-16px $size-16px;

  @media (min-width: $bp-tablet) {
    margin: $size-24px $size-auto $size-40px $size-auto;
  }
}
</style>
