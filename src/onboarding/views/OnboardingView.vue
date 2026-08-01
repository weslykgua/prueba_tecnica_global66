<template>
  <div class="onboarding-page">
    <main class="onboarding-main" data-testid="onboarding-main">
      <transition name="slide-fade" mode="out-in">
        <OnboardingStepCard
          :key="currentStep"
          :step-data="onboardingSteps[currentStep - 1]"
          :current-step="currentStep"
          :total-steps="onboardingSteps.length"
          @button-click="handleButtonClick"
          @step-change="goToStep"
        />
      </transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import OnboardingStepCard, { type OnboardingStepItem } from '../component/OnboardingStepCard.vue';
import step1Url from '@/assets/image_1_11.svg';
import step2Url from '@/assets/image_2.svg';

import { useOnboardingStore } from '../store/onboarding.store';

const router = useRouter();
const onboardingStore = useOnboardingStore();

const currentStep = ref(1);

const onboardingSteps: OnboardingStepItem[] = [
  {
    id: 1,
    imageSrc: step1Url,
    imageAlt: 'Pokémon',
    title: 'Todos los Pokémon en un solo lugar',
    subtitle: 'Accede a una amplia lista de Pokémon de todas las generaciones creadas por Nintendo',
    buttonText: 'Continuar',
    buttonTestId: 'btn-continue',
  },
  {
    id: 2,
    imageSrc: step2Url,
    imageAlt: 'Guarda tus Favoritos',
    title: 'Mantén tu Pokédex actualizada',
    subtitle: 'Regístrate y guarda tu perfil, Pokémon favoritos, configuraciones y mucho más en la aplicación',
    buttonText: 'Empecemos',
    buttonTestId: 'btn-finish',
  },
];

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
@use '../../assets/styles/variables' as *;
@use '../../assets/styles/mixins' as *;
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

.onboarding-page {
  font-family: 'Poppins', sans-serif;
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.onboarding-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 540px;
  width: 100%;
  flex-grow: 1;
  justify-content: space-between;
  margin: 0 auto;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
