import axiosClient from '../../api/axiosClient';
import { PokeApiListResponse, PokeApiPokemon } from '../../types/api.types';
import { DEFAULT_LIST_LIMIT } from '../../constants/pokemon.constants';

export class PokemonRemoteDataSource {
  async fetchPokemonList(limit = DEFAULT_LIST_LIMIT): Promise<PokeApiListResponse> {
    const response = await axiosClient.get<PokeApiListResponse>(`/pokemon?limit=${limit}`);
    return response.data;
  }

  async fetchPokemonDetail(name: string): Promise<PokeApiPokemon> {
    const response = await axiosClient.get<PokeApiPokemon>(`/pokemon/${name.toLowerCase()}`);
    return response.data;
  }
}
