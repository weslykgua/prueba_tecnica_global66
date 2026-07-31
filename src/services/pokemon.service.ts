import { axiosClient } from '../api/axiosClient';
import { PokeApiListResponse, PokeApiPokemon } from '../types/api.types';
import { PokemonDetail, PokemonListItem } from '../types/pokemon.types';
import { extractIdFromUrl, capitalize } from '../utils/formatters';
import { OFFICIAL_ARTWORK_BASE_URL, DEFAULT_LIST_LIMIT } from '../constants/pokemon.constants';

export const pokemonService = {
  /**
   * Fetches Pokémon list from PokeAPI and maps items to clean domain objects.
   */
  async getPokemonList(limit: number = DEFAULT_LIST_LIMIT, offset: number = 0): Promise<PokemonListItem[]> {
    const response = await axiosClient.get<PokeApiListResponse>(`/pokemon`, {
      params: { limit, offset },
    });

    return response.data.results.map(item => {
      const id = extractIdFromUrl(item.url);
      return {
        id,
        name: item.name,
        url: item.url,
        spriteUrl: `${OFFICIAL_ARTWORK_BASE_URL}/${id}.png`,
      };
    });
  },

  /**
   * Fetches full Pokémon detail by name or ID.
   */
  async getPokemonDetail(nameOrId: string | number): Promise<PokemonDetail> {
    const response = await axiosClient.get<PokeApiPokemon>(`/pokemon/${String(nameOrId).toLowerCase().trim()}`);
    const data = response.data;

    const spriteUrl =
      data.sprites.other?.['official-artwork']?.front_default ||
      data.sprites.front_default ||
      `${OFFICIAL_ARTWORK_BASE_URL}/${data.id}.png`;

    const types = data.types.map(t => t.type.name);
    const abilities = data.abilities.map(a => a.ability.name);

    return {
      id: data.id,
      name: data.name,
      formattedName: capitalize(data.name),
      height: data.height,
      weight: data.weight,
      spriteUrl,
      types,
      abilities,
    };
  },
};
