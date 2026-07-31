import { ref, onMounted, onUnmounted, getCurrentInstance, Ref } from 'vue';

/**
 * Composable that triggers a callback when a target element scrolls into view using IntersectionObserver.
 */
export function useInfiniteScroll(
  targetRef: Ref<HTMLElement | undefined>,
  onIntersect: () => void,
  options: IntersectionObserverInit = { rootMargin: '200px', threshold: 0.1 }
) {
  const isIntersecting = ref(false);
  let observer: IntersectionObserver | undefined = undefined;

  const initObserver = () => {
    if (!targetRef.value || observer) return;

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(([entry]) => {
        isIntersecting.value = entry.isIntersecting;
        if (entry.isIntersecting) {
          onIntersect();
        }
      }, options);

      observer.observe(targetRef.value);
    }
  };

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };

  if (targetRef.value) {
    initObserver();
  }

  if (getCurrentInstance()) {
    onMounted(() => {
      initObserver();
    });

    onUnmounted(() => {
      cleanup();
    });
  }

  return {
    isIntersecting,
    cleanup,
  };
}
