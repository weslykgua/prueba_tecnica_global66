import { defineStore } from 'pinia';
import PokemonStoreState from '../model/PokemonStoreState';
import { PokemonDetailMapper } from '@/pokemon/mapper/PokemonDetailMapper';
import PokemonDetail from '@/pokemon/model/PokemonDetail';
import { PokemonListItemMapper } from '@/pokemon/mapper/PokemonListMapper';
import PokemonListItem from '@/pokemon/model/PokemonListItem';

export const usePokemonStore = defineStore('pokemonStore', {
  state: (): PokemonStoreState => ({
    pokemonList: [],
    selectedPokemon: undefined,
    isLoading: false,
    isDetailLoading: false,
    error: undefined,
    isInitialized: false,
  }),

  actions: {
    setPokemonList(list: PokemonListItem[]) {
      this.pokemonList = PokemonListItemMapper.toLocalArray(list);
      this.isInitialized = true;
    },

    setSelectedPokemon(pokemon: PokemonDetail | undefined) {
      this.selectedPokemon = PokemonDetailMapper.toLocal(pokemon);
    },

    setLoading(loading: boolean) {
      this.isLoading = loading;
    },

    setDetailLoading(loading: boolean) {
      this.isDetailLoading = loading;
    },

    setError(error: string | undefined) {
      this.error = error;
    },

    clearSelectedPokemon() {
      this.selectedPokemon = undefined;
    },
  },
});
