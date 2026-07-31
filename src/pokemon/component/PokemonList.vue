<template>
  <TransitionGroup
    name="grid-fade"
    tag="div"
    class="pokemon-grid"
    role="region"
    aria-label="Lista de Pokémon"
  >
    <PokemonCard
      v-for="pokemon in pokemonList"
      :key="pokemon.id"
      :pokemon="pokemon"
      :is-favorite="isFavorite(pokemon.name)"
      @select="$emit('select-pokemon', $event)"
      @toggle-favorite="$emit('toggle-favorite', $event)"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import PokemonListItem from '../model/PokemonListItem.ts';
import PokemonCard from './PokemonCard.vue';

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
  position: relative;

  @include respond-to('tablet') {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }
}

/* Snappy 200ms cubic-bezier transition */
.grid-fade-enter-active,
.grid-fade-leave-active {
  transition: opacity 200ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.grid-fade-enter-from {
  opacity: 0;
  transform: scale(0.97) translateY(8px);
}

.grid-fade-leave-to {
  opacity: 0;
  transform: scale(0.97) translateY(-8px);
}

.grid-fade-move {
  transition: transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
</style>
