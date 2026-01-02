import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WEAPON_BY_ID, TOTAL_WEAPONS } from '@/data/weapons';

// Base64URL文字セット
const BASE64URL_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

// Set<number>をBase64URLにエンコード
const encodeIndices = (indices: Set<number>): string => {
  let binary = '';
  for (let i = 0; i < TOTAL_WEAPONS; i++) {
    binary += indices.has(i) ? '1' : '0';
  }

  const bigInt = BigInt('0b' + binary);

  if (bigInt === BigInt(0)) {
    return 'A';
  }

  let result = '';
  let remaining = bigInt;
  const base = BigInt(64);

  while (remaining > BigInt(0)) {
    const index = Number(remaining % base);
    result = BASE64URL_CHARS[index] + result;
    remaining = remaining / base;
  }

  return result;
};

// Base64URLをSet<number>にデコード
const decodeIndices = (encoded: string): Set<number> => {
  const indices = new Set<number>();

  if (!encoded) {
    return indices;
  }

  let bigInt = BigInt(0);
  const base = BigInt(64);

  for (const char of encoded) {
    const index = BASE64URL_CHARS.indexOf(char);
    if (index === -1) {
      return new Set();
    }
    bigInt = bigInt * base + BigInt(index);
  }

  let binary = bigInt.toString(2);
  binary = binary.padStart(TOTAL_WEAPONS, '0');

  if (binary.length > TOTAL_WEAPONS) {
    binary = binary.slice(-TOTAL_WEAPONS);
  }

  for (let i = 0; i < TOTAL_WEAPONS; i++) {
    if (binary[i] === '1') {
      indices.add(i);
    }
  }

  return indices;
};

interface WeaponCheckStore {
  checkedIndices: Set<number>;
  hasHydrated: boolean;
  toggleCheck: (weaponId: string) => void;
  checkAll: (weaponIds: string[]) => void;
  uncheckAll: (weaponIds: string[]) => void;
  clearAll: () => void;
  isChecked: (weaponId: string) => boolean;
  getCheckedCount: (weaponIds?: string[]) => number;
  getEncodedProgress: () => string;
}

const weaponCheckStoreBase = create<WeaponCheckStore>()(
  persist(
    (set, get) => ({
      checkedIndices: new Set<number>(),
      hasHydrated: false,

      toggleCheck: (weaponId: string) => {
        const weapon = WEAPON_BY_ID.get(weaponId);
        if (!weapon) return;

        set((state) => {
          const newIndices = new Set(state.checkedIndices);
          if (newIndices.has(weapon.index)) {
            newIndices.delete(weapon.index);
          } else {
            newIndices.add(weapon.index);
          }
          return { checkedIndices: newIndices };
        });
      },

      checkAll: (weaponIds: string[]) => {
        set((state) => {
          const newIndices = new Set(state.checkedIndices);
          weaponIds.forEach((id) => {
            const weapon = WEAPON_BY_ID.get(id);
            if (weapon) {
              newIndices.add(weapon.index);
            }
          });
          return { checkedIndices: newIndices };
        });
      },

      uncheckAll: (weaponIds: string[]) => {
        set((state) => {
          const newIndices = new Set(state.checkedIndices);
          weaponIds.forEach((id) => {
            const weapon = WEAPON_BY_ID.get(id);
            if (weapon) {
              newIndices.delete(weapon.index);
            }
          });
          return { checkedIndices: newIndices };
        });
      },

      clearAll: () => {
        set({ checkedIndices: new Set<number>() });
      },

      isChecked: (weaponId: string) => {
        const weapon = WEAPON_BY_ID.get(weaponId);
        if (!weapon) return false;
        return get().checkedIndices.has(weapon.index);
      },

      getCheckedCount: (weaponIds?: string[]) => {
        const { checkedIndices } = get();
        if (weaponIds) {
          return weaponIds.filter((id) => {
            const weapon = WEAPON_BY_ID.get(id);
            return weapon && checkedIndices.has(weapon.index);
          }).length;
        }
        return checkedIndices.size;
      },

      getEncodedProgress: () => {
        return encodeIndices(get().checkedIndices);
      },
    }),
    {
      name: 'weapon-checks',
      skipHydration: true,
      storage: {
        getItem: (name) => {
          if (typeof window === 'undefined') return null;
          const str = localStorage.getItem(name);
          if (!str) return null;
          return {
            state: {
              checkedIndices: decodeIndices(str),
            },
          };
        },
        setItem: (name, value) => {
          if (typeof window === 'undefined') return;
          const encoded = encodeIndices(value.state.checkedIndices);
          localStorage.setItem(name, encoded);
        },
        removeItem: (name) => {
          if (typeof window === 'undefined') return;
          localStorage.removeItem(name);
        },
      },
    }
  )
);

// クライアントサイドでハイドレーションを実行
if (typeof window !== 'undefined') {
  const result = weaponCheckStoreBase.persist.rehydrate();
  if (result instanceof Promise) {
    result.then(() => {
      weaponCheckStoreBase.setState({ hasHydrated: true });
    });
  } else {
    weaponCheckStoreBase.setState({ hasHydrated: true });
  }
}

export const useWeaponCheckStore = weaponCheckStoreBase;
