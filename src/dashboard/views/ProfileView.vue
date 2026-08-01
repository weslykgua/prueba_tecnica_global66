<template>
  <div class="profile-view">
    <div class="profile-card">
      <div class="avatar-container">
        <div class="avatar-circle">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 11.75C14.0711 11.75 15.75 10.0711 15.75 8C15.75 5.92893 14.0711 4.25 12 4.25C9.92893 4.25 8.25 5.92893 8.25 8C8.25 10.0711 9.92893 11.75 12 11.75ZM12.9281 13.5H11.0719C7.99375 13.5 5.5 15.9937 5.5 19.0719C5.5 19.5844 5.91563 20 6.42813 20H17.5719C18.0844 20 18.5 19.5844 18.5 19.0719C18.5 15.9937 16.0063 13.5 12.9281 13.5Z" fill="#1E88E5"/>
          </svg>
        </div>
      </div>

      <h2 class="user-name">Maestro Pokémon</h2>
      <p class="user-role">Entrenador Registrado</p>

      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-value">{{ favoritesCount }}</span>
          <span class="stat-label">Favoritos</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value">Gen 1-9</span>
          <span class="stat-label">Regiones</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '@/pokemon/local/store/favorites.store';
import { computed } from 'vue';

const favoritesStore = useFavoritesStore();
const favoritesCount = computed(() => favoritesStore.favoritesCount);
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap');

.profile-view {
  padding: 2rem 1rem;
  max-width: 480px;
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;
}

.profile-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.avatar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.avatar-circle {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: #e3f2fd;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #90caf9;
}

.user-name {
  font-size: 1.35rem;
  font-weight: 700;
  color: #121212;
  margin-bottom: 0.25rem;
}

.user-role {
  font-size: 0.9rem;
  color: #616161;
  margin-bottom: 1.5rem;
}

.stats-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #fafafa;
  border-radius: 14px;
  padding: 1rem;
  border: 1px solid #eeeeee;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e88e5;
}

.stat-label {
  font-size: 0.8rem;
  color: #757575;
}

.stat-divider {
  width: 1px;
  height: 32px;
  background: #e0e0e0;
}
</style>
