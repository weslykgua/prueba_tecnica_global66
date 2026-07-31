import { PokemonDetail } from '../types/pokemon.types';

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Extracts the numeric ID from a PokeAPI resource URL.
 */
export function extractIdFromUrl(url: string): number {
  const parts = url.trim().replace(/\/$/, '').split('/');
  const idStr = parts[parts.length - 1];
  const parsed = parseInt(idStr, 10);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Formats Pokémon detail into exact share format:
 * "Name, Weight, Height, Types, Abilities" (e.g. "Pikachu, 60, 4, Electric, Static")
 */
export function buildPokemonShareText(pokemon: PokemonDetail): string {
  const formattedName = capitalize(pokemon.name);
  const typesFormatted = pokemon.types.map(capitalize).join(', ');
  const abilitiesFormatted = pokemon.abilities.map(capitalize).join(', ');

  return `${formattedName}, ${pokemon.weight}, ${pokemon.height}, ${typesFormatted}, ${abilitiesFormatted}`;
}
