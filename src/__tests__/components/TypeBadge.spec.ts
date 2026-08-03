import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TypeBadge from '../../pokemon/component/TypeBadge.vue';
import { PokemonType } from '@/pokemon/type/PokemonType';

describe('TypeBadge.vue', () => {
  it('renders the inline type icon for the badge', () => {
    const wrapper = mount(TypeBadge, {
      props: {
        type: PokemonType.FIRE,
      },
    });

    const icon = wrapper.find('.type-badge-icon');

    expect(icon.exists()).toBe(true);
    expect(icon.find('svg').exists()).toBe(true);
  });
});
