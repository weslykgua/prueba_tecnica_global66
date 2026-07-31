import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useFavoritesStore } from '../../pokemon/local/store/favorites.store';

describe('useFavoritesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with an empty set of favorites', () => {
    const store = useFavoritesStore();
    expect(store.favoriteNames.size).toBe(0);
    expect(store.favoritesCount).toBe(0);
    expect(store.isFavorite('pikachu')).toBe(false);
  });

  it('should toggle favorites on and off cleanly', () => {
    const store = useFavoritesStore();

    store.toggleFavorite('pikachu');
    expect(store.isFavorite('pikachu')).toBe(true);
    expect(store.favoritesCount).toBe(1);

    store.toggleFavorite('pikachu');
    expect(store.isFavorite('pikachu')).toBe(false);
    expect(store.favoritesCount).toBe(0);
  });

  it('should clear all favorites', () => {
    const store = useFavoritesStore();
    store.toggleFavorite('pikachu');
    store.toggleFavorite('bulbasaur');
    expect(store.favoritesCount).toBe(2);

    store.clearFavorites();
    expect(store.favoritesCount).toBe(0);
  });
});
