import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonCard from '../../components/pokemon/PokemonCard.vue';
import { PokemonListItem } from '../../types/pokemon.types';

describe('PokemonCard.vue', () => {
  const mockPokemon: PokemonListItem = {
    id: 25,
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
    spriteUrl: 'https://raw.githubusercontent.com/.../25.png',
  };

  it('renders pokemon formatted name and ID correctly', () => {
    const wrapper = mount(PokemonCard, {
      props: {
        pokemon: mockPokemon,
        isFavorite: false,
      },
    });

    expect(wrapper.find('.pokemon-name').text()).toBe('Pikachu');
    expect(wrapper.find('.pokemon-id').text()).toBe('#025');
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
    expect(wrapper.emitted('select')?.[0]).toEqual(['pikachu']);
  });

  it('emits toggle-favorite event when star button is clicked', async () => {
    const wrapper = mount(PokemonCard, {
      props: {
        pokemon: mockPokemon,
        isFavorite: true,
      },
    });

    const favButton = wrapper.find('.favorite-button');
    await favButton.trigger('click');

    expect(wrapper.emitted('toggle-favorite')).toBeTruthy();
    expect(wrapper.emitted('toggle-favorite')?.[0]).toEqual(['pikachu']);
  });
});
