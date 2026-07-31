import { IPokemonRepository } from '../repositories/pokemon.repository';
import { PokemonListItemEntity } from '../entities/pokemon.entity';

export class GetPokemonListUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(limit?: number): Promise<PokemonListItemEntity[]> {
    return await this.pokemonRepository.getPokemonList(limit);
  }
}
