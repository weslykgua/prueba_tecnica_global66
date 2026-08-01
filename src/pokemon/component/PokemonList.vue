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
  (e: 'select-pokemon', id: number): void;
  (e: 'toggle-favorite', name: string): void;
}>();

</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;
@use '../../assets/styles/mixins' as *;

.pokemon-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: calc(100% - 32px);
  margin: 0 16px;
  box-sizing: border-box;
  position: relative;
}

.grid-fade-enter-active,
.grid-fade-leave-active {
  transition:
    opacity 200ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
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
