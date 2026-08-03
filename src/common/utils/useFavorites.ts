import { useFavoritesStore } from '@/pokemon/local/store/favorites.store';
import { computed } from 'vue';

export function useFavorites() {
  const favoritesStore = useFavoritesStore();

  return {
    favoriteNames: computed(() => favoritesStore.favoriteNames),
    favoritesCount: computed(() => favoritesStore.favoritesCount),
    isFavorite: favoritesStore.isFavorite,
    toggleFavorite: favoritesStore.toggleFavorite,
    clearFavorites: favoritesStore.clearFavorites,
  };
}
