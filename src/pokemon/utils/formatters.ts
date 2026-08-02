import PokemonDetail from '../model/PokemonDetail';
import { PokemonType } from '../type/PokemonType';
import bugIcon from '@/assets/icons/types/bug.svg';
import darkIcon from '@/assets/icons/types/dark.svg';
import dragonIcon from '@/assets/icons/types/dragon.svg';
import electricIcon from '@/assets/icons/types/electric.svg';
import fairyIcon from '@/assets/icons/types/fairy.svg';
import fightingIcon from '@/assets/icons/types/fighting.svg';
import fireIcon from '@/assets/icons/types/fire.svg';
import flyingIcon from '@/assets/icons/types/flying.svg';
import ghostIcon from '@/assets/icons/types/ghost.svg';
import grassIcon from '@/assets/icons/types/grass.svg';
import groundIcon from '@/assets/icons/types/ground.svg';
import iceIcon from '@/assets/icons/types/ice.svg';
import normalIcon from '@/assets/icons/types/normal.svg';
import poisonIcon from '@/assets/icons/types/poison.svg';
import psychicIcon from '@/assets/icons/types/psychic.svg';
import rockIcon from '@/assets/icons/types/rock.svg';
import steelIcon from '@/assets/icons/types/steel.svg';
import waterIcon from '@/assets/icons/types/water.svg';
import shadowIcon from '@/assets/icons/types/shadow.svg';
import stellarIcon from '@/assets/icons/types/stellar.svg';
import unknownIcon from '@/assets/icons/types/unknown.svg';

export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatPokemonId(id: number | string): string {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  if (isNaN(numericId) || numericId <= 0) return 'Nº000';
  return `Nº${String(numericId).padStart(3, '0')}`;
}

export function formatWeight(weightInHectograms: number): string {
  return `${(weightInHectograms / 10).toFixed(1)} kg`;
}

export function formatHeight(heightInDecimeters: number): string {
  return `${(heightInDecimeters / 10).toFixed(1)} m`;
}

export function buildPokemonShareText(pokemon: PokemonDetail): string {
  if (!pokemon) return '';
  const name = pokemon.formattedName || capitalize(pokemon.name);
  const weight = pokemon.weightKg;
  const height = pokemon.heightM;
  const types = Array.isArray(pokemon.types)
    ? pokemon.types.map(t => capitalize(String(t))).join(', ')
    : '';
  const abilities = Array.isArray(pokemon.abilities)
    ? pokemon.abilities.map(a => capitalize(String(a))).join(', ')
    : '';

  return `${name}, ${weight}, ${height}, ${types}, ${abilities}`;
}

export function formatTypeName(type: PokemonType): string {
  switch (type) {
    case PokemonType.NORMAL:
      return 'Normal';
    case PokemonType.FIGHTING:
      return 'Lucha';
    case PokemonType.FLYING:
      return 'Volador';
    case PokemonType.POISON:
      return 'Veneno';
    case PokemonType.GROUND:
      return 'Tierra';
    case PokemonType.ROCK:
      return 'Roca';
    case PokemonType.BUG:
      return 'Bicho';
    case PokemonType.GHOST:
      return 'Fantasma';
    case PokemonType.STEEL:
      return 'Acero';
    case PokemonType.FIRE:
      return 'Fuego';
    case PokemonType.WATER:
      return 'Agua';
    case PokemonType.GRASS:
      return 'Planta';
    case PokemonType.ELECTRIC:
      return 'Eléctrico';
    case PokemonType.PSYCHIC:
      return 'Psíquico';
    case PokemonType.ICE:
      return 'Hielo';
    case PokemonType.DRAGON:
      return 'Dragón';
    case PokemonType.DARK:
      return 'Siniestro';
    case PokemonType.FAIRY:
      return 'Hada';
    case PokemonType.STELLAR:
      return 'Estelar';
    case PokemonType.UNKNOWN:
      return 'Desconocido';
    case PokemonType.SHADOW:
      return 'Sombra';
  }
}

export function getTypeBackgroundColor(type: PokemonType): string {
  switch (type) {
    case PokemonType.NORMAL:
      return '#A8A77A';
    case PokemonType.FIGHTING:
      return '#C22E28';
    case PokemonType.FLYING:
      return '#A98FF3';
    case PokemonType.POISON:
      return '#A33EA2';
    case PokemonType.GROUND:
      return '#E2BF65';
    case PokemonType.ROCK:
      return '#B6A136';
    case PokemonType.BUG:
      return '#A6B91A';
    case PokemonType.GHOST:
      return '#735797';
    case PokemonType.STEEL:
      return '#B7B7CE';
    case PokemonType.FIRE:
      return '#EE8130';
    case PokemonType.WATER:
      return '#6390F0';
    case PokemonType.GRASS:
      return '#7AC74C';
    case PokemonType.ELECTRIC:
      return '#F7D02C';
    case PokemonType.PSYCHIC:
      return '#F95587';
    case PokemonType.ICE:
      return '#96D9D6';
    case PokemonType.DRAGON:
      return '#6F35FC';
    case PokemonType.DARK:
      return '#705746';
    case PokemonType.FAIRY:
      return '#D685AD';
    case PokemonType.STELLAR:
      return '#43A8A4';
    case PokemonType.UNKNOWN:
      return '#68A090';
    case PokemonType.SHADOW:
      return '#5A5266';
  }
}

export function getTypeIcon(type: PokemonType): string {
  switch (type) {
    case PokemonType.NORMAL:
      return normalIcon;
    case PokemonType.FIGHTING:
      return fightingIcon;
    case PokemonType.FLYING:
      return flyingIcon;
    case PokemonType.POISON:
      return poisonIcon;
    case PokemonType.GROUND:
      return groundIcon;
    case PokemonType.ROCK:
      return rockIcon;
    case PokemonType.BUG:
      return bugIcon;
    case PokemonType.GHOST:
      return ghostIcon;
    case PokemonType.STEEL:
      return steelIcon;
    case PokemonType.FIRE:
      return fireIcon;
    case PokemonType.WATER:
      return waterIcon;
    case PokemonType.GRASS:
      return grassIcon;
    case PokemonType.ELECTRIC:
      return electricIcon;
    case PokemonType.PSYCHIC:
      return psychicIcon;
    case PokemonType.ICE:
      return iceIcon;
    case PokemonType.DRAGON:
      return dragonIcon;
    case PokemonType.DARK:
      return darkIcon;
    case PokemonType.FAIRY:
      return fairyIcon;
    case PokemonType.STELLAR:
      return stellarIcon;
    case PokemonType.UNKNOWN:
      return unknownIcon;
    case PokemonType.SHADOW:
      return shadowIcon;
  }
}

export function extractIdFromUrl(url: string): number {
  const segments = url.split('/').filter(Boolean);
  const idStr = segments[segments.length - 1];

  return parseInt(idStr, 10) || 0;
}
