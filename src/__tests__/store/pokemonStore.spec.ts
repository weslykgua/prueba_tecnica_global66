import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePokemonStore } from '../../pokemon/local/store/pokemon.store';
import { PokemonType } from '@/pokemon/type/PokemonType';

describe('usePokemonStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with default state', () => {
    const store = usePokemonStore();
    expect(store.pokemonList).toEqual([]);
    expect(store.selectedPokemon).toBeUndefined();
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeUndefined();
    expect(store.isInitialized).toBe(false);
  });

  it('should update state via setPokemonList action', () => {
    const store = usePokemonStore();
    const mockList = [
      {
        id: 1,
        name: 'bulbasaur',
        spriteUrl: '',
        principalType: PokemonType.GRASS,
        types: [PokemonType.GRASS],
      },
      {
        id: 2,
        name: 'ivysaur',
        spriteUrl: '',
        principalType: PokemonType.GRASS,
        types: [PokemonType.GRASS],
      },
    ];

    store.setPokemonList(mockList);

    expect(store.pokemonList).toEqual(mockList);
    expect(store.isInitialized).toBe(true);
  });

  it('should update loading and error state cleanly', () => {
    const store = usePokemonStore();

    store.setLoading(true);
    expect(store.isLoading).toBe(true);

    store.setError('Network failure');
    expect(store.error).toBe('Network failure');

    store.setError(undefined);
    expect(store.error).toBeUndefined();
  });

  it('should set and clear selected pokemon detail', () => {
    const store = usePokemonStore();
    const mockDetail = {
      id: 25,
      name: 'pikachu',
      formattedName: 'Pikachu',
      heightM: 4,
      weightKg: 60,
      spriteUrl: 'sprite.png',
      types: ['electric'],
      abilities: ['static'],
    };

    store.setSelectedPokemon(mockDetail);
    expect(store.selectedPokemon).toEqual(mockDetail);

    store.clearSelectedPokemon();
    expect(store.selectedPokemon).toBeUndefined();
  });
});