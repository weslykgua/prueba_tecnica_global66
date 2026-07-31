import { usePokemonViewModel } from '../presentation/viewmodels/usePokemonViewModel';

/**
 * Re-export Pokemon ViewModel orchestrator as usePokemon composable for backward compatibility.
 */
export function usePokemon() {
  return usePokemonViewModel();
}
