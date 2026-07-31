import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

/**
 * Local Pinia store dedicated exclusively to managing favorites.
 * Strictly decoupled from API calls.
 */
export const useFavoritesStore = defineStore('favorites', () => {
  // State
  const favoriteNames = ref<Set<string>>(new Set());

  // Getters
  const isFavorite = computed(() => {
    return (name: string): boolean => favoriteNames.value.has(name.toLowerCase());
  });

  const favoritesCount = computed<number>(() => favoriteNames.value.size);

  // Actions
  function toggleFavorite(name: string): void {
    const normalized = name.toLowerCase();
    const newSet = new Set(favoriteNames.value);
    if (newSet.has(normalized)) {
      newSet.delete(normalized);
    } else {
      newSet.add(normalized);
    }
    favoriteNames.value = newSet;
  }

  function clearFavorites(): void {
    favoriteNames.value = new Set();
  }

  return {
    // State
    favoriteNames,

    // Getters
    isFavorite,
    favoritesCount,

    // Actions
    toggleFavorite,
    clearFavorites,
  };
});
