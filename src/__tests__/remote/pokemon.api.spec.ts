import { PokemonApi } from '@/pokemon/remote/api/pokemon.api';
import { PokemonType } from '@/pokemon/type/PokemonType';
import { describe, it, expect, vi } from 'vitest';

describe('PokemonApi Service', () => {
  it('getPokemonList should fetch list cleanly', async () => {
    const api = new PokemonApi();
    const mockList = [
      {
        id: 25,
        name: 'pikachu',
        spriteUrl: 'https://raw.githubusercontent.com/.../25.png',
        principalType: PokemonType.ELECTRIC,
        types: [PokemonType.ELECTRIC],
      },
    ];

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
    const result = await api.getPokemonDetail(25);

    expect(api.getPokemonDetail).toHaveBeenCalledWith(25);
    expect(result).toEqual(mockDetail);
  });
});