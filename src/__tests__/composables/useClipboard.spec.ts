import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useClipboard } from '../../common/utils/useClipboard';
import PokemonDetail from '@/pokemon/model/PokemonDetail';

describe('useClipboard Composable', () => {
  const mockPokemon: PokemonDetail = {
    id: 25,
    name: 'pikachu',
    formattedName: 'Pikachu',
    heightM: 4,
    weightKg: 60,
    spriteUrl: 'https://raw.githubusercontent.com/.../25.png',
    types: ['electric'],
    abilities: ['static'],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    const { activeToasts } = useClipboard();
    activeToasts.value = [];
  });

  it('should format share text correctly according to specification', async () => {
    const { sharePokemon, activeToasts } = useClipboard();

    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      configurable: true,
      writable: true,
    });
    Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });

    const success = await sharePokemon(mockPokemon);

    expect(success).toBe(true);
    expect(writeTextMock).toHaveBeenCalledWith('Pikachu, 60, 4, Electric, Static');
    expect(activeToasts.value.length).toBeGreaterThan(0);
    expect(activeToasts.value[0].message).toContain('Pikachu');
  });

  it('should add and remove toast messages', () => {
    const { addToast, removeToast, activeToasts } = useClipboard();

    addToast('Test message', 'info');
    expect(activeToasts.value).toHaveLength(1);
    expect(activeToasts.value[0].message).toBe('Test message');

    const id = activeToasts.value[0].id;
    removeToast(id);
    expect(activeToasts.value).toHaveLength(0);
  });
});
