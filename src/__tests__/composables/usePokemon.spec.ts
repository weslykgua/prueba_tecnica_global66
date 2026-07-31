import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePokemon } from '../../composables/usePokemon';
import { pokemonService } from '../../services/pokemon.service';

vi.mock('../../services/pokemon.service', () => ({
  pokemonService: {
    getPokemonList: vi.fn(),
    getPokemonDetail: vi.fn(),
  },
}));

describe('usePokemon Composable', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('should fetch pokemon list via service and update store', async () => {
    const mockList = [
      { id: 1, name: 'bulbasaur', url: '', spriteUrl: '' },
      { id: 25, name: 'pikachu', url: '', spriteUrl: '' },
    ];
    vi.mocked(pokemonService.getPokemonList).mockResolvedValue(mockList);

    const { fetchPokemonList, filteredPokemonList, isLoading, error } = usePokemon();
    await fetchPokemonList();

    expect(pokemonService.getPokemonList).toHaveBeenCalled();
    expect(filteredPokemonList.value).toEqual(mockList);
    expect(isLoading.value).toBe(false);
    expect(error.value).toBeNull();
  });

  it('should handle API errors during list fetch', async () => {
    vi.mocked(pokemonService.getPokemonList).mockRejectedValue(new Error('API error'));

    const { fetchPokemonList, filteredPokemonList, error } = usePokemon();
    await fetchPokemonList();

    expect(filteredPokemonList.value).toEqual([]);
    expect(error.value).toBe('API error');
  });

  it('should toggle favorites and compute favoritesList correctly', async () => {
    const mockList = [
      { id: 1, name: 'bulbasaur', url: '', spriteUrl: '' },
      { id: 25, name: 'pikachu', url: '', spriteUrl: '' },
    ];
    vi.mocked(pokemonService.getPokemonList).mockResolvedValue(mockList);

    const { fetchPokemonList, toggleFavorite, isFavorite, favoritesList, favoritesCount } = usePokemon();
    await fetchPokemonList();

    toggleFavorite('pikachu');

    expect(isFavorite('pikachu')).toBe(true);
    expect(favoritesCount.value).toBe(1);
    expect(favoritesList.value).toHaveLength(1);
    expect(favoritesList.value[0].name).toBe('pikachu');
  });
});
