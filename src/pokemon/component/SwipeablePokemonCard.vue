<template>
  <div class="swipeable-card-wrapper" :class="{ 'deleting-wrapper': isDeleting }">
    <div
      class="delete-action-bg"
      :class="{ visible: isSwiped || isDragging }"
      @click.stop="onDeleteClick"
      role="button"
      :aria-label="CardTexts.removeFavoriteLabel"
    >
      <div class="trash-icon-container">
        <img :src="trashIcon" :alt="CardTexts.removeFavoriteLabel" class="trash-icon" />
      </div>
    </div>

    <div
      class="swipeable-card-content"
      :class="{ deleting: isDeleting, transitioning: !isDragging }"
      :style="{ transform: `translateX(${translateX}px)` }"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @mousedown="onMouseDown"
    >
      <PokemonCard
        :pokemon="pokemon"
        :is-favorite="isFavorite"
        @select="onCardSelect"
        @toggle-favorite="$emit('toggle-favorite', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import trashIcon from '@/assets/icons/actions/ic_trash.svg';
import PokemonListItem from '../model/PokemonListItem';
import CardTexts from '../text/card.texts';
import PokemonCard from './PokemonCard.vue';

const props = defineProps<{
  pokemon: PokemonListItem;
  isFavorite: boolean;
}>();

const emit = defineEmits<{
  (e: 'select-pokemon', id: number): void;
  (e: 'toggle-favorite', name: string): void;
}>();

const translateX = ref(0);
const isSwiped = ref(false);
const isDeleting = ref(false);
const isDragging = ref(false);

const REVEAL_WIDTH = -80;
const SWIPE_THRESHOLD = -35;
const MAX_SWIPE_LIMIT = -110;

let startX = 0;
let initialTranslateX = 0;
let hasMovedFar = false;

const onTouchStart = (e: TouchEvent) => {
  if (isDeleting.value) return;
  startX = e.touches[0].clientX;
  initialTranslateX = translateX.value;
  isDragging.value = true;
  hasMovedFar = false;
};

const onTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return;
  const currentX = e.touches[0].clientX;
  const diff = currentX - startX;

  if (Math.abs(diff) > 5) {
    hasMovedFar = true;
  }

  let nextX = initialTranslateX + diff;
  if (nextX > 0) {
    nextX = 0;
  } else if (nextX < MAX_SWIPE_LIMIT) {
    nextX = MAX_SWIPE_LIMIT;
  }

  translateX.value = nextX;
};

const onTouchEnd = () => {
  if (!isDragging.value) return;
  isDragging.value = false;

  if (translateX.value < SWIPE_THRESHOLD) {
    translateX.value = REVEAL_WIDTH;
    isSwiped.value = true;
  } else {
    translateX.value = 0;
    isSwiped.value = false;
  }
};

const onMouseDown = (e: MouseEvent) => {
  if (isDeleting.value) return;
  startX = e.clientX;
  initialTranslateX = translateX.value;
  isDragging.value = true;
  hasMovedFar = false;

  const onMouseMove = (moveEvent: MouseEvent) => {
    if (!isDragging.value) return;
    const currentX = moveEvent.clientX;
    const diff = currentX - startX;

    if (Math.abs(diff) > 5) {
      hasMovedFar = true;
    }

    let nextX = initialTranslateX + diff;
    if (nextX > 0) {
      nextX = 0;
    } else if (nextX < MAX_SWIPE_LIMIT) {
      nextX = MAX_SWIPE_LIMIT;
    }

    translateX.value = nextX;
  };

  const onMouseUp = () => {
    isDragging.value = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);

    if (translateX.value < SWIPE_THRESHOLD) {
      translateX.value = REVEAL_WIDTH;
      isSwiped.value = true;
    } else {
      translateX.value = 0;
      isSwiped.value = false;
    }
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

const onCardSelect = (id: number) => {
  if (isSwiped.value) {
    translateX.value = 0;
    isSwiped.value = false;
    return;
  }

  if (!hasMovedFar) {
    emit('select-pokemon', id);
  }
};

const onDeleteClick = () => {
  if (isDeleting.value) return;
  isDeleting.value = true;
  translateX.value = -500;

  setTimeout(() => {
    emit('toggle-favorite', props.pokemon.name);
  }, 220);
};
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/variables' as *;

.swipeable-card-wrapper {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-sizing: border-box;
  margin-bottom: 12px;
  background-color: transparent;
  transition: max-height 0.25s ease, margin-bottom 0.25s ease, opacity 0.25s ease;
  max-height: 120px;

  &.deleting-wrapper {
    max-height: 0 !important;
    margin-bottom: 0 !important;
    opacity: 0 !important;
  }
}

:deep(.pokemon-card) {
  margin-bottom: 0 !important;
}

.delete-action-bg {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $color-cd3131;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  z-index: 1;
  opacity: 0;
  pointer-events: none;
  box-sizing: border-box;
  transition: opacity 0.15s ease-in-out;

  &.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .trash-icon-container {
    width: 80px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .trash-icon {
    width: 32px;
    height: 32px;
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform: scale(0.9);
  }

  &.visible .trash-icon {
    transform: scale(1);
  }
}

.swipeable-card-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-color: $color-white;
  touch-action: pan-y;
  user-select: none;

  &.transitioning {
    transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  }

  &.deleting {
    opacity: 0;
    transform: translateX(-100%) !important;
    transition:
      transform 0.22s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.22s ease-out !important;
  }
}
</style>
