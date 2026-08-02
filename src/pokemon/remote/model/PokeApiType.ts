export interface PokeApiDamageRelations {
  double_damage_from: { name: string; url: string }[];
  half_damage_from: { name: string; url: string }[];
  no_damage_from: { name: string; url: string }[];
}

export default interface PokeApiType {
  id: number;
  name: string;
  damage_relations: PokeApiDamageRelations;
}
