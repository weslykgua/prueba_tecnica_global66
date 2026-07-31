export interface NamedApiResource {
  name: string;
  url: string;
}

export interface PokeApiListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResource[];
}

export interface PokeApiTypeSlot {
  slot: number;
  type: NamedApiResource;
}

export interface PokeApiAbilitySlot {
  ability: NamedApiResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokeApiSprites {
  front_default: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
    home?: {
      front_default: string | null;
    };
  };
}

export interface PokeApiPokemon {
  id: number;
  name: string;
  height: number; // in decimetres
  weight: number; // in hectograms
  sprites: PokeApiSprites;
  types: PokeApiTypeSlot[];
  abilities: PokeApiAbilitySlot[];
}
