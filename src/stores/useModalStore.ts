import { reactive } from 'vue';

export type ModalName = 'settings' | 'version';

interface ModalState {
  settings: boolean;
  version: boolean;
}

const state = reactive<ModalState>({
  settings: false,
  version: false,
});

const open = (name: ModalName) => {
  state[name] = true;
};

const close = (name: ModalName) => {
  state[name] = false;
};

const toggle = (name: ModalName) => {
  state[name] = !state[name];
};

export function useModalStore() {
  return {
    state,
    open,
    close,
    toggle,
  } as const;
} 