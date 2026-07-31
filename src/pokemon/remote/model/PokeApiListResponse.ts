import NamedApiResource from "./NamedApiResource";

export default interface PokeApiListResponse {
  count: number;
  next: string | undefined;
  previous: string | undefined;
  results: NamedApiResource[];
}