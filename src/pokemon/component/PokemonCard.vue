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
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/variables' as *;

.pokemon-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  min-height: 102px;
  background-color: $color-white;
  border: 1px solid $color-e0e0e0;
  border-radius: 16px;
  box-sizing: border-box;
  margin-bottom: 12px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: $color-1e88e5;
  }
}

.card-left-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1 1 auto;
  min-width: 0;
  padding: 12px 0 12px 16px;
  box-sizing: border-box;
  overflow: hidden;
}

.pokemon-id {
  font-family: $font-family;
  font-weight: $font-weight-600;
  font-size: $font-size-12;
  line-height: 100%;
  color: $color-424242;
  margin: 0 0 2px 0;
}

.pokemon-name {
  font-family: $font-family;
  font-weight: $font-weight-600;
  font-style: normal;
  font-size: $font-size-21;
  letter-spacing: 0%;
  color: $color-121212;
  margin: 0 0 8px 0;
  text-align: left;
  display: block;
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.types-container {
  display: flex;
  flex-direction: row;
  gap: 6px;
  width: 100%;
  max-width: 100%;
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
}

.card-right-media {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 126px;
  min-width: 126px;
  max-width: 126px;
  height: auto;
  align-self: stretch;
  border-radius: 16px;
  overflow: hidden;
  box-sizing: border-box;
  flex: 0 0 126px;
  padding: 4px auto;
}

.card-bg-svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 94px;
  height: 94px;
  object-fit: contain;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 94px;
  height: auto;
  object-fit: contain;
  z-index: 1;
  pointer-events: none;
}

.favorite-button {
  position: absolute;
  top: 9px;
  right: 9px;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  z-index: 5;

  .heart-icon {
    width: 32px;
    height: 32px;
    display: block;
  }
}

@media (max-width: 380px) {
  .pokemon-card {
    gap: 12px;
  }

  .pokemon-name {
    margin-bottom: 4px;
  }

  .types-container {
    flex-wrap: wrap;
    overflow: visible;
  }
}
</style>
