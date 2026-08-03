import PokemonListItemLocal from '../local/model/PokemonListItemLocal';
import PokemonListItem from '../model/PokemonListItem';
import NamedApiResource from '../remote/model/NamedApiResource';
import PokeApiPokemon from '../remote/model/PokeApiPokemon';
import { toPokemonType } from '../type/PokemonType';

export class PokemonListItemMapper {
  static fromRemote(dto: NamedApiResource, detail: PokeApiPokemon): PokemonListItem {
    const types = detail.types.map(type => toPokemonType(type.type.name)!);

    return {
      id: detail.id,
      name: dto.name,
      spriteUrl: detail.sprites.front_default,
      principalType: types[0],
      types: types,
    };
  }

  static toLocalArray(list: PokemonListItem[]): PokemonListItemLocal[] {
    return list.map(this.toLocal);
  }

  static fromLocalArray(list: PokemonListItemLocal[]): PokemonListItem[] {
    return list.map(this.fromLocal);
  }

  private static toLocal(list: PokemonListItem): PokemonListItemLocal {
    return {
      id: list.id,
      name: list.name,
      spriteUrl: list.spriteUrl,
      principalType: list.principalType,
      types: list.types,
    };
  }

  private static fromLocal(list: PokemonListItemLocal): PokemonListItem {
    return {
      id: list.id,
      name: list.name,
      spriteUrl: list.spriteUrl,
      principalType: list.principalType,
      types: list.types,
    };
  }
}
