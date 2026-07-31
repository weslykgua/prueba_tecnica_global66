<template>
  <header class="app-header">
    <div class="container header-inner">
      <router-link to="/" class="logo-link">
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
          to="/"
          class="nav-btn"
          :class="{ active: currentRoute === '/' }"
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
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useFavoritesStore } from '../../stores/useFavoritesStore';

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
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  padding: 0.85rem 0;

  @media (prefers-color-scheme: dark) {
    background: rgba(15, 23, 42, 0.85);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid $primary-color;
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
    width: 12px;
    height: 12px;
    background: white;
    border: 3px solid #1e293b;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: $primary-color;
  line-height: 1;
}

.brand-subtitle {
  font-size: 0.75rem;
  font-weight: 600;
  color: $text-muted;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.nav-tabs {
  @include flex-center;
  gap: 0.5rem;
  background: rgba(148, 163, 184, 0.15);
  padding: 0.35rem;
  border-radius: $radius-full;
}

.nav-btn {
  @include flex-center;
  gap: 0.4rem;
  padding: 0.5rem 1.1rem;
  border-radius: $radius-full;
  font-size: 0.9rem;
  font-weight: 600;
  color: $text-muted;
  transition: all 0.2s ease;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    color: inherit;
  }

  &.active {
    background-color: $primary-color;
    color: white;
    box-shadow: 0 4px 12px rgba(230, 57, 70, 0.3);

    .counter-badge {
      background-color: white;
      color: $primary-color;
    }
  }
}

.counter-badge {
  padding: 0.1rem 0.5rem;
  border-radius: $radius-full;
  font-size: 0.75rem;
  font-weight: 800;
  background-color: $secondary-color;
  color: #1e293b;
}
</style>
