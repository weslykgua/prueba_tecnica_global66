<template>
  <div
    class="pokemon-card"
    tabindex="0"
    role="button"
    :aria-label="`Ver detalle de ${formattedName}`"
    @click="$emit('select', pokemon.name)"
    @keydown.enter="$emit('select', pokemon.name)"
  >
    <div class="card-media">
      <span class="pokemon-id">#{{ formattedId }}</span>
      <img
        :src="currentImageSrc"
        :alt="formattedName"
        loading="lazy"
        class="pokemon-sprite"
        @error="onImageError"
      />
    </div>

    <div class="card-content">
      <h3 class="pokemon-name">{{ formattedName }}</h3>

      <button
        type="button"
        class="favorite-button"
        :class="{ active: isFavorite }"
        :aria-label="isFavorite ? `Quitar ${formattedName} de favoritos` : `Agregar ${formattedName} a favoritos`"
        @click.stop="$emit('toggle-favorite', pokemon.name)"
      >
        <svg
          class="star-icon"
          viewBox="0 0 24 24"
          :fill="isFavorite ? '#FFCB05' : 'none'"
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
import { PokemonListItem } from '../../types/pokemon.types';
import { capitalize } from '../../utils/formatters';
import { SPRITE_FALLBACK } from '../../constants/pokemon.constants';

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
  @include glass-card;
  border-radius: $radius-md;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-6px);
    box-shadow: $shadow-lg;
    
    .pokemon-sprite {
      transform: scale(1.1);
    }
  }

  &:focus-visible {
    outline: 2px solid $primary-color;
  }
}

.card-media {
  position: relative;
  width: 100%;
  height: 120px;
  @include flex-center;
  background: rgba(241, 245, 249, 0.5);
  border-radius: $radius-sm;
  margin-bottom: 1rem;

  @media (prefers-color-scheme: dark) {
    background: rgba(15, 23, 42, 0.4);
  }
}

.pokemon-id {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: $text-muted;
}

.pokemon-sprite {
  width: 90px;
  height: 90px;
  object-fit: contain;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.15));
}

.card-content {
  width: 100%;
  @include flex-between;
  gap: 0.5rem;
}

.pokemon-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.favorite-button {
  @include flex-center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(148, 163, 184, 0.15);
  transition: all 0.2s ease;
  color: $text-muted;

  .star-icon {
    width: 20px;
    height: 20px;
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &:hover {
    background: rgba(255, 203, 5, 0.2);
    color: #f1b800;
    
    .star-icon {
      transform: scale(1.2);
    }
  }

  &.active {
    background: rgba(255, 203, 5, 0.2);
    color: $secondary-hover;
  }
}
</style>
