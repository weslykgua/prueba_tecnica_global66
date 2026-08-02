import { ref } from 'vue';
import { buildPokemonShareText } from '../../pokemon/utils/formatters';
import ToastMessage from '../model/ToastMessage';
import PokemonDetail from '../../pokemon/model/PokemonDetail';

const activeToasts = ref<ToastMessage[]>([]);
let toastTimer: ReturnType<typeof setTimeout> | undefined = undefined;

export function useClipboard() {
  const isCopying = ref(false);

  function addToast(message: string, type: 'success' | 'info' | 'error' = 'success') {
    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    const id = Date.now().toString() + Math.random().toString().slice(2, 6);

    activeToasts.value = [{ id, message, type }];

    toastTimer = setTimeout(() => {
      removeToast(id);

      toastTimer = undefined;
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
