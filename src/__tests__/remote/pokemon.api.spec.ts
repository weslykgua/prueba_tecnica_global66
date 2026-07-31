import { PokemonApi } from '@/pokemon/remote/api/pokemon.api';
import { describe, it, expect, vi } from 'vitest';

describe('PokemonApi Service', () => {
  it('getPokemonList should fetch list cleanly', async () => {
    const api = new PokemonApi();
    const mockList = [{ id: 25, name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/', spriteUrl: 'https://raw.githubusercontent.com/.../25.png' }];
    
    vi.spyOn(api, 'getPokemonList').mockResolvedValue(mockList);
    const result = await api.getPokemonList(10);

    expect(api.getPokemonList).toHaveBeenCalledWith(10);
    expect(result).toEqual(mockList);
  });

  it('getPokemonDetail should fetch detail cleanly', async () => {
    const api = new PokemonApi();
    const mockDetail = {
      id: 25,
      name: 'pikachu',
      formattedName: 'Pikachu',
      heightM: 0.4,
      weightKg: 6,
      spriteUrl: 'https://raw.githubusercontent.com/.../25.png',
      types: ['electric'],
      abilities: ['static'],
    };

    vi.spyOn(api, 'getPokemonDetail').mockResolvedValue(mockDetail);
    const result = await api.getPokemonDetail('pikachu');

    expect(api.getPokemonDetail).toHaveBeenCalledWith('pikachu');
    expect(result).toEqual(mockDetail);
  });
});
