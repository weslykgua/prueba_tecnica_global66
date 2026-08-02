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
@use '@/assets/styles/sizes' as *;

.regions-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: $size-100-percent;
  height: $size-100-percent;
  flex: 1;
  min-height: $size-100-percent;
  padding: $size-44px $size-16px;
  box-sizing: border-box;
}
</style>
