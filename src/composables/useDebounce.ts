import { ref, watch, Ref } from 'vue';

/**
 * Returns a debounced ref that updates after the specified delay in ms.
 */
export function useDebounce<T>(source: Ref<T>, delayMs: number = 300): Ref<T> {
  const debouncedValue = ref<T>(source.value) as Ref<T>;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  watch(
    source,
    (newValue) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        debouncedValue.value = newValue;
      }, delayMs);
    },
    { immediate: true }
  );

  return debouncedValue;
}
