import PokemonDetailLocal from './PokemonDetailLocal';
import PokemonListItemLocal from './PokemonListItemLocal';

export default interface PokemonStoreState {
  pokemonList: PokemonListItemLocal[];
  selectedPokemon: PokemonDetailLocal | undefined;
  isLoading: boolean;
  isDetailLoading: boolean;
  error: string | undefined;
  isInitialized: boolean;
  simulatedErrorTriggered?: boolean;
}
