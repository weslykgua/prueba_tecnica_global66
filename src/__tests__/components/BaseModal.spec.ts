import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseModal from '@/common/component/BaseModal.vue';

describe('BaseModal.vue', () => {
  it('renders modal content when isOpen is true', () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
        title: 'Título de Prueba',
      },
      slots: {
        default: '<div class="test-content">Contenido Modal</div>',
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    expect(wrapper.find('.base-modal-title').text()).toBe('Título de Prueba');
    expect(wrapper.find('.test-content').text()).toBe('Contenido Modal');
  });

  it('does not render container when isOpen is false', () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: false,
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    expect(wrapper.find('.base-modal-backdrop').exists()).toBe(false);
  });

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    const closeBtn = wrapper.find('.close-btn');
    await closeBtn.trigger('click');

    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('emits close event on backdrop click if closeOnBackdrop is true', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        isOpen: true,
        closeOnBackdrop: true,
      },
      global: {
        stubs: {
          Teleport: true,
        },
      },
    });

    const backdrop = wrapper.find('.base-modal-backdrop');
    await backdrop.trigger('click');

    expect(wrapper.emitted('close')).toBeTruthy();
  });
});
