import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonCard from '../../pokemon/component/PokemonCard.vue';
import PokemonListItem from '@/pokemon/model/PokemonListItem';
import { PokemonType } from '@/pokemon/type/PokemonType';

describe('PokemonCard.vue', () => {
  const mockPokemon: PokemonListItem = {
    id: 25,
    name: 'pikachu',
    spriteUrl: 'https://raw.githubusercontent.com/.../25.png',
    principalType: PokemonType.ELECTRIC,
    types: [PokemonType.ELECTRIC],
  };

  it('renders pokemon formatted name and ID correctly', () => {
    const wrapper = mount(PokemonCard, {
      props: {
        pokemon: mockPokemon,
        isFavorite: false,
      },
    });

    expect(wrapper.find('.pokemon-name').text()).toBe('Pikachu');
    expect(wrapper.find('.pokemon-id').text()).toBe('Nº025');
  });

  it('emits select event when card body is clicked', async () => {
    const wrapper = mount(PokemonCard, {
      props: {
        pokemon: mockPokemon,
        isFavorite: false,
      },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('select')).toBeTruthy();
    expect(wrapper.emitted('select')![0]).toEqual([25]);
  });

  it('emits toggle-favorite event when favorite button is clicked', async () => {
    const wrapper = mount(PokemonCard, {
      props: {
        pokemon: mockPokemon,
        isFavorite: false,
      },
    });

    const starBtn = wrapper.find('.favorite-button');
    await starBtn.trigger('click');

    expect(wrapper.emitted('toggle-favorite')).toBeTruthy();
    expect(wrapper.emitted('toggle-favorite')![0]).toEqual(['pikachu']);
  });
});
