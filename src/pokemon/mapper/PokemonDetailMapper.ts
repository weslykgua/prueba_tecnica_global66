import PokemonDetailLocal from '../local/model/PokemonDetailLocal';
import PokemonDetail from '../model/PokemonDetail';
import PokeApiAbilitySlot from '../remote/model/PokeApiAbilitySlot';
import PokeApiPokemon from '../remote/model/PokeApiPokemon';
import PokeApiSpecies from '../remote/model/PokeApiSpecies';
import PokeApiTypeSlot from '../remote/model/PokeApiTypeSlot';
import { capitalize } from '../utils/formatters';
import { PokemonSpeciesMapper } from './PokemonSpeciesMapper';

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
      description: pokemon.description,
      category: pokemon.category,
      genderRate: pokemon.genderRate,
      weaknesses: pokemon.weaknesses,
    };
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
      description: pokemon.description,
      category: pokemon.category,
      genderRate: pokemon.genderRate,
      weaknesses: pokemon.weaknesses,
    };
  }

  static fromRemote(
    dto: PokeApiPokemon,
    speciesDto?: PokeApiSpecies,
    weaknesses: string[] = []
  ): PokemonDetail {
    const spriteUrl = dto.sprites.front_default;
    const species = speciesDto ? PokemonSpeciesMapper.fromRemote(speciesDto) : undefined;

    return {
      id: dto.id,
      name: dto.name,
      formattedName: capitalize(dto.name),
      heightM: dto.height / 10,
      weightKg: dto.weight / 10,
      spriteUrl,
      types: dto.types.map((t: PokeApiTypeSlot) => t.type.name),
      abilities: dto.abilities.map((a: PokeApiAbilitySlot) => a.ability.name),
      description: species?.description,
      category: species?.category,
      genderRate: species?.genderRate,
      weaknesses,
    };
  }
}
