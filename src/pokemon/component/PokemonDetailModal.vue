<template>
  <ModalDialog :is-open="isOpen" @close="$emit('close')">
    <div v-if="isLoading" class="modal-loading">
      <PokeballLoader label="Cargando datos del Pokémon..." />
    </div>

    <div v-else-if="pokemon" class="detail-container">
      <!-- Header banner with main type background -->
      <div class="detail-banner" :class="mainType">
        <button @click="$emit('close')" class="close-icon-btn" aria-label="Cerrar modal" type="button">
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
            <span class="stat-value">{{ pokemon.weightKg }} kg</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Altura</span>
            <span class="stat-value">{{ pokemon.heightM }} m</span>
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
          <button @click="$emit('share', pokemon)" class="action-btn share-btn" type="button">
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
            @click="$emit('toggle-favorite', pokemon.name)"
            class="action-btn favorite-btn"
            :class="{ active: isFavorite }"
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              :fill="isFavorite ? '#F2C94C' : 'none'"
              stroke="currentColor"
              stroke-width="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            {{ isFavorite ? 'Favorito' : 'Agregar Favorito' }}
          </button>

          <button @click="$emit('close')" class="action-btn close-btn" type="button">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </ModalDialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ModalDialog from './ModalDialog.vue';
import PokeballLoader from './PokeballLoader.vue';
import { capitalize } from '../utils/formatters.ts';
import PokemonDetail from '../model/PokemonDetail.ts';

const props = defineProps<{
  isOpen: boolean;
  pokemon: PokemonDetail | undefined;
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
  height: 150px;
  position: relative;
  @include flex-center;
  background-color: #222222;
  border-radius: $radius-card $radius-card 0 0;

  &.fire { background-color: #EE8130; }
  &.water { background-color: #6390F0; }
  &.grass { background-color: #7AC74C; }
  &.electric { background-color: #F7D02C; }
  &.poison { background-color: #A33EA2; }
  &.psychic { background-color: #F95587; }
  &.dragon { background-color: #6F35FC; }
}

.close-icon-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  color: white;
  font-size: 1.3rem;
  line-height: 1;
  @include flex-center;
  transition: background $anim-duration $anim-ease;

  &:hover {
    background: rgba(0, 0, 0, 0.45);
  }
}

.pokemon-id-tag {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.5px;
}

.sprite-wrapper {
  position: absolute;
  bottom: -28px;
}

.detail-sprite {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.detail-body {
  padding: 2.5rem 1.5rem 1.35rem 1.5rem;
  text-align: center;
}

.pokemon-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: $text-primary;

  @media (prefers-color-scheme: dark) {
    color: #FFFEFC;
  }
}

.types-list {
  @include flex-center;
  gap: 0.35rem;
  margin-bottom: 1.25rem;
}

.type-badge {
  padding: 0.25rem 0.8rem;
  border-radius: $radius-full;
  font-size: 0.78rem;
  font-weight: 700;
  color: white;
  text-transform: capitalize;
  background-color: #555555;

  &.normal { background-color: $type-normal; }
  &.fire { background-color: $type-fire; }
  &.water { background-color: $type-water; }
  &.electric { background-color: $type-electric; color: #222222; }
  &.grass { background-color: $type-grass; }
  &.poison { background-color: $type-poison; }
  &.psychic { background-color: $type-psychic; }
  &.dragon { background-color: $type-dragon; }
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.stat-card {
  background-color: #FFFDF9;
  border: 1px solid $border-color;
  padding: 0.65rem 0.75rem;
  border-radius: $radius-md;
  display: flex;
  flex-direction: column;

  @media (prefers-color-scheme: dark) {
    background-color: $dark-card;
    border-color: $border-dark;
  }
}

.stat-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: $text-muted;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: $text-primary;

  @media (prefers-color-scheme: dark) {
    color: #FFFEFC;
  }
}

.abilities-section {
  margin-bottom: 1.35rem;
  text-align: left;
}

.section-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: $text-muted;
  text-transform: uppercase;
  margin-bottom: 0.35rem;
}

.abilities-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.ability-badge {
  padding: 0.3rem 0.7rem;
  background-color: #FFFFFF;
  border: 1px solid $border-color;
  border-radius: $radius-sm;
  font-size: 0.825rem;
  font-weight: 600;
  color: $text-secondary;

  @media (prefers-color-scheme: dark) {
    background-color: rgba(255, 255, 255, 0.04);
    border-color: $border-dark;
    color: #FFFEFC;
  }
}

.actions-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
  border-top: 1px solid $border-color;
  padding-top: 1rem;

  @media (prefers-color-scheme: dark) {
    border-top-color: $border-dark;
  }
}

.action-btn {
  @include flex-center;
  gap: 0.4rem;
  padding: 0.55rem 1.05rem;
  border-radius: $radius-md;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all $anim-duration $anim-ease;
  box-shadow: $shadow-sm;

  svg {
    width: 15px;
    height: 15px;
  }
}

.share-btn {
  background-color: $primary-color;
  color: white;
  border: 1px solid $primary-color;

  &:hover {
    background-color: $primary-hover;
    border-color: $primary-hover;
    transform: translateY(-1px);
  }
}

.favorite-btn {
  background-color: #FFFFFF;
  color: #333333;
  border: 1px solid $border-hover;

  @media (prefers-color-scheme: dark) {
    background-color: $dark-card;
    border-color: $border-dark;
    color: #FFFEFC;
  }

  &:hover {
    background-color: #F8F8F8;
  }

  &.active {
    background-color: rgba(242, 201, 76, 0.2);
    border-color: $secondary-color;
    color: #222222;
  }
}

.close-btn {
  background-color: #FFFFFF;
  border: 1px solid $border-hover;
  color: #333333;

  @media (prefers-color-scheme: dark) {
    background-color: $dark-card;
    border-color: $border-dark;
    color: #FFFEFC;
  }

  &:hover {
    background-color: #F8F8F8;
  }
}
</style>
