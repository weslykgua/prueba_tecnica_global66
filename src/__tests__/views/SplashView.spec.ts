import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SplashView from '@/splash/views/SplashView.vue';

describe('SplashView', () => {
  it('renders splash overlay with pokeball svg image', () => {
    const wrapper = mount(SplashView);

    expect(wrapper.find('[data-testid="splash-overlay"]').exists()).toBe(true);
    expect(wrapper.find('.pokeball-svg-img').exists()).toBe(true);
  });
});
