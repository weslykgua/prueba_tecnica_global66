export interface PokemonListItem {
  id: number;
  name: string;
  url: string;
  spriteUrl: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  formattedName: string;
  height: number;
  weight: number;
  spriteUrl: string;
  types: string[];
  abilities: string[];
}

export type ActiveTab = 'all' | 'favorites';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}
