'use client';

import { useState, useEffect, useCallback } from 'react';
import { storageDataSchema } from '@/schemas/weapon.schema';
import type { StorageData, WeaponCheckState } from '@/types/weapon.types';
import { STORAGE_KEY } from '@/types/weapon.types';

/**
 * 武器チェック状態を管理するカスタムフック
 *
 * ローカルストレージと連携して、チェック状態を永続化します
 */
export function useWeaponChecks() {
  const [checks, setChecks] = useState<Record<string, WeaponCheckState>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // ローカルストレージからデータを読み込み
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const validated = storageDataSchema.parse(parsed);
        setChecks(validated.checks);
      }
    } catch (error) {
      console.error('Failed to load weapon checks:', error);
      // エラー時は空の状態で開始
      setChecks({});
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // ローカルストレージにデータを保存
  const saveToStorage = useCallback((newChecks: Record<string, WeaponCheckState>) => {
    try {
      const data: StorageData = {
        version: '1.0',
        checks: newChecks,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save weapon checks:', error);
    }
  }, []);

  // 武器のチェック状態を切り替え
  const toggleCheck = useCallback(
    (weaponId: string) => {
      setChecks((prev) => {
        const currentCheck = prev[weaponId];
        const newCheck: WeaponCheckState = {
          weaponId,
          checked: !currentCheck?.checked,
          checkedAt: !currentCheck?.checked ? new Date().toISOString() : undefined,
        };

        const newChecks = {
          ...prev,
          [weaponId]: newCheck,
        };

        saveToStorage(newChecks);
        return newChecks;
      });
    },
    [saveToStorage]
  );

  // 全てチェック
  const checkAll = useCallback(
    (weaponIds: string[]) => {
      setChecks((prev) => {
        const newChecks = { ...prev };
        const now = new Date().toISOString();

        weaponIds.forEach((weaponId) => {
          newChecks[weaponId] = {
            weaponId,
            checked: true,
            checkedAt: now,
          };
        });

        saveToStorage(newChecks);
        return newChecks;
      });
    },
    [saveToStorage]
  );

  // 全て未チェック
  const uncheckAll = useCallback(
    (weaponIds: string[]) => {
      setChecks((prev) => {
        const newChecks = { ...prev };

        weaponIds.forEach((weaponId) => {
          newChecks[weaponId] = {
            weaponId,
            checked: false,
            checkedAt: undefined,
          };
        });

        saveToStorage(newChecks);
        return newChecks;
      });
    },
    [saveToStorage]
  );

  // 特定の武器がチェックされているか
  const isChecked = useCallback(
    (weaponId: string): boolean => {
      return checks[weaponId]?.checked ?? false;
    },
    [checks]
  );

  // チェック済み武器数を取得
  const getCheckedCount = useCallback(
    (weaponIds?: string[]): number => {
      if (weaponIds) {
        return weaponIds.filter((id) => checks[id]?.checked).length;
      }
      return Object.values(checks).filter((check) => check.checked).length;
    },
    [checks]
  );

  return {
    checks,
    isLoaded,
    toggleCheck,
    checkAll,
    uncheckAll,
    isChecked,
    getCheckedCount,
  };
}
