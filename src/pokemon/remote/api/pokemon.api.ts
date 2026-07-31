import { DEFAULT_LIST_LIMIT } from "@/pokemon/utils/pokemon.constants";
import pokemonClient from "./pokemon.client";
import PokeApiListResponse from "../model/PokeApiListResponse";
import PokemonListItem from "@/pokemon/model/PokemonListItem";
import PokemonDetail from "@/pokemon/model/PokemonDetail";
import { PokemonListItemMapper } from "@/pokemon/mapper/PokemonListMapper";
import { PokemonDetailMapper } from "@/pokemon/mapper/PokemonDetailMapper";
import PokeApiPokemon from "../model/PokeApiPokemon";

export class PokemonApi {
  async getPokemonList(limit = DEFAULT_LIST_LIMIT): Promise<PokemonListItem[]> {
    const response = await pokemonClient.get<PokeApiListResponse>(`/pokemon?limit=${limit}`);

    return response.data.results.map(dto => PokemonListItemMapper.fromRemote(dto));
  }

  async getPokemonDetail(name: string): Promise<PokemonDetail> {
    const response = await pokemonClient.get<PokeApiPokemon>(`/pokemon/${name.toLowerCase()}`);

    return PokemonDetailMapper.fromRemote(response.data);
  }
}

export const pokemonApi = new PokemonApi();
