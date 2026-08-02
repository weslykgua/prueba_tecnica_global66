import { ref, watch, Ref } from 'vue';

export function useDebounce<T>(value: Ref<T>, delayMs = 300): Ref<T> {
  const debouncedValue = ref(value.value) as Ref<T>;
  let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

  watch(value, newValue => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delayMs);
  });

  return debouncedValue;
}
