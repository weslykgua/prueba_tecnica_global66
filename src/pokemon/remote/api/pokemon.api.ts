import { DEFAULT_LIST_LIMIT } from "@/pokemon/utils/pokemon.constants";
import pokemonClient from "./pokemon.client";
import PokeApiListResponse from "../model/PokeApiListResponse";
import PokemonListItem from "@/pokemon/model/PokemonListItem";
import PokemonDetail from "@/pokemon/model/PokemonDetail";
import { PokemonListItemMapper } from "@/pokemon/mapper/PokemonListMapper";
import { PokemonDetailMapper } from "@/pokemon/mapper/PokemonDetailMapper";
import PokeApiPokemon from "../model/PokeApiPokemon";
import { extractIdFromUrl } from "@/pokemon/utils/formatters";

export class PokemonApi {
  async getPokemonList(limit = DEFAULT_LIST_LIMIT): Promise<PokemonListItem[]> {
    const response = await pokemonClient.get<PokeApiListResponse>(`/pokemon?limit=${limit}`);

    return Promise.all(response.data.results.map(async dto => {
      const id = extractIdFromUrl(dto.url);
      const detail = await this.getPokemonDetailRemote(id);

      return PokemonListItemMapper.fromRemote(dto, detail);
    }));
      
  }

  private async getPokemonDetailRemote(id: number): Promise<PokeApiPokemon> {
    const response = await pokemonClient.get<PokeApiPokemon>(`/pokemon/${id}`);

    return response.data;
  }

  async getPokemonDetail(id: number): Promise<PokemonDetail> {
    return PokemonDetailMapper.fromRemote(await this.getPokemonDetailRemote(id));
  }
}

export const pokemonApi = new PokemonApi();
