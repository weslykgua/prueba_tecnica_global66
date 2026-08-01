<template>
  <nav class="app-tabbar" aria-label="Navegación inferior">
    <div class="tabbar-container">
      <router-link
        v-for="item in NAV_ITEMS"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: currentRoute === item.path }"
      >
        <div class="icon-wrapper">
          <img :src="item.icon" :alt="item.label" class="nav-icon" />
        </div>
        <span class="nav-label">{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import pokedexIcon from '@/assets/ic_pokedex.svg';
import regionsIcon from '@/assets/ic_regions.svg';
import favoritesIcon from '@/assets/ic_favorites.svg';
import profileIcon from '@/assets/ic_profile.svg';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Pokédex',
    path: '/pokedex',
    icon: pokedexIcon,
  },
  {
    label: 'Regiones',
    path: '/regions',
    icon: regionsIcon,
  },
  {
    label: 'Favoritos',
    path: '/favorites',
    icon: favoritesIcon,
  },
  {
    label: 'Perfil',
    path: '/profile',
    icon: profileIcon,
  },
];
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentRoute = computed(() => route.path);
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;

.app-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  width: 100%;
  height: auto;
  background: $bg-light;
  border: 1px solid $border-color;
  border-radius: 16px 16px 0px 0px !important;
  border-top-left-radius: 16px !important;
  border-top-right-radius: 16px !important;
  overflow: hidden;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 1000;
  box-sizing: border-box;
}

.tabbar-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 4px;

  margin: 0 auto;
  width: 62px;
  height: 44px;
  flex: none;
  order: 0;
  flex-grow: 0;
  text-decoration: none;
  color: $text-body;

  .nav-label {
    width: 62px;
    height: 13px;

    font-family: $font-family;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 16px;
    text-align: center;

    color: $text-body;

    flex: none;
    order: 1;
    flex-grow: 0;
  }

  .icon-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px;

    width: 62px;
    height: 24px;

    border-radius: 16px;

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  }

  .nav-icon {
    width: 24px;
    height: 24px;
    flex: none;
    order: 0;
    flex-grow: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: contain;
  }

  &.active {
    .nav-label {
      font-weight: 700;
      color: $primary-active;
    }

    .nav-icon {
      filter: invert(19%) sepia(87%) saturate(2462%) hue-rotate(204deg) brightness(94%) contrast(97%);
    }
  }
}
</style>
