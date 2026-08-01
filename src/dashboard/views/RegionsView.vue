<template>
  <div class="regions-view">
    <div class="header-section">
      <h1 class="page-title">Regiones Pokémon</h1>
      <p class="page-subtitle">Explora los Pokémon clasificados por su región de origen</p>
    </div>
    <div class="regions-grid">
      <div v-for="region in REGIONS" :key="region.name" class="region-card">
        <div class="region-info">
          <h2 class="region-name">{{ region.name }}</h2>
          <span class="region-gen">{{ region.generation }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const REGIONS = [
  { name: 'Kanto', generation: '1ª Generación' },
  { name: 'Johto', generation: '2ª Generación' },
  { name: 'Hoenn', generation: '3ª Generación' },
  { name: 'Sinnoh', generation: '4ª Generación' },
  { name: 'Unova', generation: '5ª Generación' },
  { name: 'Kalos', generation: '6ª Generación' },
  { name: 'Alola', generation: '7ª Generación' },
  { name: 'Galar', generation: '8ª Generación' },
  { name: 'Paldea', generation: '9ª Generación' },
];
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap');

.regions-view {
  padding: 1.5rem 1rem;
  max-width: 600px;
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #121212;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 0.95rem;
  color: #616161;
}

.regions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}

.region-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 1.25rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}

.region-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e88e5;
  margin-bottom: 0.25rem;
}

.region-gen {
  font-size: 0.85rem;
  color: #757575;
}
</style>
