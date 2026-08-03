import PokeApiSpecies from '../remote/model/PokeApiSpecies';
import PokemonSpecies from '../model/PokemonSpecies';

const SPANISH_LANGUAGE = 'es';
const POKEMON_SPECIE_PREFIX = 'Pokémon '

export class PokemonSpeciesMapper {
  static fromRemote(specie: PokeApiSpecies): PokemonSpecies {
    return {
      description: PokemonSpeciesMapper.extractSpanishFlavorText(specie),
      category: PokemonSpeciesMapper.extractSpanishGenus(specie),
      genderRate: PokemonSpeciesMapper.toMalePercent(specie.gender_rate),
    };
  }

  static extractSpanishFlavorText(dto: PokeApiSpecies): string | undefined {
    const entry = dto.flavor_text_entries.find(e => e.language.name === SPANISH_LANGUAGE);

    return entry?.flavor_text.replace(/\f|\n/g, ' ').trim();
  }

  static extractSpanishGenus(dto: PokeApiSpecies): string | undefined {
    const entry = dto.genera.find(g => g.language.name === SPANISH_LANGUAGE);

    return entry?.genus?.replace(POKEMON_SPECIE_PREFIX, '').toUpperCase();
  }

  static toMalePercent(genderRate: number): number {
    if (genderRate === -1) return -1;

    return Math.round(((8 - genderRate) / 8) * 100);
  }
}
