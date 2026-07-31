import NamedApiResource from "./NamedApiResource";

export default interface PokeApiAbilitySlot {
  ability: NamedApiResource;
  is_hidden: boolean;
  slot: number;
}