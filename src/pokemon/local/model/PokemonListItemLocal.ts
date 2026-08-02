import { PokemonType } from '@/pokemon/type/PokemonType';

export default interface PokemonListItemLocal {
  id: number;
  name: string;
  spriteUrl: string;
  principalType: PokemonType;
  types: PokemonType[];
}
