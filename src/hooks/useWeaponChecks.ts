'use client';

import { useEffect, useState } from 'react';
import { useWeaponCheckStore } from '@/stores/weaponCheckStore';
import { WEAPONS } from '@/data/weapons';

/**
 * 武器チェック状態を管理するカスタムフック
 * Zustand storeのラッパー
 */
export function useWeaponChecks() {
  const [isLoaded, setIsLoaded] = useState(false);
  const store = useWeaponCheckStore();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // checksオブジェクトを生成（後方互換性のため）
  const checks = Object.fromEntries(
    WEAPONS.map((weapon) => [
      weapon.id,
      {
        weaponId: weapon.id,
        checked: store.checkedIndices.has(weapon.index),
        checkedAt: undefined,
      },
    ])
  );

  return {
    checks,
    isLoaded,
    toggleCheck: store.toggleCheck,
    checkAll: store.checkAll,
    uncheckAll: store.uncheckAll,
    clearAll: store.clearAll,
    isChecked: store.isChecked,
    getCheckedCount: store.getCheckedCount,
  };
}
