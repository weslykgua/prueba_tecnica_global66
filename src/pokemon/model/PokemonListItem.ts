import { PokemonType } from '../type/PokemonType';

export default interface PokemonListItem {
  id: number;
  name: string;
  spriteUrl: string;
  principalType: PokemonType;
  types: PokemonType[];
}
