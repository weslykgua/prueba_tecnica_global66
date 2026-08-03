<template>
  <nav class="app-tabbar" :aria-label="TabBarTexts.ariaNavLabel">
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
import pokedexIcon from '@/assets/icons/navigation/ic_pokedex.svg';
import regionsIcon from '@/assets/icons/navigation/ic_regions.svg';
import favoritesIcon from '@/assets/icons/navigation/ic_favorites.svg';
import profileIcon from '@/assets/icons/navigation/ic_profile.svg';
import TabBarTexts from '../text/tabbar.texts';

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: TabBarTexts.navPokedex,
    path: '/pokedex',
    icon: pokedexIcon,
  },
  {
    label: TabBarTexts.navRegions,
    path: '/regions',
    icon: regionsIcon,
  },
  {
    label: TabBarTexts.navFavorites,
    path: '/favorites',
    icon: favoritesIcon,
  },
  {
    label: TabBarTexts.navProfile,
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
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/variables' as *;

.app-tabbar {
  position: var(--position-fixed);
  bottom: $size-0px;
  left: $size-0px;
  right: $size-0px;
  display: var(--display-flex);
  flex-direction: var(--flex-direction-row);
  justify-content: var(--justify-between);
  align-items: var(--align-center);
  padding: $size-16px;
  width: $size-100-percent;
  height: $size-auto;
  background: $color-fafafa;
  border: $size-1px solid $color-e0e0e0;
  border-radius: $size-16px $size-16px $size-0px $size-0px !important;
  border-top-left-radius: $size-16px !important;
  border-top-right-radius: $size-16px !important;
  overflow: var(--overflow-hidden);
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 1000;
  box-sizing: var(--border-box);
}

.tabbar-container {
  display: var(--display-flex);
  flex-direction: var(--flex-direction-row);
  justify-content: var(--justify-between);
  align-items: var(--align-center);
  width: $size-100-percent;
  max-width: $size-570px;
  margin: $size-0px $size-auto;

  @media (min-width: $bp-tablet) {
    max-width: $size-800px;
  }
}

.nav-item {
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  align-items: var(--align-center);
  padding: $size-0px;
  gap: $size-4px;

  margin: $size-0px $size-auto;
  width: $size-62px;
  height: $size-44px;
  flex: none;
  order: 0;
  flex-grow: 0;
  text-decoration: none;
  color: $color-424242;

  .nav-label {
    width: $size-62px;
    height: $size-13px;

    font-family: $font-family;
    font-style: normal;
    font-weight: $font-weight-500;
    font-size: $font-size-10;
    line-height: 16px;
    text-align: center;

    color: $color-424242;

    flex: none;
    order: 1;
    flex-grow: 0;
  }

  .icon-wrapper {
    display: var(--display-flex);
    flex-direction: var(--flex-direction-row);
    justify-content: var(--justify-center);
    align-items: var(--align-center);
    padding: $size-4px;

    width: $size-62px;
    height: $size-24px;

    border-radius: $size-16px;

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  }

  .nav-icon {
    width: $size-24px;
    height: $size-24px;
    flex: none;
    order: 0;
    flex-grow: 0;
    display: var(--display-flex);
    align-items: var(--align-center);
    justify-content: var(--justify-center);
    object-fit: var(--object-contain);
    filter: invert(24%) sepia(0%) saturate(0%) hue-rotate(193deg) brightness(96%) contrast(88%);
  }

  &.active {
    .nav-label {
      font-weight: $font-weight-700;
      color: $color-0d47a1;
    }

    .nav-icon {
      filter: invert(19%) sepia(87%) saturate(2462%) hue-rotate(204deg) brightness(94%)
        contrast(97%);
    }
  }
}
</style>
