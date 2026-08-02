export interface PokeApiFlavorText {
  flavor_text: string;
  language: { name: string; url: string };
  version: { name: string; url: string };
}

export interface PokeApiGenus {
  genus: string;
  language: { name: string; url: string };
}

export default interface PokeApiSpecies {
  id: number;
  gender_rate: number;
  flavor_text_entries: PokeApiFlavorText[];
  genera: PokeApiGenus[];
}
