<template>
  <div class="onboarding-step">
    <div class="image-container">
      <img :src="stepData.imageSrc" :alt="stepData.imageAlt || 'Onboarding illustration'" class="step-illustration" />
    </div>

    <div class="bottom-content">
      <h1 class="step-title">{{ stepData.title }}</h1>

      <p class="step-subtitle">
        {{ stepData.subtitle }}
      </p>

      <div class="step-indicators" aria-label="Progreso del onboarding">
        <button
          v-for="step in totalSteps"
          :key="step"
          type="button"
          class="indicator-dot"
          :class="{ active: step === currentStep }"
          :aria-label="`Paso ${step}`"
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
@use '../../assets/styles/variables' as *;

.onboarding-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex-grow: 1;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: auto;

  .step-illustration {
    width: 100%;
    max-width: 342px;
    height: auto;
    max-height: 264.89px;
    aspect-ratio: 342 / 264.89;
    object-fit: contain;
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.06));
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.bottom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.step-title {
  font-size: 2rem;
  font-weight: 500;
  color: $text-title;
  line-height: 1.4;
  margin-bottom: 10px;

  @media (max-width: $bp-mobile) {
    font-size: 1.6rem;
    margin-bottom: 0.85rem;
    padding: 0 1rem;
  }
}

.step-subtitle {
  font-size: 1.05rem;
  font-weight: 400;
  color: $text-body;
  line-height: 1.3;
  margin-bottom: 1.75rem;
  max-width: 460px;

  @media (max-width: $bp-mobile) {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
  }
}

.step-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  .indicator-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: $border-color;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      width: 28px;
      border-radius: 12px;
      background-color: $primary-accent;
    }
  }
}

.onboarding-btn {
  margin: 24px auto 40px;
}
</style>
