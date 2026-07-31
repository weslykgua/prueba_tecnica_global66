<template>
  <div
    class="pokemon-card"
    @click="$emit('select', pokemon.name)"
    tabindex="0"
    role="button"
    :aria-label="`Ver detalle de ${formattedName}`"
    @keydown.enter="$emit('select', pokemon.name)"
  >
    <div class="card-media">
      <span class="pokemon-id">#{{ formattedId }}</span>
      <img
        :src="currentImageSrc"
        :alt="formattedName"
        @error="onImageError"
        loading="lazy"
        class="pokemon-sprite"
      />
    </div>

    <div class="card-content">
      <h3 class="pokemon-name">{{ formattedName }}</h3>

      <button
        type="button"
        class="favorite-button"
        :class="{ active: isFavorite }"
        @click.stop="$emit('toggle-favorite', pokemon.name)"
        :aria-label="isFavorite ? `Quitar ${formattedName} de favoritos` : `Agregar ${formattedName} a favoritos`"
      >
        <svg
          class="star-icon"
          viewBox="0 0 24 24"
          :fill="isFavorite ? '#F2C94C' : 'none'"
          stroke="currentColor"
          stroke-width="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { capitalize } from '../utils/formatters';
import { SPRITE_FALLBACK } from '../utils/pokemon.constants';
import PokemonListItem from '../model/PokemonListItem';

const props = defineProps<{
  pokemon: PokemonListItem;
  isFavorite: boolean;
}>();

defineEmits<{
  (e: 'select', name: string): void;
  (e: 'toggle-favorite', name: string): void;
}>();

const imageError = ref(false);

const currentImageSrc = computed(() => {
  if (imageError.value) return SPRITE_FALLBACK;
  return props.pokemon.spriteUrl;
});

const formattedName = computed(() => capitalize(props.pokemon.name));

const formattedId = computed(() => String(props.pokemon.id).padStart(3, '0'));

const onImageError = () => {
  imageError.value = true;
};
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;
@use '../../assets/styles/mixins' as *;

.pokemon-card {
  background-color: $card-bg;
  border: 1px solid $border-color;
  border-radius: $radius-card;
  box-shadow: $shadow-sm;
  padding: 1.15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  will-change: transform;
  transform: translateZ(0);
  transition: transform $anim-duration $anim-ease, border-color $anim-duration $anim-ease, box-shadow $anim-duration $anim-ease;

  @media (prefers-color-scheme: dark) {
    background-color: $dark-card;
    border-color: $border-dark;
  }

  &:hover {
    transform: translateY(-2px) translateZ(0);
    border-color: rgba(216, 59, 59, 0.35);
    box-shadow: $shadow-md;

    .pokemon-sprite {
      transform: scale(1.05);
    }
  }

  &:focus-visible {
    outline: 2px solid $primary-color;
  }
}

.card-media {
  position: relative;
  width: 100%;
  height: 110px;
  @include flex-center;
  background: #FFFDF9;
  border-radius: $radius-md;
  margin-bottom: 0.85rem;
  border: 1px solid $border-color;

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.06);
  }
}

.pokemon-id {
  position: absolute;
  top: 0.45rem;
  left: 0.5rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: $text-muted;
}

.pokemon-sprite {
  width: 82px;
  height: 82px;
  object-fit: contain;
  transition: transform $anim-duration $anim-ease;
}

.card-content {
  width: 100%;
  @include flex-between;
  gap: 0.5rem;
}

.pokemon-name {
  font-size: 1rem;
  font-weight: 700;
  color: $text-primary;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (prefers-color-scheme: dark) {
    color: #FFFEFC;
  }
}

.favorite-button {
  @include flex-center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.03);
  border: 1px solid $border-color;
  transition: all $anim-duration $anim-ease;
  color: $text-muted;

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.04);
    border-color: $border-dark;
  }

  .star-icon {
    width: 17px;
    height: 17px;
    transition: transform $anim-duration $anim-ease;
  }

  &:hover {
    background: rgba(242, 201, 76, 0.15);
    border-color: $secondary-color;
    color: $secondary-hover;

    .star-icon {
      transform: scale(1.08);
    }
  }

  &.active {
    background: rgba(242, 201, 76, 0.18);
    border-color: $secondary-color;
    color: $secondary-color;
  }
}
</style>
