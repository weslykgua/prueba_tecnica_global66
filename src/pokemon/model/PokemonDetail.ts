export default interface PokemonDetail {
  id: number;
  name: string;
  formattedName: string;
  heightM: number;
  weightKg: number;
  spriteUrl: string;
  types: string[];
  abilities: string[];
}