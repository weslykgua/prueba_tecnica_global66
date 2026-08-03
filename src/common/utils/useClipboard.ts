import { ref } from 'vue';
import { buildPokemonShareText, getTypeBackgroundColor } from '../../pokemon/utils/formatters';
import { toPokemonType } from '../../pokemon/type/PokemonType';
import ToastMessage from '../model/ToastMessage';
import PokemonDetail from '../../pokemon/model/PokemonDetail';

const activeToasts = ref<ToastMessage[]>([]);
let toastTimer: ReturnType<typeof setTimeout> | undefined = undefined;

export function useClipboard() {
  const isCopying = ref(false);

  function addToast(
    message: string,
    type: 'success' | 'info' | 'error' = 'success',
    backgroundColor?: string
  ) {
    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    const id = Date.now().toString() + Math.random().toString().slice(2, 6);

    activeToasts.value = [{ id, message, type, backgroundColor }];

    toastTimer = setTimeout(() => {
      removeToast(id);
      toastTimer = undefined;
    }, 3000);
  }

  function removeToast(id: string) {
    activeToasts.value = activeToasts.value.filter(t => t.id !== id);
  }

  async function sharePokemon(pokemon: PokemonDetail, customBgColor?: string): Promise<boolean> {
    isCopying.value = true;
    const textToCopy = buildPokemonShareText(pokemon);

    let bgColor = customBgColor;
    if (!bgColor && pokemon?.types?.length) {
      const mainTypeEnum = toPokemonType(pokemon.types[0]);
      if (mainTypeEnum) {
        bgColor = getTypeBackgroundColor(mainTypeEnum);
      }
    }

    let success = false;
    try {
      if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(textToCopy);
          success = true;
        } catch {
          // Fallback if writeText throws
        }
      }

      if (!success) {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      const displayName = pokemon.formattedName || pokemon.name || 'Pokémon';
      if (success) {
        addToast(`¡Información de ${displayName} copiada al portapapeles!`, 'success', bgColor);
      } else {
        addToast('No se pudo copiar la información. Reintenta.', 'error');
      }
      return success;
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
