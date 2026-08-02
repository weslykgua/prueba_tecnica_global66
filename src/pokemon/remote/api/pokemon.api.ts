import { DEFAULT_LIST_LIMIT } from '@/pokemon/utils/pokemon.constants';
import pokemonClient from './pokemon.client';
import PokeApiListResponse from '../model/PokeApiListResponse';
import PokemonListItem from '@/pokemon/model/PokemonListItem';
import PokemonDetail from '@/pokemon/model/PokemonDetail';
import { PokemonListItemMapper } from '@/pokemon/mapper/PokemonListMapper';
import { PokemonDetailMapper } from '@/pokemon/mapper/PokemonDetailMapper';
import PokeApiPokemon from '../model/PokeApiPokemon';
import PokeApiSpecies from '../model/PokeApiSpecies';
import PokeApiType from '../model/PokeApiType';
import { extractIdFromUrl } from '@/pokemon/utils/formatters';
import { PokemonType, toPokemonType } from '@/pokemon/type/PokemonType';

export class PokemonApi {
  async getPokemonList(limit = DEFAULT_LIST_LIMIT): Promise<PokemonListItem[]> {
    const response = await pokemonClient.get<PokeApiListResponse>(`/pokemon?limit=${limit}`);
    // throw new Error("Error de conexión simulado");
    return Promise.all(
      response.data.results.map(async dto => {
        const id = extractIdFromUrl(dto.url);
        const detail = await this.getPokemonDetailRemote(id);

        return PokemonListItemMapper.fromRemote(dto, detail);
      })
    );
  }

  private async getPokemonDetailRemote(id: number): Promise<PokeApiPokemon> {
    const response = await pokemonClient.get<PokeApiPokemon>(`/pokemon/${id}`);

    return response.data;
  }

  private async getPokemonSpeciesRemote(id: number): Promise<PokeApiSpecies> {
    const response = await pokemonClient.get<PokeApiSpecies>(`/pokemon-species/${id}`);

    return response.data;
  }

  private async getPokemonTypeRemote(typeNameOrId: string): Promise<PokeApiType> {
    const response = await pokemonClient.get<PokeApiType>(`/type/${typeNameOrId}`);

    return response.data;
  }

  async getPokemonsByTypes(types: PokemonType[]) {

    console.log("types", types);
    const pokemonList: PokemonListItem[] = [];

    for (const type of types) {
        console.log("type", type);
      const t = await this.getPokemonTypeRemote(type);
      console.log("type", t);

      const pokemons = await Promise.all(
        t.pokemon.map(async pokemon => {
          const id = extractIdFromUrl(pokemon.pokemon.url);
          const detail = await this.getPokemonDetailRemote(id)

          return PokemonListItemMapper.fromRemote(pokemon.pokemon, detail);
        })
      )

      pokemonList.push(...pokemons);
    }

    return pokemonList;
  }

  private async getWeaknessesForTypes(typeNames: PokemonType[]): Promise<string[]> {
    const results = await Promise.allSettled(
      typeNames.map(t => this.getPokemonTypeRemote(t)),
    );

    const weaknessSet = new Set<string>();
    for (const result of results) {
      if (result.status === 'fulfilled') {
        for (const w of result.value.damage_relations.double_damage_from) {
          weaknessSet.add(w.name);
        }
      }
    }

    return [...weaknessSet];
  }

  async getPokemonDetail(id: number): Promise<PokemonDetail> {
    const [pokemonResult, speciesResult] = await Promise.allSettled([
      this.getPokemonDetailRemote(id),
      this.getPokemonSpeciesRemote(id),
    ]);

    if (pokemonResult.status === 'rejected') {
      throw pokemonResult.reason;
    }

    const pokemonDto = pokemonResult.value;
    const species = speciesResult.status === 'fulfilled' ? speciesResult.value : undefined;

    const typeNames = pokemonDto.types.map(t => toPokemonType(t.type.name)!);
    const weaknesses = await this.getWeaknessesForTypes(typeNames).catch(() => []);

    return PokemonDetailMapper.fromRemote(pokemonDto, species, weaknesses);
  }
}

export const pokemonApi = new PokemonApi();