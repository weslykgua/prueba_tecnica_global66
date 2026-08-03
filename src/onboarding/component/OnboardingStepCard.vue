<template>
  <div class="onboarding-step">
    <div class="image-container">
      <img
        :src="stepData.imageSrc"
        :alt="stepData.imageAlt || OnboardingTexts.ariaIllustrationAlt"
        class="step-illustration"
      />
    </div>

    <div class="bottom-content">
      <Typography variant="h1" align="center" class="step-title">
        {{ stepData.title }}
      </Typography>

      <Typography variant="subtitle" align="center" class="step-subtitle">
        {{ stepData.subtitle }}
      </Typography>

      <div class="step-indicators" :aria-label="OnboardingTexts.ariaProgressLabel">
        <button
          v-for="step in totalSteps"
          :key="step"
          type="button"
          class="indicator-dot"
          :class="{ active: step === currentStep }"
          :aria-label="OnboardingTexts.ariaStepLabel(step)"
          @click="emit('step-change', step)"
        ></button>
      </div>

      <Button
        class="onboarding-btn"
        :data-testid="stepData.buttonTestId || 'btn-continue'"
        @click="emit('button-click')"
      >
        {{ stepData.buttonText }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/common/component/Button.vue';
import Typography from '@/common/component/Typography.vue';
import OnboardingTexts from '../text/onboarding.texts';

export interface OnboardingStepItem {
  id?: number;
  imageSrc: string;
  imageAlt?: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonTestId?: string;
}

interface Props {
  stepData: OnboardingStepItem;
  currentStep: number;
  totalSteps?: number;
}

withDefaults(defineProps<Props>(), {
  totalSteps: 2,
});

const emit = defineEmits<{
  (e: 'button-click'): void;
  (e: 'step-change', step: number): void;
}>();
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/variables' as *;

.onboarding-step {
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  align-items: var(--align-center);
  width: 100%;
  flex-grow: 1;
}

.image-container {
  display: var(--display-flex);
  justify-content: var(--justify-center);
  align-items: var(--align-center);
  width: 100%;
  margin-top: auto;

  @media (min-width: $bp-tablet) {
    margin-top: 0;
    margin-bottom: 2rem;
  }

  .step-illustration {
    width: 100%;
    max-width: 342px;
    height: auto;
    max-height: 264.89px;
    aspect-ratio: 342 / 264.89;
    object-fit: var(--object-contain);
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.06));
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.bottom-content {
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  align-items: var(--align-center);
  width: 100%;
}

.step-title {
  font-size: $font-size-32;
  font-weight: $font-weight-500;
  color: $color-121212;
  line-height: 1.4;
  margin-bottom: 10px;

  @media (max-width: $bp-mobile) {
    font-size: $font-size-24;
    margin-bottom: 0.85rem;
    padding: 0 1rem;
  }
}

.step-subtitle {
  font-size: $font-size-19;
  font-weight: $font-weight-400;
  color: $color-424242;
  line-height: 1.3;
  margin-bottom: 1.75rem;
  max-width: 460px;

  @media (max-width: $bp-mobile) {
    font-size: $font-size-16;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
  }
}

.step-indicators {
  display: var(--display-flex);
  justify-content: var(--justify-center);
  align-items: var(--align-center);
  gap: 8px;

  .indicator-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: $color-e0e0e0;
    border: var(--border-none);
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      width: 28px;
      border-radius: 12px;
      background-color: $color-173ea5;
    }
  }
}

.onboarding-btn {
  margin: 24px auto 60px auto;
}
</style>
