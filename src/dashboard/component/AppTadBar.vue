<template>
  <nav class="app-tadbar" aria-label="Navegación inferior">
    <div class="tadbar-container">
      <router-link
        v-for="item in NAV_ITEMS"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: currentRoute === item.path }"
      >
        <div class="icon-wrapper">
          <div class="nav-icon" v-html="item.icon"></div>
        </div>
        <span class="nav-label">{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
export interface NavItem {
  label: string;
  path: string;
  icon: string;
}
export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Pokédex',
    path: '/pokedex',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.6812 4.26865C12.2968 3.9124 11.7031 3.9124 11.3218 4.26865L4.32184 10.7687C4.02184 11.0499 3.92184 11.4843 4.07184 11.8655C4.22184 12.2468 4.58747 12.4999 4.99997 12.4999H5.49997V17.9999C5.49997 19.103 6.39684 19.9999 7.49997 19.9999H16.5C17.6031 19.9999 18.5 19.103 18.5 17.9999V12.4999H19C19.4125 12.4999 19.7812 12.2468 19.9312 11.8655C20.0812 11.4843 19.9812 11.0468 19.6812 10.7687L12.6812 4.26865ZM11.5 13.9999H12.5C13.3281 13.9999 14 14.6718 14 15.4999V18.4999H9.99997V15.4999C9.99997 14.6718 10.6718 13.9999 11.5 13.9999Z" fill="currentColor"/></svg>`,
  },
  {
    label: 'Regiones',
    path: '/regions',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12C15 12.6938 14.9625 13.3625 14.8969 14H9.10625C9.0375 13.3625 9.00313 12.6938 9.00313 12C9.00313 11.3063 9.04062 10.6375 9.10625 10H14.8969C14.9656 10.6375 15 11.3063 15 12ZM15.9 10H19.7469C19.9125 10.6406 20 11.3094 20 12C20 12.6906 19.9125 13.3594 19.7469 14H15.9C15.9656 13.3562 16 12.6875 16 12C16 11.3125 15.9656 10.6438 15.9 10ZM19.4187 9H15.7719C15.4594 7.00312 14.8406 5.33125 14.0437 4.2625C16.4906 4.90938 18.4812 6.68438 19.4156 9H19.4187ZM14.7594 9H9.24062C9.43125 7.8625 9.725 6.85625 10.0844 6.04063C10.4125 5.30313 10.7781 4.76875 11.1312 4.43125C11.4812 4.1 11.7719 4 12 4C12.2281 4 12.5187 4.1 12.8687 4.43125C13.2219 4.76875 13.5875 5.30313 13.9156 6.04063C14.2781 6.85313 14.5687 7.85938 14.7594 9ZM8.22813 9H4.58125C5.51875 6.68438 7.50625 4.90938 9.95625 4.2625C9.15938 5.33125 8.54063 7.00312 8.22813 9ZM4.25313 10H8.1C8.03437 10.6438 8 11.3125 8 12C8 12.6875 8.03437 13.3562 8.1 14H4.25313C4.0875 13.3594 4 12.6906 4 12C4 11.3094 4.0875 10.6406 4.25313 10ZM10.0844 17.9563C9.72187 17.1438 9.43125 16.1375 9.24062 15H14.7594C14.5687 16.1375 14.275 17.1438 13.9156 17.9563C13.5875 18.6938 13.2219 19.2281 12.8687 19.5656C12.5187 19.9 12.2281 20 12 20C11.7719 20 11.4812 19.9 11.1312 19.5688C10.7781 19.2313 10.4125 18.6969 10.0844 17.9594V17.9563ZM8.22813 15C8.54063 16.9969 9.15938 18.6687 9.95625 19.7375C7.50625 19.0906 5.51875 17.3156 4.58125 15H8.22813ZM19.4187 15C18.4812 17.3156 16.4937 19.0906 14.0469 19.7375C14.8438 18.6687 15.4594 16.9969 15.775 15H19.4219H19.4187Z" fill="currentColor"/></svg>`,
  },
  {
    label: 'Favoritos',
    path: '/favorites',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.4875 13.3877L11.1344 18.6595C11.3688 18.8783 11.6781 19.0002 12 19.0002C12.3219 19.0002 12.6313 18.8783 12.8656 18.6595L18.5125 13.3877C19.4625 12.5033 20 11.2627 20 9.96579V9.78454C20 7.60017 18.4219 5.73767 16.2688 5.37829C14.8438 5.14079 13.3938 5.60642 12.375 6.62517L12 7.00017L11.625 6.62517C10.6062 5.60642 9.15625 5.14079 7.73125 5.37829C5.57812 5.73767 4 7.60017 4 9.78454V9.96579C4 11.2627 4.5375 12.5033 5.4875 13.3877Z" fill="currentColor"/></svg>`,
  },
  {
    label: 'Perfil',
    path: '/profile',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 11.75C12.4925 11.75 12.9801 11.653 13.4351 11.4645C13.89 11.2761 14.3034 10.9999 14.6517 10.6517C14.9999 10.3034 15.2761 9.89003 15.4645 9.43506C15.653 8.98009 15.75 8.49246 15.75 8C15.75 7.50754 15.653 7.01991 15.4645 6.56494C15.2761 6.10997 14.9999 5.69657 14.6517 5.34835C14.3034 5.00013 13.89 4.72391 13.4351 4.53545C12.9801 4.347 12.4925 4.25 12 4.25C11.5075 4.25 11.0199 4.347 10.5649 4.53545C10.11 4.72391 9.69657 5.00013 9.34835 5.34835C9.00013 5.69657 8.72391 6.10997 8.53545 6.56494C8.347 7.01991 8.25 7.50754 8.25 8C8.25 8.49246 8.347 8.98009 8.53545 9.43506C8.72391 9.89003 9.00013 10.3034 9.34835 10.6517C9.69657 10.9999 10.11 11.2761 11.0199 11.653 11.5075 11.75 12 11.75ZM11.0719 13.5C7.99375 13.5 5.5 15.9937 5.5 19.0719C5.5 19.5844 5.91563 20 6.42813 20H17.5719C18.0844 20 18.5 19.5844 18.5 19.0719C18.5 15.9937 16.0063 13.5 12.9281 13.5H11.0719Z" fill="currentColor"/></svg>`,
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap');

.app-tadbar {
  /* TadBar */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  width: 100%;
  height: auto;
  background: #FAFAFA;
  border: 1px solid #E0E0E0;
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

.tadbar-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-item {
  /* .item */
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
  color: #424242;

  .nav-label {
    width: 62px;
    height: 13px;

    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 16px;
    text-align: center;

    color: #424242;

    flex: none;
    order: 1;
    flex-grow: 0;
  }

  .icon-wrapper {
    /* home */
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
    color: #424242;

    :deep(svg) {
      width: 62px;
      height: 24px;
      display: block;
    }
  }

  &.active {
    .nav-label {
      font-weight: 700;
      color: #0D47A1;
    }

    .nav-icon {
      color: #1565C0;
    }
  }
}
</style>
