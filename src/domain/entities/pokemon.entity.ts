export interface PokemonListItemEntity {
  id: number;
  name: string;
  url: string;
  spriteUrl: string;
}

export interface PokemonDetailEntity {
  id: number;
  name: string;
  formattedName: string;
  height: number;
  weight: number;
  spriteUrl: string;
  types: string[];
  abilities: string[];
}

export interface ToastMessageEntity {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

export type ActiveTabEntity = 'all' | 'favorites';
