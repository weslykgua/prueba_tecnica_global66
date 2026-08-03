import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ConfirmModal from '@/common/component/ConfirmModal.vue';

describe('ConfirmModal.vue', () => {
  it('renders title and message correctly', () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        isOpen: true,
        title: 'Confirmar Acción',
        message: '¿Estás seguro de realizar esta acción?',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    expect(wrapper.text()).toContain('Confirmar Acción');
    expect(wrapper.text()).toContain('¿Estás seguro de realizar esta acción?');
  });

  it('emits confirm event when confirm button is clicked', async () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        isOpen: true,
        title: 'Confirmar',
        confirmLabel: 'Aceptar',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    const buttons = wrapper.findAllComponents({ name: 'Button' });
    const confirmBtn = buttons.find((b) => b.props('label') === 'Aceptar');
    expect(confirmBtn).toBeDefined();

    await confirmBtn!.trigger('click');
    expect(wrapper.emitted('confirm')).toBeTruthy();
  });

  it('emits cancel event when cancel button is clicked', async () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        isOpen: true,
        title: 'Confirmar',
        cancelLabel: 'Cancelar',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    const buttons = wrapper.findAllComponents({ name: 'Button' });
    const cancelBtn = buttons.find((b) => b.props('label') === 'Cancelar');
    expect(cancelBtn).toBeDefined();

    await cancelBtn!.trigger('click');
    expect(wrapper.emitted('cancel')).toBeTruthy();
  });
});
