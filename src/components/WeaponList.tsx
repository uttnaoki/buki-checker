'use client';

import { useMemo, useState } from 'react';
import type { FilterType } from '@/types/weapon.types';
import { getWeaponsByCategory } from '@/data/weapons';
import { useWeaponChecks } from '@/hooks/useWeaponChecks';
import { WeaponCategory } from './WeaponCategory';

export function WeaponList() {
  const [filter, setFilter] = useState<FilterType>('all');
  const { isLoaded, toggleCheck, isChecked, getCheckedCount } = useWeaponChecks();

  const weaponsByCategory = useMemo(() => getWeaponsByCategory(), []);

  // フィルタリングされた武器
  const filteredWeaponsByCategory = useMemo(() => {
    if (filter === 'all') return weaponsByCategory;

    const filtered: typeof weaponsByCategory = {};
    Object.entries(weaponsByCategory).forEach(([category, weapons]) => {
      const filteredWeapons = weapons.filter((weapon) => {
        const checked = isChecked(weapon.id);
        return filter === 'checked' ? checked : !checked;
      });

      if (filteredWeapons.length > 0) {
        filtered[category] = filteredWeapons;
      }
    });

    return filtered;
  }, [weaponsByCategory, filter, isChecked]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  const totalChecked = getCheckedCount();
  const totalWeapons = Object.values(weaponsByCategory).reduce(
    (sum, weapons) => sum + weapons.length,
    0
  );
  const progressPercentage = totalWeapons > 0 ? (totalChecked / totalWeapons) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">サーモンラン</h1>
              <p className="text-sm text-gray-600">武器チェッカー</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {totalChecked}/{totalWeapons}
              </div>
              <div className="text-xs text-gray-500">支給済み</div>
            </div>
          </div>

          {/* プログレスバー */}
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-green-600 h-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 text-right mt-1">
              {progressPercentage.toFixed(1)}% COMPLETED
            </div>
          </div>

          {/* フィルターボタン */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`
                px-4 py-2 rounded text-sm font-medium transition-colors
                ${
                  filter === 'all'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              全て
            </button>
            <button
              onClick={() => setFilter('unchecked')}
              className={`
                px-4 py-2 rounded text-sm font-medium transition-colors
                ${
                  filter === 'unchecked'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              未支給
            </button>
            <button
              onClick={() => setFilter('checked')}
              className={`
                px-4 py-2 rounded text-sm font-medium transition-colors
                ${
                  filter === 'checked'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }
              `}
            >
              支給済み
            </button>
          </div>
        </div>
      </header>

      {/* 武器リスト */}
      <main className="p-4">
        {Object.entries(filteredWeaponsByCategory).map(([category, weapons]) => (
          <WeaponCategory
            key={category}
            category={category as any}
            weapons={weapons}
            isChecked={isChecked}
            onToggle={toggleCheck}
            checkedCount={getCheckedCount(weapons.map((w) => w.id))}
          />
        ))}

        {Object.keys(filteredWeaponsByCategory).length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            該当する武器がありません
          </div>
        )}
      </main>
    </div>
  );
}
