import PokeApiDamageRelations from "./PokeApiDamageRelations";
import PokeApiTypePokemon from "./PokeApiTypePokemon";

export default interface PokeApiType {
  id: number;
  name: string;
  damage_relations: PokeApiDamageRelations;
  pokemon: PokeApiTypePokemon[];
}