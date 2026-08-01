import { defineStore } from 'pinia';

export const useOnboardingStore = defineStore('onboardingStore', {
  state: () => ({
    hasCompletedOnboarding: false,
  }),

  actions: {
    completeOnboarding() {
      this.hasCompletedOnboarding = true;
    },

    setCompleted(completed: boolean) {
      this.hasCompletedOnboarding = completed;
    },

    resetOnboarding() {
      this.hasCompletedOnboarding = false;
    },
  },
});
