import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePokemonViewModel } from '../../presentation/viewmodels/usePokemonViewModel';
import { IPokemonRepository } from '../../domain/repositories/pokemon.repository';

describe('usePokemonViewModel (MVVM Presentation Layer)', () => {
  let mockRepo: IPokemonRepository;

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();

    mockRepo = {
      getPokemonList: vi.fn(),
      getPokemonDetail: vi.fn(),
    };
  });

  it('should fetch pokemon list via GetPokemonListUseCase and update store', async () => {
    const mockList = [
      { id: 1, name: 'bulbasaur', url: '', spriteUrl: '' },
      { id: 25, name: 'pikachu', url: '', spriteUrl: '' },
    ];
    vi.mocked(mockRepo.getPokemonList).mockResolvedValue(mockList);

    const { fetchPokemonList, filteredPokemonList, isLoading, error } = usePokemonViewModel(mockRepo);
    await fetchPokemonList();

    expect(mockRepo.getPokemonList).toHaveBeenCalled();
    expect(filteredPokemonList.value).toEqual(mockList);
    expect(isLoading.value).toBe(false);
    expect(error.value).toBeNull();
  });

  it('should handle API errors during list fetch', async () => {
    vi.mocked(mockRepo.getPokemonList).mockRejectedValue(new Error('API error'));

    const { fetchPokemonList, filteredPokemonList, error } = usePokemonViewModel(mockRepo);
    await fetchPokemonList();

    expect(filteredPokemonList.value).toEqual([]);
    expect(error.value).toBe('API error');
  });

  it('should toggle favorites and compute favoritesList correctly', async () => {
    const mockList = [
      { id: 1, name: 'bulbasaur', url: '', spriteUrl: '' },
      { id: 25, name: 'pikachu', url: '', spriteUrl: '' },
    ];
    vi.mocked(mockRepo.getPokemonList).mockResolvedValue(mockList);

    const { fetchPokemonList, toggleFavorite, isFavorite, favoritesList, favoritesCount } = usePokemonViewModel(mockRepo);
    await fetchPokemonList();

    toggleFavorite('pikachu');

    expect(isFavorite('pikachu')).toBe(true);
    expect(favoritesCount.value).toBe(1);
    expect(favoritesList.value).toHaveLength(1);
    expect(favoritesList.value[0].name).toBe('pikachu');
  });
});
