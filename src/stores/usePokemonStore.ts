import { defineStore } from 'pinia';
import { ref } from 'vue';
import { PokemonDetail, PokemonListItem } from '../types/pokemon.types';

/**
 * Local Pinia store for Pokémon state management.
 * Pure state container decoupled from API calls.
 */
export const usePokemonStore = defineStore('pokemon', () => {
  // State
  const pokemonList = ref<PokemonListItem[]>([]);
  const selectedPokemon = ref<PokemonDetail | null>(null);
  const isLoading = ref<boolean>(false);
  const isDetailLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const isInitialized = ref<boolean>(false);

  // Actions
  function setPokemonList(list: PokemonListItem[]): void {
    pokemonList.value = list;
    isInitialized.value = true;
  }

  function setSelectedPokemon(detail: PokemonDetail | null): void {
    selectedPokemon.value = detail;
  }

  function setLoading(loading: boolean): void {
    isLoading.value = loading;
  }

  function setDetailLoading(loading: boolean): void {
    isDetailLoading.value = loading;
  }

  function setError(errorMessage: string | null): void {
    error.value = errorMessage;
  }

  function clearSelectedPokemon(): void {
    selectedPokemon.value = null;
  }

  function resetState(): void {
    pokemonList.value = [];
    selectedPokemon.value = null;
    isLoading.value = false;
    isDetailLoading.value = false;
    error.value = null;
    isInitialized.value = false;
  }

  return {
    // State
    pokemonList,
    selectedPokemon,
    isLoading,
    isDetailLoading,
    error,
    isInitialized,

    // Actions
    setPokemonList,
    setSelectedPokemon,
    setLoading,
    setDetailLoading,
    setError,
    clearSelectedPokemon,
    resetState,
  };
});
