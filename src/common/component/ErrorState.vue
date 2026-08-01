<template>
  <div class="error-state" role="alert">
    <div class="error-image-wrapper">
      <svg
        width="185"
        height="215"
        viewBox="0 0 185 215"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        class="error-svg"
      >
        <rect width="185" height="214.865" fill="url(#pattern0_10_3091)" />
        <defs>
          <pattern id="pattern0_10_3091" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_10_3091" transform="scale(0.00448431 0.003861)" />
          </pattern>
          <image
            id="image0_10_3091"
            width="223"
            height="259"
            preserveAspectRatio="none"
            xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN8AAAEDCAYAAAC1ctHMAAAQAElEQVR4Aezdy7d1R1U//J38RBAFokBUSLhDwj0MB5IhI4EEfHvQcrzQhMY7YDjepvwV2rGHLbGHLYfS0RET5JpwDwjhjkAChPtFvCBqfvOzc+ZOnTq1aq2199rn7PNkP+PMp6pmzZpVNau+dV1r7atXx3/naoG77rrrnUGfuvPOO/8z3IdO3E+9973v/dNzLcgxswu3wBF859QEAbJ7gC2ye1vQTVddddVjw12duDc99NBDfyI+6A78I135FjiCb89tHGB6d9BDAbJXTczq9eSD3jlR/ih2SS1wBN8eGy4A9O5Q/6agbf7eFrPlX26T8JjmcljgCL49tVMAz8y1LfDWpYrZ8i0netbhPf93VH/OFjiCb38Gt7dbQvtSepYoy1HHghY4gm9BY6aqOLn8u/Qv4cbs99ASeo46DssCR/DtoT3i5PINS6uN/d8XltZ51HexFjiC7wLs/8pXvnL12te+dkPPfe5zR0sR+78bYgY8XkOMWuryCBww+C6PEcuSBkActJSsU35A+/Vf//VTvOuvv36Ff4rZDriGcILajj1yL5UFjuBbuLlijXlTT+XTn/70ZjQAPu1pT2vGVcw3jQG8kj8GD9QCR/At3zDX9FTG8nEw+gUveMHqSU960mB8EXE8AS2McVm9R/Cdc8vFzHgmR4BEIm666SbOKMXsdzwBHbXSYQscwbd8+/ykpxL4UEsGANEtt9zSij7De/ScgJ6p+hXBOIJv+Wb8fE/lf/zHf5yJLsEIfP/n//yf1c0333xGrmaE7PEEtDbKJQofwbdwY73uda97a0/lgw8+uI4uAYdRhgNUq8c97nGrF73oRaLG6HgCOmahA40/gu+cG+Y73/nOYI4AmETo2muvXV133XW8Y3Q8AR2z0AHGH8F3zo3yP//zPysAk226/EP0vOc970JPQGNf+ZdxuHNHuO9b+rG5oTo/WvhH8G3T0iNpYtn4np7IL3/5y170mTgnoPaBZyIqRoBkkRPQ0HNH0EMo6vKWyOb14d4ag8Ub8E7o+PZ9GGaXvyP4drHeQNrbbrvtjQNRa/b3vve9teu/6NCcLkXHX/3BH/xBVyYjY4ba+hnQAJVPXADw61Nfx12/fR/5va8jc4zqWOAIvo5x9hX1rW99a7ZqM9/UE9AdADH78j4Ghlsjv60BP9sQV1CCI/guoDH/8z//c6tcp56AAkTMYrOeAQ357v1kr8CR3/HKo2eggbgj+AYMsys7lpPv7+n47//+7010yG78Y545J6AxI036DEUAD1AnPrinted output truncated..."
          />
        </defs>
      </svg>
    </div>

    <h2 class="error-title">{{ title }}</h2>

    <p class="error-message">{{ message }}</p>

    <Button
      data-testid="btn-retry"
      @click="$emit('retry')"
    >
      Reintentar
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';
withDefaults(
  defineProps<{
    title?: string;
    message?: string;
  }>(),
  {
    title: 'Algo salió mal...',
    message: 'No pudimos cargar la información en este momento. Verifica tu conexión o intenta nuevamente más tarde.',
  }
);

defineEmits<{
  (e: 'retry'): void;
}>();
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 540px;
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;
}

.error-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
}

.error-svg {
  width: 185px;
  height: 215px;
  object-fit: contain;
}

.error-title {
  font-size: 2rem;
  font-weight: 700;
  color: #121212;
  margin-bottom: 0.75rem;
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
}

.error-message {
  font-size: 1.05rem;
  font-weight: 400;
  color: #5e5e5e;
  line-height: 1.4;
  max-width: 440px;
  margin-bottom: 0.5rem;
  padding: 0 1rem;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
}
</style>
