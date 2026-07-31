import PokemonDetailLocal from "../local/model/PokemonDetailLocal";
import PokemonDetail from "../model/PokemonDetail";
import PokeApiAbilitySlot from "../remote/model/PokeApiAbilitySlot";
import PokeApiPokemon from "../remote/model/PokeApiPokemon";
import PokeApiTypeSlot from "../remote/model/PokeApiTypeSlot";
import { capitalize } from "../utils/formatters";
import { OFFICIAL_ARTWORK_BASE_URL } from "../utils/pokemon.constants";

export class PokemonDetailMapper {
  static fromLocal(pokemon: PokemonDetailLocal): PokemonDetail {
    return {
      id: pokemon.id,
      name: pokemon.name,
      formattedName: pokemon.formattedName,
      heightM: pokemon.heightM,
      weightKg: pokemon.weightKg,
      spriteUrl: pokemon.spriteUrl,
      types: pokemon.types,
      abilities: pokemon.abilities,
    }
  }

  static toLocal(pokemon?: PokemonDetail): PokemonDetailLocal | undefined {
    if (pokemon == undefined) {
      return undefined;
    }

    return {
      id: pokemon.id,
      name: pokemon.name,
      formattedName: pokemon.formattedName,
      heightM: pokemon.heightM,
      weightKg: pokemon.weightKg,
      spriteUrl: pokemon.spriteUrl,
      types: pokemon.types,
      abilities: pokemon.abilities,
    }
  }

  static fromRemote(dto: PokeApiPokemon): PokemonDetail {
    const spriteUrl =
      dto.sprites.other?.['official-artwork']?.front_default ||
      dto.sprites.front_default ||
      `${OFFICIAL_ARTWORK_BASE_URL}/${dto.id}.png`;

    return {
      id: dto.id,
      name: dto.name,
      formattedName: capitalize(dto.name),
      heightM: dto.height / 10,
      weightKg: dto.weight / 10,
      spriteUrl,
      types: dto.types.map((t: PokeApiTypeSlot) => t.type.name),
      abilities: dto.abilities.map((a: PokeApiAbilitySlot) => a.ability.name),
    }
  }
}