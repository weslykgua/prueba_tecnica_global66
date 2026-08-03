<template>
  <div class="onboarding-page">
    <main class="onboarding-main" data-testid="onboarding-main">
      <OnboardingStepCard
        :step-data="currentStepData"
        :current-step="currentStep"
        :total-steps="onboardingSteps.length"
        @button-click="handleButtonClick"
        @step-change="goToStep"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import OnboardingStepCard, { type OnboardingStepItem } from '../component/OnboardingStepCard.vue';
import step1Url from '@/assets/images/illustrations/image_1_11.svg';
import step2Url from '@/assets/images/illustrations/image_2.svg';
import OnboardingTexts from '../text/onboarding.texts';

import { useOnboardingStore } from '../store/onboarding.store';

const router = useRouter();
const onboardingStore = useOnboardingStore();

const currentStep = ref(1);

const onboardingSteps: OnboardingStepItem[] = [
  {
    id: 1,
    imageSrc: step1Url,
    imageAlt: 'Pokémon',
    title: OnboardingTexts.step1Title,
    subtitle: OnboardingTexts.step1Subtitle,
    buttonText: OnboardingTexts.btnContinue,
    buttonTestId: 'btn-continue',
  },
  {
    id: 2,
    imageSrc: step2Url,
    imageAlt: 'Guarda tus Favoritos',
    title: OnboardingTexts.step2Title,
    subtitle: OnboardingTexts.step2Subtitle,
    buttonText: OnboardingTexts.btnStart,
    buttonTestId: 'btn-finish',
  },
];

const currentStepData = computed(() => onboardingSteps[currentStep.value - 1]);

const handleButtonClick = () => {
  if (currentStep.value < onboardingSteps.length) {
    currentStep.value += 1;
  } else {
    finishOnboarding();
  }
};

const goToStep = (step: number) => {
  currentStep.value = step;
};

const finishOnboarding = () => {
  onboardingStore.completeOnboarding();
  router.push('/pokedex');
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/mixins' as *;
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

.onboarding-page {
  font-family: 'Poppins', sans-serif;
  width: $size-100-percent;
  min-height: $size-100-dvh;
  background-color: $color-white;
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  align-items: var(--align-center);
  justify-content: var(--justify-between);
  position: var(--position-relative);
  overflow: var(--overflow-hidden);

  @media (min-width: $bp-tablet) {
    justify-content: var(--justify-center);
    padding: $size-32px $size-24px;
    box-sizing: var(--border-box);
  }
}

.onboarding-main {
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  align-items: var(--align-center);
  text-align: center;
  max-width: $size-540px;
  width: $size-100-percent;
  flex-grow: 1;
  justify-content: var(--justify-between);
  margin: $size-0px $size-auto;

  @media (min-width: $bp-tablet) {
    flex-grow: 0;
    justify-content: var(--justify-center);
    margin: $size-auto $size-0px;
  }
}

</style>
