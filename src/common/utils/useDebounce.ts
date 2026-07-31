import { ref, watch, Ref } from 'vue';

/**
 * Custom Vue 3 debouncing composable to delay updating a reactive value.
 * @param value The source ref value to debounce.
 * @param delayMs Delay in milliseconds.
 */
export function useDebounce<T>(value: Ref<T>, delayMs = 300): Ref<T> {
  const debouncedValue = ref(value.value) as Ref<T>;
  let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

  watch(value, (newValue) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delayMs);
  });

  return debouncedValue;
}
