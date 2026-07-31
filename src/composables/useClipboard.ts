import { ref } from 'vue';
import { PokemonDetail, ToastMessage } from '../types/pokemon.types';
import { buildPokemonShareText } from '../utils/formatters';

const activeToasts = ref<ToastMessage[]>([]);
let toastTimer: ReturnType<typeof setTimeout> | null = null;

/**
 * Handles copying Pokémon details to clipboard using modern Clipboard API with rate-limited toast feedback.
 */
export function useClipboard() {
  const isCopying = ref(false);

  function addToast(message: string, type: 'success' | 'info' | 'error' = 'success') {
    if (toastTimer) clearTimeout(toastTimer);
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);

    // Limit active toasts to 1 single toast to prevent notification stacking on rapid clicks
    activeToasts.value = [{ id, message, type }];

    toastTimer = setTimeout(() => {
      removeToast(id);
      toastTimer = null;
    }, 3000);
  }

  function removeToast(id: string) {
    activeToasts.value = activeToasts.value.filter(t => t.id !== id);
  }

  async function sharePokemon(pokemon: PokemonDetail): Promise<boolean> {
    isCopying.value = true;
    const textToCopy = buildPokemonShareText(pokemon);

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        throw new Error('Clipboard API is not available on this environment');
      }

      addToast(`¡Información de ${pokemon.formattedName} copiada al portapapeles!`, 'success');
      return true;
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
      addToast('No se pudo copiar la información. Reintenta.', 'error');
      return false;
    } finally {
      isCopying.value = false;
    }
  }

  return {
    isCopying,
    activeToasts,
    sharePokemon,
    addToast,
    removeToast,
  };
}
