import { describe, it, expect, vi } from 'vitest';
import { GetPokemonListUseCase } from '../../domain/usecases/getPokemonList.usecase';
import { GetPokemonDetailUseCase } from '../../domain/usecases/getPokemonDetail.usecase';
import { IPokemonRepository } from '../../domain/repositories/pokemon.repository';

describe('Domain UseCases', () => {
  const mockRepo: IPokemonRepository = {
    getPokemonList: vi.fn(),
    getPokemonDetail: vi.fn(),
  };

  it('GetPokemonListUseCase should call repository.getPokemonList', async () => {
    const mockList = [{ id: 25, name: 'pikachu', url: '', spriteUrl: '' }];
    vi.mocked(mockRepo.getPokemonList).mockResolvedValue(mockList);

    const useCase = new GetPokemonListUseCase(mockRepo);
    const result = await useCase.execute(10);

    expect(mockRepo.getPokemonList).toHaveBeenCalledWith(10);
    expect(result).toEqual(mockList);
  });

  it('GetPokemonDetailUseCase should call repository.getPokemonDetail', async () => {
    const mockDetail = {
      id: 25,
      name: 'pikachu',
      formattedName: 'Pikachu',
      height: 4,
      weight: 60,
      spriteUrl: '',
      types: ['electric'],
      abilities: ['static'],
    };
    vi.mocked(mockRepo.getPokemonDetail).mockResolvedValue(mockDetail);

    const useCase = new GetPokemonDetailUseCase(mockRepo);
    const result = await useCase.execute('pikachu');

    expect(mockRepo.getPokemonDetail).toHaveBeenCalledWith('pikachu');
    expect(result).toEqual(mockDetail);
  });
});
