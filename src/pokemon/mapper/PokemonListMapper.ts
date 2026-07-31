import PokemonListItemLocal from '../local/model/PokemonListItemLocal';
import PokemonListItem from '../model/PokemonListItem';
import NamedApiResource from '../remote/model/NamedApiResource';
import { OFFICIAL_ARTWORK_BASE_URL } from '../utils/pokemon.constants';

export class PokemonListItemMapper {
  static fromRemote(dto: NamedApiResource): PokemonListItem {
    const id = this.extractIdFromUrl(dto.url);
    const spriteUrl = `${OFFICIAL_ARTWORK_BASE_URL}/${id}.png`;

    return {
      id,
      name: dto.name,
      url: dto.url,
      spriteUrl
    }
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
      url: list.url,
      spriteUrl: list.spriteUrl
    }
  }

  private static fromLocal(list: PokemonListItemLocal): PokemonListItem {
    return {
      id: list.id,
      name: list.name,
      url: list.url,
      spriteUrl: list.spriteUrl
    }
  }

  private static extractIdFromUrl(url: string): number {
    const segments = url.split('/').filter(Boolean);
    const idStr = segments[segments.length - 1];

    return parseInt(idStr, 10) || 0;
  }
}