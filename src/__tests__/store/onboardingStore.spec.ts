import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useOnboardingStore } from '@/onboarding/store/onboarding.store';

describe('useOnboardingStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with hasCompletedOnboarding as false', () => {
    const store = useOnboardingStore();
    expect(store.hasCompletedOnboarding).toBe(false);
  });

  it('should mark onboarding as completed when completeOnboarding is called', () => {
    const store = useOnboardingStore();
    store.completeOnboarding();
    expect(store.hasCompletedOnboarding).toBe(true);
  });

  it('should update completion state via setCompleted and resetOnboarding', () => {
    const store = useOnboardingStore();

    store.setCompleted(true);
    expect(store.hasCompletedOnboarding).toBe(true);

    store.resetOnboarding();
    expect(store.hasCompletedOnboarding).toBe(false);
  });
});
