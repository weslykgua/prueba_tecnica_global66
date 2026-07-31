import { PokemonListItemEntity, PokemonDetailEntity } from '../entities/pokemon.entity';

export interface IPokemonRepository {
  getPokemonList(limit?: number): Promise<PokemonListItemEntity[]>;
  getPokemonDetail(name: string): Promise<PokemonDetailEntity>;
}
