import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_NAME = 'ハチ';
const MAX_NAME_LENGTH = 10;

interface SettingsStore {
  name: string;
  hasHydrated: boolean;
  setName: (name: string) => void;
}

const settingsStoreBase = create<SettingsStore>()(
  persist(
    (set) => ({
      name: '',
      hasHydrated: false,

      setName: (name: string) => {
        const trimmed = name.slice(0, MAX_NAME_LENGTH);
        set({ name: trimmed });
      },
    }),
    {
      name: 'app-settings',
      skipHydration: true,
      partialize: (state) => ({ name: state.name }),
    }
  )
);

// クライアントサイドでハイドレーションを実行
if (typeof window !== 'undefined') {
  const result = settingsStoreBase.persist.rehydrate();
  if (result instanceof Promise) {
    result.then(() => {
      settingsStoreBase.setState({ hasHydrated: true });
    });
  } else {
    settingsStoreBase.setState({ hasHydrated: true });
  }
}

export const useSettingsStore = settingsStoreBase;
export { DEFAULT_NAME, MAX_NAME_LENGTH };
