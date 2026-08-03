import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePokemon } from '../../pokemon/composable/usePokemon';
import { PokemonApi } from '@/pokemon/remote/api/pokemon.api';
import { PokemonType } from '@/pokemon/type/PokemonType';

describe('usePokemon Composable', () => {
  let mockApi: PokemonApi;

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();

    mockApi = {
      getPokemonList: vi.fn(),
      getPokemonDetail: vi.fn(),
    } as unknown as PokemonApi;
  });

  it('should fetch pokemon list via api service and update store', async () => {
    const mockList = [
      {
        id: 1,
        name: 'bulbasaur',
        spriteUrl: '',
        principalType: PokemonType.GRASS,
        types: [PokemonType.GRASS],
      },
      {
        id: 25,
        name: 'pikachu',
        spriteUrl: '',
        principalType: PokemonType.ELECTRIC,
        types: [PokemonType.ELECTRIC],
      },
    ];
    vi.mocked(mockApi.getPokemonList).mockResolvedValue(mockList);

    const { fetchPokemonList, filteredPokemonList, isLoading, error } = usePokemon(mockApi);
    await fetchPokemonList();

    expect(mockApi.getPokemonList).toHaveBeenCalled();
    expect(filteredPokemonList.value).toEqual(mockList);
    expect(isLoading.value).toBe(false);
    expect(error.value).toBeUndefined();
  });

  it('should handle API errors during list fetch', async () => {
    vi.mocked(mockApi.getPokemonList).mockRejectedValue(new Error('API error'));

    const { fetchPokemonList, filteredPokemonList, error } = usePokemon(mockApi);
    await fetchPokemonList();

    expect(filteredPokemonList.value).toEqual([]);
    expect(error.value).toBe(
      'No pudimos cargar la información en este momento. Verifica tu conexión o intenta nuevamente más tarde.'
    );
  });

  it('should toggle favorites and compute favoritesList correctly', async () => {
    const mockList = [
      {
        id: 1,
        name: 'bulbasaur',
        spriteUrl: '',
        principalType: PokemonType.GRASS,
        types: [PokemonType.GRASS],
      },
      {
        id: 25,
        name: 'pikachu',
        spriteUrl: '',
        principalType: PokemonType.ELECTRIC,
        types: [PokemonType.ELECTRIC],
      },
    ];
    vi.mocked(mockApi.getPokemonList).mockResolvedValue(mockList);

    const { fetchPokemonList, toggleFavorite, isFavorite, favoritesList, favoritesCount } =
      usePokemon(mockApi);
    await fetchPokemonList();

    toggleFavorite('pikachu');

    expect(isFavorite('pikachu')).toBe(true);
    expect(favoritesCount.value).toBe(1);
    expect(favoritesList.value).toHaveLength(1);
    expect(favoritesList.value[0].name).toBe('pikachu');
  });
});
