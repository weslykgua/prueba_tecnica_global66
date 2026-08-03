import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useFavoritesStore = defineStore('favoritesStore', () => {
  const favoriteNames = ref<Set<string>>(new Set());

  const favoritesCount = computed(() => favoriteNames.value.size);

  const isFavorite = (name: string): boolean => {
    return favoriteNames.value.has(name.toLowerCase());
  };

  const toggleFavorite = (name: string) => {
    const lowerName = name.toLowerCase();
    const newSet = new Set(favoriteNames.value);

    if (newSet.has(lowerName)) {
      newSet.delete(lowerName);
    } else {
      newSet.add(lowerName);
    }

    favoriteNames.value = newSet;
  };

  const clearFavorites = () => {
    favoriteNames.value = new Set();
  };

  return {
    favoriteNames,
    favoritesCount,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
});
