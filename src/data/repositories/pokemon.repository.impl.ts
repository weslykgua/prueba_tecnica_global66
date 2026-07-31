import { IPokemonRepository } from '../../domain/repositories/pokemon.repository';
import { PokemonListItemEntity, PokemonDetailEntity } from '../../domain/entities/pokemon.entity';
import { PokemonRemoteDataSource } from '../datasources/pokemon.datasource';
import { PokemonMapper } from '../mappers/pokemon.mapper';

export class PokemonRepositoryImpl implements IPokemonRepository {
  constructor(private remoteDataSource: PokemonRemoteDataSource = new PokemonRemoteDataSource()) {}

  async getPokemonList(limit?: number): Promise<PokemonListItemEntity[]> {
    const data = await this.remoteDataSource.fetchPokemonList(limit);
    return data.results.map(dto => PokemonMapper.toListItemEntity(dto));
  }

  async getPokemonDetail(name: string): Promise<PokemonDetailEntity> {
    const data = await this.remoteDataSource.fetchPokemonDetail(name);
    return PokemonMapper.toDetailEntity(data);
  }
}
