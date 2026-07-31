import PokemonDetail from "../model/PokemonDetail";


/**
 * Capitalizes first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Formats weight from hectograms to kilograms string.
 */
export function formatWeight(weightInHectograms: number): string {
  return `${(weightInHectograms / 10).toFixed(1)} kg`;
}

/**
 * Formats height from decimeters to meters string.
 */
export function formatHeight(heightInDecimeters: number): string {
  return `${(heightInDecimeters / 10).toFixed(1)} m`;
}

/**
 * Formats Pokemon attributes into share text:
 * Format: "Name, Weight, Height, Types, Abilities"
 * Example: "Pikachu, 60, 4, Electric, Static"
 */
export function buildPokemonShareText(pokemon: PokemonDetail): string {
  const name = pokemon.formattedName;
  const weight = pokemon.weightKg;
  const height = pokemon.heightM;
  const types = pokemon.types.map(capitalize).join(', ');
  const abilities = pokemon.abilities.map(capitalize).join(', ');

  return `${name}, ${weight}, ${height}, ${types}, ${abilities}`;
}
