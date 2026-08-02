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
import emptyStateIllustration from '@/assets/empty_state_illustration.svg';
import RegionsTexts from '../text/regions.texts';
</script>

<style lang="scss" scoped>
.regions-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 100%;
  padding: 44px 16px;
  box-sizing: border-box;
}
</style>
