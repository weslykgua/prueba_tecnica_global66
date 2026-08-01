<template>
  <header class="app-header">
    <div class="container header-inner">
      <router-link to="/pokedex" class="logo-link">
        <div class="pokeball-logo">
          <div class="logo-top"></div>
          
          <div class="logo-center"></div>
        </div>
        
        <div class="brand-text">
          
          <span class="brand-title">Global66</span>
          
          <span class="brand-subtitle">Pokédex</span>
        </div>
      </router-link>

      <nav class="nav-tabs" aria-label="Navegación principal">
        <router-link
          to="/pokedex"
          class="nav-btn"
          :class="{ active: currentRoute === '/pokedex' }"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          
          <span>Todos</span>
        </router-link>

        <router-link
          to="/favorites"
          class="nav-btn"
          :class="{ active: currentRoute === '/favorites' }"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          
          <span>Favoritos</span>

          <span v-if="favoritesCount > 0" class="counter-badge">
            {{ favoritesCount }}
          </span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '@/pokemon/local/store/favorites.store';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const favoritesStore = useFavoritesStore();

const currentRoute = computed(() => route.path);
const favoritesCount = computed(() => favoritesStore.favoritesCount);
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;
@use '../../assets/styles/mixins' as *;

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: $surface-color;
  border-bottom: 1px solid $border-color;
  padding: 0.8rem 0;
  box-shadow: $shadow-sm;

  @media (prefers-color-scheme: dark) {
    background: $dark-surface;
    border-bottom-color: $border-dark;
  }
}

.header-inner {
  @include flex-between;
}

.logo-link {
  @include flex-center;
  gap: 0.75rem;
}

.pokeball-logo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #222222;
  position: relative;
  overflow: hidden;
  background: white;

  .logo-top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 50%;
    background: $primary-color;
  }

  .logo-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 9px;
    height: 9px;
    background: white;
    border: 2px solid #222222;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: $primary-color;
  line-height: 1;
}

.brand-subtitle {
  font-size: 0.68rem;
  font-weight: 600;
  color: $text-muted;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.nav-tabs {
  @include flex-center;
  gap: 0.25rem;
  background: #F8F8F8;
  padding: 0.25rem;
  border-radius: $radius-md;
  border: 1px solid $border-color;

  @media (prefers-color-scheme: dark) {
    background: #222222;
    border-color: $border-dark;
  }
}

.nav-btn {
  @include flex-center;
  gap: 0.4rem;
  padding: 0.4rem 0.95rem;
  border-radius: $radius-sm;
  font-size: 0.85rem;
  font-weight: 600;
  color: $text-secondary;
  transition: all $anim-duration $anim-ease;

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover {
    color: $text-primary;
    background: rgba(0, 0, 0, 0.04);
  }

  &.active {
    background-color: $primary-color;
    color: white;

    .counter-badge {
      background-color: white;
      color: $primary-color;
    }
  }
}

.counter-badge {
  padding: 0.08rem 0.4rem;
  border-radius: $radius-full;
  font-size: 0.72rem;
  font-weight: 700;
  background-color: $secondary-color;
  color: #222222;
}
</style>
