<template>
  <div
    class="pokemon-card"
    tabindex="0"
    role="button"
    :style="{ backgroundColor: cardBgColor + '80' }"
    :aria-label="CardTexts.viewDetailAria(formattedName)"
    @click="$emit('select', pokemon.id)"
    @keydown.enter="$emit('select', pokemon.id)"
  >
    <div class="card-left-info">
      <Typography variant="caption" color="body" weight="semibold" class="pokemon-id">
        {{ formattedId }}
      </Typography>
      <Typography variant="h3" color="title" weight="semibold" class="pokemon-name">
        {{ formattedName }}
      </Typography>

      <div v-if="displayTypes.length > 0" class="types-container">
        <TypeBadge v-for="typeCategory in displayTypes" :key="typeCategory" :type="typeCategory" />
      </div>
    </div>

    <div class="card-right-media" :style="{ backgroundColor: cardBgColor }">
      <img :src="cardBgSvg" alt="Fondo tipo" class="card-bg-svg" />

      <img
        :src="currentImageSrc"
        :alt="formattedName"
        loading="lazy"
        class="pokemon-sprite"
        @error="onImageError"
      />

      <button
        type="button"
        class="favorite-button"
        :class="{ active: isFavorite }"
        :aria-label="CardTexts.favoriteAria(isFavorite)"
        @click.stop="$emit('toggle-favorite', pokemon.name)"
      >
        <img
          :src="isFavorite ? heartFilledIcon : heartOutlineIcon"
          :alt="isFavorite ? 'Favorito' : 'No favorito'"
          class="heart-icon"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TypeBadge from '@/pokemon/component/TypeBadge.vue';
import Typography from '@/common/component/Typography.vue';
import CardTexts from '../text/card.texts';
import heartFilledIcon from '@/assets/icons/favorites/ic_heart_filled.svg';
import heartOutlineIcon from '@/assets/icons/favorites/ic_heart_outline.svg';
import {
  capitalize,
  formatPokemonId,
  getTypeBackgroundColor,
  getTypeIcon,
} from '../utils/formatters';

import PokemonListItem from '../model/PokemonListItem';
import { PokemonType, toPokemonType } from '../type/PokemonType';

const props = defineProps<{
  pokemon: PokemonListItem;
  isFavorite: boolean;
}>();

defineEmits<{
  (e: 'select', id: number): void;
  (e: 'toggle-favorite', name: string): void;
}>();

const imageError = ref(false);

const currentImageSrc = computed(() => {
  return props.pokemon.spriteUrl;
});

const formattedName = computed(() => capitalize(props.pokemon.name));
const formattedId = computed(() => formatPokemonId(props.pokemon.id));

const displayTypes = computed<PokemonType[]>(() => {
  if (!props.pokemon.types || !Array.isArray(props.pokemon.types)) return [];
  return props.pokemon.types
    .map(t => toPokemonType(t))
    .filter((cat): cat is PokemonType => cat !== undefined);
});

const mainCategory = computed<PokemonType>(() => props.pokemon.principalType);

const cardBgColor = computed(() => {
  return getTypeBackgroundColor(mainCategory.value);
});

const cardBgSvg = computed(() => {
  return getTypeIcon(mainCategory.value);
});

const onImageError = () => {
  imageError.value = true;
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;

.pokemon-card {
  display: var(--display-flex);
  flex-direction: var(--flex-direction-row);
  justify-content: var(--justify-between);
  align-items: stretch;
  width: $size-100-percent;
  min-height: $size-102px;
  background-color: $color-white;
  border: $size-1px solid $color-e0e0e0;
  border-radius: $size-16px;
  box-sizing: var(--border-box);
  margin-bottom: $size-12px;
  position: var(--position-relative);
  cursor: pointer;
  overflow: var(--overflow-hidden);
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: $color-1e88e5;
  }
}

.card-left-info {
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  justify-content: var(--justify-between);
  align-items: var(--align-flex-start);
  flex: 1 1 auto;
  min-width: $size-0px;
  padding: $size-12px $size-0px $size-12px $size-16px;
  box-sizing: var(--border-box);
  overflow: var(--overflow-hidden);
}

.pokemon-id {
  font-family: $font-family;
  font-weight: $font-weight-600;
  font-size: $font-size-12;
  line-height: $size-100-percent;
  color: $color-424242;
  margin: $size-0px $size-0px $size-2px $size-0px;
}

.pokemon-name {
  font-family: $font-family;
  font-weight: $font-weight-600;
  font-style: normal;
  font-size: $font-size-21;
  letter-spacing: 0%;
  color: $color-121212;
  margin: $size-0px $size-0px $size-8px $size-0px;
  text-align: left;
  display: var(--display-block);
  width: $size-100-percent;
  max-width: $size-100-percent;
  white-space: nowrap;
  overflow: var(--overflow-hidden);
  text-overflow: ellipsis;
}

.types-container {
  display: var(--display-flex);
  flex-direction: var(--flex-direction-row);
  gap: $size-6px;
  width: $size-100-percent;
  max-width: $size-100-percent;
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: var(--display-none);
    width: $size-0px;
    height: $size-0px;
  }
}

.card-right-media {
  display: var(--display-flex);
  justify-content: var(--justify-center);
  align-items: var(--align-center);
  position: var(--position-relative);
  width: $size-126px;
  min-width: $size-126px;
  max-width: $size-126px;
  height: $size-auto;
  align-self: stretch;
  border-radius: $size-16px;
  overflow: var(--overflow-hidden);
  box-sizing: var(--border-box);
  flex: 0 0 $size-126px;
  padding: $size-4px $size-auto;
}

.card-bg-svg {
  position: var(--position-absolute);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: $size-94px;
  height: $size-94px;
  object-fit: var(--object-contain);
  z-index: 0;
  pointer-events: none;
  mask-image: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.1) 100%);
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
}

.pokemon-sprite {
  position: var(--position-absolute);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: $size-94px;
  height: $size-auto;
  object-fit: var(--object-contain);
  z-index: 1;
  pointer-events: none;
}

.favorite-button {
  position: var(--position-absolute);
  top: $size-9px;
  right: $size-9px;
  width: $size-32px;
  height: $size-32px;
  border: var(--border-none);
  background: transparent;
  padding: $size-0px;
  cursor: pointer;
  z-index: 5;

  .heart-icon {
    width: $size-32px;
    height: $size-32px;
    display: var(--display-block);
  }
}

@media (max-width: $size-380px) {
  .pokemon-card {
    gap: $size-8px;
  }

  .pokemon-name {
    margin-bottom: $size-4px;
  }

  .types-container {
    flex-wrap: var(--flex-wrap-wrap);
    gap: $size-4px;
    overflow: var(--overflow-hidden);
  }
}
</style>
