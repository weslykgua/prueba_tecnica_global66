<template>
  <div
    class="pokemon-card"
    :style="{ backgroundColor: cardBgColor + '80' }"
    @click="$emit('select', pokemon.id)"
    tabindex="0"
    role="button"
    :aria-label="`Ver detalle de ${formattedName}`"
    @keydown.enter="$emit('select', pokemon.id)"
  >
    <div class="card-left-info">
      <div class="card-header">
        <h3 class="pokemon-name">{{ formattedName }}</h3>
        <span class="pokemon-id">#{{ formattedId }}</span>
      </div>

      <div class="types-container" v-if="displayTypes.length > 0">
        <div
          v-for="typeCategory in displayTypes"
          :key="typeCategory"
          class="type-pill"
          :style="{ backgroundColor: getTypeBackgroundColor(typeCategory) }"
        >
          <img
            v-if="getTypeIcon(typeCategory)"
            :src="getTypeIcon(typeCategory)"
            :alt="typeCategory"
            class="type-icon-img"
          />
          <span>{{ formatTypeName(typeCategory) }}</span>
        </div>
      </div>
    </div>

    <div class="card-right-media" :style="{ backgroundColor: cardBgColor }">
      <img :src="cardBgSvg" alt="Fondo tipo" class="card-bg-svg" />

      <img
        :src="currentImageSrc"
        :alt="formattedName"
        @error="onImageError"
        loading="lazy"
        class="pokemon-sprite"
      />

      <button
        type="button"
        class="favorite-button"
        :class="{ active: isFavorite }"
        @click.stop="$emit('toggle-favorite', pokemon.name)"
        :aria-label="
          isFavorite
            ? `Quitar ${formattedName} de favoritos`
            : `Agregar ${formattedName} a favoritos`
        "
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
import heartFilledIcon from '@/assets/ic_heart_filled.svg';
import heartOutlineIcon from '@/assets/ic_heart_outline.svg';
import { capitalize, formatTypeName, getTypeIcon, getTypeBackgroundColor } from '../utils/formatters';

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
const formattedId = computed(() => String(props.pokemon.id).padStart(3, '0'));

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
@use '../../assets/styles/variables' as *;

.pokemon-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  border: 1px solid $border-color;
  border-radius: 16px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: $primary-color;
  }
}

.card-left-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex: 1;
  min-width: 0;
  padding: 12.1px 8px 12.1px 16px;
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pokemon-name {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 21px;
  letter-spacing: 0%;
  color: #222222;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pokemon-id {
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #424242;
}

.types-container {
  display: flex;
  flex-direction: row;
  gap: 6px;
  width: 100%;
}

.type-pill {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 25.8px;
  padding: 0 8px;
  border-radius: 20px;
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: #ffffff;
  white-space: nowrap;
  box-sizing: border-box;

  .type-icon-img {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
}

.card-right-media {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 126px;
  height: 102px;
  border-radius: 16px;
  overflow: hidden;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-grow: 0;
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
}

.pokemon-sprite {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 94px;
  height: 94px;
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
</style>
