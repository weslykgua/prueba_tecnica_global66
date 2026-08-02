<template>
  <div class="swipeable-card-wrapper">
    <div
      class="delete-action-bg"
      :class="{ visible: isSwiped }"
      @click.stop="onDeleteClick"
      role="button"
      :aria-label="CardTexts.removeFavoriteLabel"
    >
      <img :src="trashIcon" :alt="CardTexts.removeFavoriteLabel" class="trash-icon" />
    </div>

    <div
      class="swipeable-card-content"
      :class="{ deleting: isDeleting }"
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
const SWIPE_THRESHOLD = -40;

let startX = 0;
let currentX = 0;
let isDragging = false;
let hasDragged = false;

const onTouchStart = (e: TouchEvent) => {
  startX = e.touches[0].clientX;
  currentX = startX;
  isDragging = true;
  hasDragged = false;
};

const onTouchMove = (e: TouchEvent) => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
  const diff = currentX - startX;

  if (Math.abs(diff) > 5) {
    hasDragged = true;
  }

  if (diff < 0) {
    translateX.value = Math.max(diff, -500);
    isSwiped.value = true;
  } else if (isSwiped.value && diff >= 0) {
    translateX.value = 0;
    isSwiped.value = false;
  }
};

const onTouchEnd = () => {
  if (!isDragging) return;
  isDragging = false;
  if (translateX.value <= SWIPE_THRESHOLD) {
    onDeleteClick();
  } else {
    translateX.value = 0;
    isSwiped.value = false;
  }
};

const onMouseDown = (e: MouseEvent) => {
  startX = e.clientX;
  currentX = startX;
  isDragging = true;
  hasDragged = false;

  const onMouseMove = (moveEvent: MouseEvent) => {
    if (!isDragging) return;
    currentX = moveEvent.clientX;
    const diff = currentX - startX;

    if (Math.abs(diff) > 5) {
      hasDragged = true;
    }

    if (diff < 0) {
      translateX.value = Math.max(diff, -500);
      isSwiped.value = true;
    } else if (isSwiped.value && diff >= 0) {
      translateX.value = 0;
      isSwiped.value = false;
    }
  };

  const onMouseUp = () => {
    isDragging = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);

    if (translateX.value <= SWIPE_THRESHOLD) {
      onDeleteClick();
    } else {
      translateX.value = 0;
      isSwiped.value = false;
    }
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
};

const onCardSelect = (id: number) => {
  if (!hasDragged) {
    emit('select-pokemon', id);
  }
};

const onDeleteClick = () => {
  if (isDeleting.value) return;
  isDeleting.value = true;
  translateX.value = -1000;

  setTimeout(() => {
    emit('toggle-favorite', props.pokemon.name);
  }, 250);
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
  padding-right: 28px;
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

  .trash-icon {
    width: 38px;
    height: 38px;
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
  transition: transform 0.22s cubic-bezier(0.25, 1, 0.5, 1);
  touch-action: pan-y;
  user-select: none;

  &.deleting {
    opacity: 0;
    transform: translateX(-100%) !important;
    transition:
      transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.25s ease-out !important;
  }
}
</style>
