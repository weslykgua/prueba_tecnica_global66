import { IPokemonRepository } from '../repositories/pokemon.repository';
import { PokemonDetailEntity } from '../entities/pokemon.entity';

export class GetPokemonDetailUseCase {
  constructor(private pokemonRepository: IPokemonRepository) {}

  async execute(name: string): Promise<PokemonDetailEntity> {
    return await this.pokemonRepository.getPokemonDetail(name);
  }
}
