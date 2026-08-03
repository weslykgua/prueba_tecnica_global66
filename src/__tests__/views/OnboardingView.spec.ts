import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import OnboardingView from '@/onboarding/views/OnboardingView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: OnboardingView },
    { path: '/pokedex', component: { template: '<div>Pokedex List</div>' } },
  ],
});

describe('OnboardingView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders onboarding screen 1 directly without internal splash overlay', () => {
    const wrapper = mount(OnboardingView, {
      global: {
        plugins: [createPinia(), router],
      },
    });

    expect(wrapper.text()).toContain('Todos los Pokémon en un solo lugar');
    expect(wrapper.find('.step-indicators').exists()).toBe(true);
    expect(wrapper.find('[data-testid="btn-continue"]').exists()).toBe(true);
  });

  it('navigates from Screen 1 to Screen 2 on clicking Continuar and removes back button', async () => {
    const wrapper = mount(OnboardingView, {
      global: {
        plugins: [createPinia(), router],
      },
    });

    expect(wrapper.text()).toContain('Todos los Pokémon en un solo lugar');

    const btnContinue = wrapper.find('[data-testid="btn-continue"]');
    await btnContinue.trigger('click');

    expect(wrapper.text()).toContain('Mantén tu Pokédex actualizada');
    expect(wrapper.find('.btn-back').exists()).toBe(false);
    expect(wrapper.find('[data-testid="btn-finish"]').exists()).toBe(true);
  });

  it('navigates to /pokedex when clicking Empezar on Screen 2', async () => {
    const pushSpy = vi.spyOn(router, 'push');
    const wrapper = mount(OnboardingView, {
      global: {
        plugins: [createPinia(), router],
      },
    });

    await wrapper.find('[data-testid="btn-continue"]').trigger('click');

    const btnFinish = wrapper.find('[data-testid="btn-finish"]');
    await btnFinish.trigger('click');

    expect(pushSpy).toHaveBeenCalledWith('/pokedex');
  });
});
