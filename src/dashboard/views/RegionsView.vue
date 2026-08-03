<template>
  <div class="regions-view">
    <InfoState
      :image="emptyStateIllustration"
      :title="RegionsTexts.infoStateTitle"
      :subtitle="RegionsTexts.infoStateSubtitle"
    />
  </div>
</template>

<script setup lang="ts">
import InfoState from '@/common/component/InfoState.vue';
import emptyStateIllustration from '@/assets/images/illustrations/empty_state_illustration.svg';
import RegionsTexts from '../text/regions.texts';
</script>

<style lang="scss" scoped>
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;

.regions-view {
  display: var(--display-flex);
  flex-direction: var(--flex-direction-column);
  align-items: var(--align-center);
  justify-content: var(--justify-center);
  width: $size-100-percent;
  height: $size-100-percent;
  flex: 1;
  min-height: $size-100-percent;
  padding: $size-44px $size-16px;
  box-sizing: var(--border-box);

  :deep(.info-title) {
    font-size: $font-size-20 !important;
  }
}
</style>
