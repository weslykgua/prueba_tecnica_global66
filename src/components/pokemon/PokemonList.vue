<template>
  <div class="pokemon-grid" role="region" aria-label="Lista de Pokémon">
    <PokemonCard
      v-for="pokemon in pokemonList"
      :key="pokemon.id"
      :pokemon="pokemon"
      :is-favorite="isFavorite(pokemon.name)"
      @select="$emit('select-pokemon', $event)"
      @toggle-favorite="$emit('toggle-favorite', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import PokemonCard from './PokemonCard.vue';
import { PokemonListItem } from '../../types/pokemon.types';

defineProps<{
  pokemonList: PokemonListItem[];
  isFavorite: (name: string) => boolean;
}>();

defineEmits<{
  (e: 'select-pokemon', name: string): void;
  (e: 'toggle-favorite', name: string): void;
}>();
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;
@use '../../assets/styles/mixins' as *;

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;
  width: 100%;
  padding-bottom: 2rem;

  @include respond-to('tablet') {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }
}
</style>
