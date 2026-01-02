'use client';

import { useState, useEffect, useCallback } from 'react';
import { WEAPONS, WEAPON_BY_ID, TOTAL_WEAPONS } from '@/data/weapons';

// ストレージキー
const STORAGE_KEY = 'weapon-checks';

/**
 * 武器チェック状態を管理するカスタムフック
 *
 * ローカルストレージと連携して、チェック状態を永続化します
 * Base64URL形式で保存（約12文字）
 */
export function useWeaponChecks() {
  const [checkedIndices, setCheckedIndices] = useState<Set<number>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // ローカルストレージからデータを読み込み
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const indices = decodeProgressToIndices(stored);
        setCheckedIndices(indices);
      }
    } catch (error) {
      console.error('Failed to load weapon checks:', error);
      setCheckedIndices(new Set());
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // ローカルストレージにデータを保存
  const saveIndicesToStorage = useCallback((indices: Set<number>) => {
    try {
      const encoded = encodeIndicesToProgress(indices);
      localStorage.setItem(STORAGE_KEY, encoded);
    } catch (error) {
      console.error('Failed to save weapon checks:', error);
    }
  }, []);

  // 武器のチェック状態を切り替え
  const toggleCheck = useCallback(
    (weaponId: string) => {
      const weapon = WEAPON_BY_ID.get(weaponId);
      if (!weapon) return;

      setCheckedIndices((prev) => {
        const newIndices = new Set(prev);
        if (newIndices.has(weapon.index)) {
          newIndices.delete(weapon.index);
        } else {
          newIndices.add(weapon.index);
        }
        saveIndicesToStorage(newIndices);
        return newIndices;
      });
    },
    [saveIndicesToStorage]
  );

  // 全てチェック
  const checkAll = useCallback(
    (weaponIds: string[]) => {
      setCheckedIndices((prev) => {
        const newIndices = new Set(prev);
        weaponIds.forEach((id) => {
          const weapon = WEAPON_BY_ID.get(id);
          if (weapon) {
            newIndices.add(weapon.index);
          }
        });
        saveIndicesToStorage(newIndices);
        return newIndices;
      });
    },
    [saveIndicesToStorage]
  );

  // 全て未チェック
  const uncheckAll = useCallback(
    (weaponIds: string[]) => {
      setCheckedIndices((prev) => {
        const newIndices = new Set(prev);
        weaponIds.forEach((id) => {
          const weapon = WEAPON_BY_ID.get(id);
          if (weapon) {
            newIndices.delete(weapon.index);
          }
        });
        saveIndicesToStorage(newIndices);
        return newIndices;
      });
    },
    [saveIndicesToStorage]
  );

  // 特定の武器がチェックされているか
  const isChecked = useCallback(
    (weaponId: string): boolean => {
      const weapon = WEAPON_BY_ID.get(weaponId);
      if (!weapon) return false;
      return checkedIndices.has(weapon.index);
    },
    [checkedIndices]
  );

  // チェック済み武器数を取得
  const getCheckedCount = useCallback(
    (weaponIds?: string[]): number => {
      if (weaponIds) {
        return weaponIds.filter((id) => {
          const weapon = WEAPON_BY_ID.get(id);
          return weapon && checkedIndices.has(weapon.index);
        }).length;
      }
      return checkedIndices.size;
    },
    [checkedIndices]
  );

  // 全てのデータを完全に削除
  const clearAll = useCallback(() => {
    setCheckedIndices(new Set());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear weapon checks:', error);
    }
  }, []);

  // checksオブジェクトを生成（後方互換性のため）
  const checks = Object.fromEntries(
    WEAPONS.map((weapon) => [
      weapon.id,
      {
        weaponId: weapon.id,
        checked: checkedIndices.has(weapon.index),
        checkedAt: undefined,
      },
    ])
  );

  return {
    checks,
    isLoaded,
    toggleCheck,
    checkAll,
    uncheckAll,
    clearAll,
    isChecked,
    getCheckedCount,
  };
}

// Base64URL文字セット
const BASE64URL_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

// Set<number>をBase64URLにエンコード
function encodeIndicesToProgress(indices: Set<number>): string {
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
}

// Base64URLをSet<number>にデコード
function decodeProgressToIndices(encoded: string): Set<number> {
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
}
