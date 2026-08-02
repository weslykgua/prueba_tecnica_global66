<template>
  <div class="view-header">
    <button type="button" class="back-btn" aria-label="Volver atrás" @click="onBack">
      <img :src="arrowBackIcon" alt="Volver atrás" class="back-icon" />
    </button>

    <Typography variant="h1" align="center" class="view-title">
      {{ title }}
    </Typography>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import arrowBackIcon from '@/assets/icons/actions/ic_arrow_back.svg';
import Typography from './Typography.vue';

const props = defineProps<{
  title: string;
  onBackClick?: () => void;
}>();

const router = useRouter();

const onBack = () => {
  if (props.onBackClick) {
    props.onBackClick();
  } else {
    router.back();
  }
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/variables' as *;

.view-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: $size-100-percent;
  max-width: $size-570px;
  height: $size-36px;
  margin: $size-36px $size-auto $size-24px $size-auto;
  padding: $size-0px $size-16px;
  gap: $size-4px;
  box-sizing: border-box;

  @media (min-width: $bp-tablet) {
    max-width: $size-820px;
    margin: $size-40px $size-auto $size-28px $size-auto;
    padding: $size-0px $size-24px;
  }

  @media (min-width: $bp-desktop) {
    max-width: $size-1100px;
    margin: $size-48px $size-auto $size-32px $size-auto;
    padding: $size-0px $size-32px;
  }
}

.back-btn {
  position: absolute;
  left: $size-16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: $size-0px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: $size-32px;
  height: $size-32px;
  border-radius: $size-full;
  transition: background-color $anim-duration $anim-ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  @media (min-width: $bp-tablet) {
    left: $size-24px;
  }

  @media (min-width: $bp-desktop) {
    left: $size-32px;
  }
}

.back-icon {
  width: $size-24px;
  height: $size-24px;
}

.view-title {
  font-family: $font-family;
  font-weight: $font-weight-600;
  font-style: normal;
  font-size: $font-size-18;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: center;
  color: $color-121212;
  margin: 0;

  @media (min-width: $bp-tablet) {
    font-size: $font-size-22;
    line-height: 28px;
  }

  @media (min-width: $bp-desktop) {
    font-size: $font-size-24;
    line-height: 32px;
  }
}
</style>
