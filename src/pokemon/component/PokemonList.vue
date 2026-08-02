<template>
  <TransitionGroup
    name="grid-fade"
    tag="div"
    class="pokemon-grid"
    role="region"
    aria-label="Lista de Pokémon"
  >
    <template v-if="enableSwipe">
      <SwipeablePokemonCard
        v-for="pokemon in pokemonList"
        :key="pokemon.id"
        :pokemon="pokemon"
        :is-favorite="isFavorite(pokemon.name)"
        @select-pokemon="onSelectPokemon"
        @toggle-favorite="onToggleFavorite"
      />
    </template>
    <template v-else>
      <PokemonCard
        v-for="pokemon in pokemonList"
        :key="pokemon.id"
        :pokemon="pokemon"
        :is-favorite="isFavorite(pokemon.name)"
        @select="onSelectPokemon"
        @toggle-favorite="onToggleFavorite"
      />
    </template>
  </TransitionGroup>
</template>

<script setup lang="ts">
import PokemonListItem from '../model/PokemonListItem.ts';
import PokemonCard from './PokemonCard.vue';
import SwipeablePokemonCard from './SwipeablePokemonCard.vue';

withDefaults(
  defineProps<{
    pokemonList: PokemonListItem[];
    isFavorite: (name: string) => boolean;
    enableSwipe?: boolean;
  }>(),
  {
    enableSwipe: false,
  }
);

const emit = defineEmits<{
  (e: 'select-pokemon', id: number): void;
  (e: 'toggle-favorite', name: string): void;
}>();

const onSelectPokemon = (id: number) => {
  emit('select-pokemon', id);
};

const onToggleFavorite = (name: string) => {
  emit('toggle-favorite', name);
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/mixins' as *;

.pokemon-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $size-0px;
  width: calc(#{$size-100-percent} - #{$size-32px});
  margin: $size-0px $size-16px;
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
