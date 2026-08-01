<template>
  <div class="search-bar-container">
    <div class="search-bar">
      <input
        type="text"
        class="search-input"
        placeholder="Procurar Pókemon..."
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue?: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');

.search-bar-container {
  position: relative;
  width: 100%;
  height: 92px;
}

.search-bar {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 14px 16px;
  gap: 8px;

  position: absolute;
  width: 265px;
  height: 48px;
  left: 16px;
  top: 44px;

  border: 1.5px solid #E0E0E0;
  border-radius: 30px;
  background-color: #ffffff;
}

.search-input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: #424242;

  &::placeholder {
    color: #9e9e9e;
  }
}
</style>
