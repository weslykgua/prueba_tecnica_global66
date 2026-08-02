<template>
  <div class="stat-card">
    <div class="stat-label-row">
      <img :src="icon" :alt="label" class="stat-icon" />
      <span class="stat-label">{{ label }}</span>
    </div>
    <div class="stat-value-box">
      <span class="stat-value">{{ value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  label: string;
  value: string;
}>();
</script>

<style lang="scss" scoped>
@use '@/assets/styles/colors' as *;
@use '@/assets/styles/fonts' as *;
@use '@/assets/styles/sizes' as *;
@use '@/assets/styles/variables' as *;

.stat-card {
  min-width: $size-180px;
}

.stat-label-row {
  display: flex;
  align-items: center;
  gap: $size-6px;
  padding-left: $size-2px;
}

.stat-icon {
  width: $size-16px;
  height: $size-16px;
  flex-shrink: 0;
}

.stat-label {
  font-family: $font-family;
  font-size: $font-size-12;
  font-weight: $font-weight-500;
  color: $color-424242;
}

.stat-value-box {
  width: $size-154px;
  height: $size-43px;
  max-width: $size-100-percent;
  display: flex;
  align-items: center;
  justify-content: center;
  border: $size-1px solid $color-e0e0e0;
  border-radius: $size-15px;
  box-sizing: border-box;
  margin: $size-4px $size-auto $size-0px $size-auto;
}

.stat-value {
  font-family: $font-family;
  font-size: $font-size-18;
  font-weight: $font-weight-500;
  color: $color-121212;
}
</style>