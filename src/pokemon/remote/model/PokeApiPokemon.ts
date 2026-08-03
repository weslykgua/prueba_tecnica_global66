import PokeApiAbilitySlot from './PokeApiAbilitySlot';
import PokeApiSprites from './PokeApiSprites';
import PokeApiTypeSlot from './PokeApiTypeSlot';

export default interface PokeApiPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokeApiSprites;
  types: PokeApiTypeSlot[];
  abilities: PokeApiAbilitySlot[];
}
