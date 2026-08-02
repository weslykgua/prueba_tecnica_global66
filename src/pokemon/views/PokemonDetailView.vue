<template>
  <div class="pokemon-detail-page">
    <div v-if="isLoading" class="detail-loading">
      <PokeballLoader :label="PokemonDetailTexts.loading" />
    </div>

    <div v-else-if="pokemon" class="detail-container">
      <div
        class="detail-banner"
        :style="{ '--banner-bg-color': getTypeBackgroundColor(mainType) }"
      >
        <div
          class="banner-type-circle"
          :style="{ backgroundColor: getTypeBackgroundColor(mainType) }"
        ></div>

        <button
          @click="goBack"
          class="header-action-btn back-btn"
          :aria-label="PokemonDetailTexts.backButtonAria"
          type="button"
        >
          <img :src="arrowBackIcon" :alt="PokemonDetailTexts.backButtonAria" class="header-btn-icon" />
        </button>

        <button
          @click="onShare"
          class="header-action-btn share-btn-top"
          aria-label="Compartir información del Pokémon"
          type="button"
        >
          <img :src="shareIcon" alt="Compartir" class="header-btn-icon" />
        </button>

        <button
          @click="toggleFav"
          class="header-action-btn favorite-btn-top"
          :class="{ active: isFav }"
          :aria-label="PokemonDetailTexts.favoriteButtonAria(pokemon.formattedName)"
          type="button"
        >
          <img
            :src="isFav ? heartFilledIcon2 : heartOutlineIcon2"
            :alt="pokemon.formattedName"
            class="header-btn-icon"
          />
        </button>

        <img
          v-if="getTypeIcon(mainType)"
          :src="getTypeIcon(mainType)"
          :alt="mainType"
          class="banner-type-bg-icon"
        />

        <div class="sprite-wrapper">
          <img :src="pokemon.spriteUrl" :alt="pokemon.formattedName" class="detail-sprite" />
        </div>
      </div>

      <div class="detail-body">
        <h2 class="pokemon-title">{{ pokemon.formattedName }}</h2>
        <span class="pokemon-id-subtag">Nº{{ formattedId }}</span>

        <div class="types-list">
          <TypeBadge v-for="type in categories" :key="type" :type="type" />
        </div>

        <p v-if="pokemon.description" class="pokemon-description">
          {{ pokemon.description }}
        </p>

        <div class="stats-grid">
          <StatCard
            v-for="stat in statsList"
            :key="stat.label"
            :icon="stat.icon"
            :label="stat.label"
            :value="stat.value"
          />
        </div>

        <div class="gender-section">
          <h3 class="section-title">{{ PokemonDetailTexts.genderTitle.toUpperCase() }}</h3>

          <div v-if="pokemon.genderRate === -1" class="genderless-label">
            {{ PokemonDetailTexts.genderlessLabel }}
          </div>

          <div v-else class="gender-column">
            <div class="gender-bar-track">
              <div class="gender-bar-fill" :style="{ width: malePercent + '%' }"></div>
            </div>

            <div class="gender-labels">
              <div class="gender-end">
                <img :src="maleIcon" alt="Masculino" class="gender-icon" />
                <span class="gender-percent male-percent">{{ malePercent }}%</span>
              </div>
              <div class="gender-end">
                <img :src="femaleIcon" alt="Femenino" class="gender-icon" />
                <span class="gender-percent female-percent">{{ femalePercent }}%</span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="weaknessTypes.length" class="weaknesses-section">
          <h3 class="weaknesses-title">{{ PokemonDetailTexts.weaknessesTitle }}</h3>
          <div class="types-list">
            <TypeBadge v-for="type in weaknessTypes" :key="type" :type="type" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PokeballLoader from '@/pokemon/component/PokeballLoader.vue';
import TypeBadge from '@/pokemon/component/TypeBadge.vue';
import StatCard from '@/pokemon/component/StatCard.vue';
import shareIcon from '@/assets/icons/actions/ic_share.svg';
import heartFilledIcon2 from '@/assets/ic_heart_filled2.svg';
import heartOutlineIcon2 from '@/assets/ic_heart_outline2.svg';
import arrowBackIcon from '@/assets/icons/actions/ic_arrow_back.svg';
import weightIcon from '@/assets/icons/detail/ic_weight.svg';
import heightIcon from '@/assets/icons/detail/ic_height.svg';
import categoryIcon from '@/assets/icons/detail/ic_category.svg';
import abilityIcon from '@/assets/icons/detail/ic_hability.svg';
import maleIcon from '@/assets/icons/detail/ic_male.svg';
import femaleIcon from '@/assets/icons/detail/ic_female.svg';
import {
  capitalize,
  formatPokemonId,
  getTypeBackgroundColor,
  getTypeIcon,
} from '@/pokemon/utils/formatters';
import PokemonDetail from '@/pokemon/model/PokemonDetail';
import { PokemonType, toPokemonType } from '@/pokemon/type/PokemonType';
import { usePokemon } from '@/pokemon/composable/usePokemon';
import { useClipboard } from '@/common/utils/useClipboard';
import { pokemonApi } from '@/pokemon/remote/api/pokemon.api';
import PokemonDetailTexts from '../text/detail.texts';

const route = useRoute();
const router = useRouter();
const { isFavorite, toggleFavorite } = usePokemon();
const { sharePokemon } = useClipboard();

const onShare = () => {
  if (pokemon.value) {
    const bannerColor = getTypeBackgroundColor(mainType.value);
    sharePokemon(pokemon.value, bannerColor);
  }
};

const pokemon = ref<PokemonDetail | undefined>(undefined);
const isLoading = ref(true);

const fetchDetail = async () => {
  isLoading.value = true;
  try {
    const id = Number(route.params.id);
    if (!isNaN(id)) {
      pokemon.value = await pokemonApi.getPokemonDetail(id);
    }
  } catch (e) {
    console.error('Error al obtener detalle del pokémon:', e);
  } finally {
    isLoading.value = false;
  }
};

const statsList = computed(() => [
  {
    icon: weightIcon,
    label: PokemonDetailTexts.weightLabel,
    value: pokemon.value ? `${pokemon.value.weightKg} kg` : '—',
  },
  {
    icon: heightIcon,
    label: PokemonDetailTexts.heightLabel,
    value: pokemon.value ? `${pokemon.value.heightM} m` : '—',
  },
  {
    icon: categoryIcon,
    label: PokemonDetailTexts.categoryLabel,
    value: pokemon.value?.category ?? '—',
  },
  {
    icon: abilityIcon,
    label: PokemonDetailTexts.abilityLabel,
    value: firstAbility.value,
  },
]);

const isFav = computed(() => {
  return pokemon.value ? isFavorite(pokemon.value.name) : false;
});

const toggleFav = () => {
  if (pokemon.value) {
    toggleFavorite(pokemon.value.name);
  }
};

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push('/pokedex');
  }
};

const formattedId = computed(() => {
  return pokemon.value ? formatPokemonId(pokemon.value.id).replace('Nº', '') : '000';
});

const categories = computed<PokemonType[]>(() => {
  if (!pokemon.value?.types) return [];
  return pokemon.value.types
    .map(t => toPokemonType(t))
    .filter((cat): cat is PokemonType => cat !== undefined);
});

const mainType = computed<PokemonType>(() => {
  return categories.value.length > 0 ? categories.value[0] : ('normal' as PokemonType);
});

const firstAbility = computed(() => {
  if (!pokemon.value?.abilities?.length) return '—';
  return capitalize(pokemon.value.abilities[0]);
});

const malePercent = computed(() => {
  const rate = pokemon.value?.genderRate;
  if (rate === undefined || rate === -1) return 0;
  return rate;
});

const femalePercent = computed(() => {
  const rate = pokemon.value?.genderRate;
  if (rate === undefined || rate === -1) return 0;
  return 100 - rate;
});

const weaknessTypes = computed<PokemonType[]>(() => {
  if (!pokemon.value?.weaknesses?.length) return [];
  return pokemon.value.weaknesses
    .map(t => toPokemonType(t))
    .filter((t): t is PokemonType => t !== undefined);
});

onMounted(() => {
  fetchDetail();
});
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/mixins' as *;


.pokemon-detail-page {
  width: 100%;
  max-width: none !important;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.detail-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 300px;
}

.detail-container {
  width: 100%;
  max-width: none !important;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
}

.detail-banner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  overflow: hidden;
  box-sizing: border-box;

  @media (min-width: 425px) {
    background-color: var(--banner-bg-color);
  }
}

.banner-type-circle {
  position: absolute;
  top: -227px;
  left: 50%;
  transform: translateX(-50%);
  width: 498px;
  height: 498px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;

  @media (min-width: 425px) {
    display: none;
  }
}

.header-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20px;
  width: 38px;
  height: 38px;
  cursor: pointer;
  transition: transform 0.2s ease;
  z-index: 10;

  &:hover {
    transform: scale(1.1);
  }

  &.back-btn {
    left: 16px;

    .header-btn-icon {
      filter: brightness(0) invert(1);
    }
  }

  &.share-btn-top {
    right: 64px;

    .header-btn-icon {
      filter: brightness(0) invert(1);
    }
  }

  &.favorite-btn-top {
    right: 16px;
  }

  .header-btn-icon {
    width: 28px;
    height: 28px;
    display: block;
    object-fit: contain;
  }
}

.banner-type-bg-icon {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 40px;
  width: 204px;
  height: 204px;
  object-fit: contain;
  pointer-events: none;
  z-index: 1;
  mask-image: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.1) 100%);
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.1) 100%
  );
}

.sprite-wrapper {
  margin-top: 140px;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail-sprite {
  width: 180px;
  height: auto;
  object-fit: contain;
}

.detail-body {
  padding: 0 16px 32px 16px;
}

.pokemon-title {
  font-size: $font-size-32;
  font-weight: $font-weight-500;
  color: $color-222222;
  margin: 0;
}

.pokemon-id-subtag {
  display: block;
  font-size: $font-size-16;
  font-weight: $font-weight-500;
  color: $color-5e5e5e;
}

.types-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px;
}

.pokemon-description {
  margin-top: 24px;
  font-family: $font-family;
  font-size: $font-size-14;
  font-weight: $font-weight-400;
  color: $color-424242;
  line-height: 1.6;
}

.stats-grid {
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  padding-top: 16px;
  border-top: solid 1px $color-e0e0e0;
  margin-top: 20px;
  justify-content: space-around;
}

.gender-section {
  margin-top: 24px;
}

.section-title {
  font-family: $font-family;
  font-size: $font-size-14;
  font-weight: $font-weight-500;
  color: $color-424242;
  text-align: center;
  margin: 0 0 12px 0;
}

.weaknesses-title {
  font-family: $font-family;
  font-size: $font-size-14;
  font-weight: $font-weight-600;
  color: $color-222222;
  text-align: left;
}

.genderless-label {
  font-family: $font-family;
  font-size: $font-size-14;
  color: $color-7a7a7a;
  text-align: center;
}

.gender-column {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.gender-bar-track {
  width: 100%;
  height: 8px;
  background-color: $color-ff7596;
  border-radius: $size-full;
  overflow: hidden;
}

.gender-bar-fill {
  height: 100%;
  background-color: $color-2551c3;
  border-radius: $size-full;
  transition: width 0.6s ease;
}

.gender-labels {
  display: flex;
  justify-content: space-between;
}

.gender-end {
  display: flex;
  align-items: center;
  gap: 4px;
}

.gender-icon {
  width: 16px;
  height: 16px;
}

.gender-percent {
  font-family: $font-family;
  font-size: $font-size-13;
  font-weight: $font-weight-600;
  white-space: nowrap;
}

.male-percent {
  color: $color-424242;
}

.female-percent {
  color: $color-424242;
}

.weaknesses-section {
  margin-top: 24px;
}
</style>
