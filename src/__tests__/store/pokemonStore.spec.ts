import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePokemonStore } from '../../stores/usePokemonStore';

describe('usePokemonStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with default state', () => {
    const store = usePokemonStore();
    expect(store.pokemonList).toEqual([]);
    expect(store.selectedPokemon).toBeNull();
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeNull();
    expect(store.isInitialized).toBe(false);
  });

  it('should update state via setPokemonList action', () => {
    const store = usePokemonStore();
    const mockList = [
      { id: 1, name: 'bulbasaur', url: '', spriteUrl: '' },
      { id: 2, name: 'ivysaur', url: '', spriteUrl: '' },
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

    store.setError(null);
    expect(store.error).toBeNull();
  });

  it('should set and clear selected pokemon detail', () => {
    const store = usePokemonStore();
    const mockDetail = {
      id: 25,
      name: 'pikachu',
      formattedName: 'Pikachu',
      height: 4,
      weight: 60,
      spriteUrl: 'sprite.png',
      types: ['electric'],
      abilities: ['static'],
    };

    store.setSelectedPokemon(mockDetail);
    expect(store.selectedPokemon).toEqual(mockDetail);

    store.clearSelectedPokemon();
    expect(store.selectedPokemon).toBeNull();
  });
});
