import { PokemonType } from "../type/PokemonType";

export default interface PokemonDetail {
  id: number;
  name: string;
  formattedName: string;
  heightM: number;
  weightKg: number;
  spriteUrl: string;
  types: PokemonType[];
  abilities: string[];
  description?: string;
  category?: string;
  genderRate?: number;
  weaknesses?: PokemonType[];
}

