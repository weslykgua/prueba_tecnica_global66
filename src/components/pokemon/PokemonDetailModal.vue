<template>
  <ModalDialog :is-open="isOpen" @close="$emit('close')">
    <div v-if="isLoading" class="modal-loading">
      <PokeballLoader label="Cargando datos del Pokémon..." />
    </div>

    <div v-else-if="pokemon" class="detail-container">
      <!-- Header banner with main type background -->
      <div class="detail-banner" :class="mainType">
        <button class="close-icon-btn" aria-label="Cerrar modal" @click="$emit('close')">
          &times;
        </button>
        <span class="pokemon-id-tag">#{{ formattedId }}</span>
        <div class="sprite-wrapper">
          <img :src="pokemon.spriteUrl" :alt="pokemon.formattedName" class="detail-sprite" />
        </div>
      </div>

      <!-- Main info content -->
      <div class="detail-body">
        <h2 class="pokemon-title">{{ pokemon.formattedName }}</h2>

        <!-- Types Badges -->
        <div class="types-list">
          <span
            v-for="type in pokemon.types"
            :key="type"
            class="type-badge"
            :class="type"
          >
            {{ capitalize(type) }}
          </span>
        </div>

        <!-- Stats Grid (Weight & Height) -->
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-label">Peso</span>
            <span class="stat-value">{{ pokemon.weight }} kg</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Altura</span>
            <span class="stat-value">{{ pokemon.height }} m</span>
          </div>
        </div>

        <!-- Abilities Section -->
        <div class="abilities-section">
          <h4 class="section-title">Habilidades</h4>
          <div class="abilities-list">
            <span
              v-for="ability in pokemon.abilities"
              :key="ability"
              class="ability-badge"
            >
              {{ capitalize(ability) }}
            </span>
          </div>
        </div>

        <!-- Action Buttons Footer -->
        <div class="actions-footer">
          <button class="action-btn share-btn" type="button" @click="$emit('share', pokemon)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            Compartir
          </button>

          <button
            class="action-btn favorite-btn"
            :class="{ active: isFavorite }"
            type="button"
            @click="$emit('toggle-favorite', pokemon.name)"
          >
            <svg
              viewBox="0 0 24 24"
              :fill="isFavorite ? '#FFCB05' : 'none'"
              stroke="currentColor"
              stroke-width="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            {{ isFavorite ? 'Favorito' : 'Agregar Favorito' }}
          </button>

          <button class="action-btn close-btn" type="button" @click="$emit('close')">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </ModalDialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ModalDialog from '../common/ModalDialog.vue';
import PokeballLoader from '../common/PokeballLoader.vue';
import { PokemonDetail } from '../../types/pokemon.types';
import { capitalize } from '../../utils/formatters';

const props = defineProps<{
  isOpen: boolean;
  pokemon: PokemonDetail | null;
  isLoading: boolean;
  isFavorite: boolean;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'share', pokemon: PokemonDetail): void;
  (e: 'toggle-favorite', name: string): void;
}>();

const formattedId = computed(() => {
  return props.pokemon ? String(props.pokemon.id).padStart(3, '0') : '000';
});

const mainType = computed(() => {
  return props.pokemon && props.pokemon.types.length > 0 ? props.pokemon.types[0] : 'normal';
});
</script>

<style lang="scss" scoped>
@use '../../assets/styles/variables' as *;
@use '../../assets/styles/mixins' as *;

.modal-loading {
  padding: 3rem 1.5rem;
}

.detail-container {
  width: 100%;
}

.detail-banner {
  height: 180px;
  position: relative;
  @include flex-center;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: $radius-lg $radius-lg 0 0;

  &.fire { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); }
  &.water { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
  &.grass { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); }
  &.electric { background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%); }
  &.poison { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }
  &.psychic { background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); }
  &.dragon { background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); }
}

.close-icon-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  color: white;
  font-size: 1.5rem;
  line-height: 1;
  @include flex-center;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.45);
  }
}

.pokemon-id-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 0.9rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.75);
  letter-spacing: 1px;
}

.sprite-wrapper {
  position: absolute;
  bottom: -35px;
}

.detail-sprite {
  width: 140px;
  height: 140px;
  object-fit: contain;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3));
}

.detail-body {
  padding: 3rem 1.75rem 1.75rem 1.75rem;
  text-align: center;
}

.pokemon-title {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.types-list {
  @include flex-center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.type-badge {
  padding: 0.35rem 1rem;
  border-radius: $radius-full;
  font-size: 0.85rem;
  font-weight: 700;
  color: white;
  text-transform: capitalize;
  background-color: #64748b;

  &.normal { background-color: $type-normal; }
  &.fire { background-color: $type-fire; }
  &.water { background-color: $type-water; }
  &.electric { background-color: $type-electric; color: #1e293b; }
  &.grass { background-color: $type-grass; }
  &.poison { background-color: $type-poison; }
  &.psychic { background-color: $type-psychic; }
  &.dragon { background-color: $type-dragon; }
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: rgba(241, 245, 249, 0.7);
  padding: 0.75rem 1rem;
  border-radius: $radius-md;
  display: flex;
  flex-direction: column;

  @media (prefers-color-scheme: dark) {
    background: rgba(15, 23, 42, 0.5);
  }
}

.stat-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: $text-muted;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 700;
}

.abilities-section {
  margin-bottom: 2rem;
  text-align: left;
}

.section-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: $text-muted;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.abilities-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ability-badge {
  padding: 0.4rem 0.85rem;
  background: rgba(148, 163, 184, 0.15);
  border-radius: $radius-sm;
  font-size: 0.9rem;
  font-weight: 600;
}

.actions-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  padding-top: 1.25rem;
}

.action-btn {
  @include flex-center;
  gap: 0.5rem;
  padding: 0.7rem 1.25rem;
  border-radius: $radius-full;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  svg {
    width: 18px;
    height: 18px;
  }
}

.share-btn {
  background-color: $primary-color;
  color: white;

  &:hover {
    background-color: $primary-hover;
    transform: translateY(-2px);
  }
}

.favorite-btn {
  background-color: rgba(255, 203, 5, 0.15);
  color: #d97706;

  &:hover, &.active {
    background-color: $secondary-color;
    color: #1e293b;
    transform: translateY(-2px);
  }
}

.close-btn {
  background-color: rgba(148, 163, 184, 0.2);
  color: inherit;

  &:hover {
    background-color: rgba(148, 163, 184, 0.35);
  }
}
</style>
