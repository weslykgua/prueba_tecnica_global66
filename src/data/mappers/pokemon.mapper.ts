import { NamedApiResource, PokeApiPokemon, PokeApiTypeSlot, PokeApiAbilitySlot } from '../../types/api.types';
import { PokemonListItemEntity, PokemonDetailEntity } from '../../domain/entities/pokemon.entity';
import { capitalize } from '../../utils/formatters';
import { OFFICIAL_ARTWORK_BASE_URL } from '../../constants/pokemon.constants';

export class PokemonMapper {
  static toListItemEntity(dto: NamedApiResource): PokemonListItemEntity {
    const id = this.extractIdFromUrl(dto.url);
    const spriteUrl = `${OFFICIAL_ARTWORK_BASE_URL}/${id}.png`;

    return {
      id,
      name: dto.name,
      url: dto.url,
      spriteUrl,
    };
  }

  static toDetailEntity(dto: PokeApiPokemon): PokemonDetailEntity {
    const spriteUrl =
      dto.sprites.other?.['official-artwork']?.front_default ||
      dto.sprites.front_default ||
      `${OFFICIAL_ARTWORK_BASE_URL}/${dto.id}.png`;

    return {
      id: dto.id,
      name: dto.name,
      formattedName: capitalize(dto.name),
      height: dto.height / 10,
      weight: dto.weight / 10,
      spriteUrl,
      types: dto.types.map((t: PokeApiTypeSlot) => t.type.name),
      abilities: dto.abilities.map((a: PokeApiAbilitySlot) => a.ability.name),
    };
  }

  private static extractIdFromUrl(url: string): number {
    const segments = url.split('/').filter(Boolean);
    const idStr = segments[segments.length - 1];
    return parseInt(idStr, 10) || 0;
  }
}
