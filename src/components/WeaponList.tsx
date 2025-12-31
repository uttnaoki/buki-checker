'use client';

import { useMemo, useState } from 'react';
import type { WeaponCategory as WeaponCategoryType } from '@/types/weapon.types';
import { CATEGORY_LABELS } from '@/types/weapon.types';
import { getWeaponsByCategory } from '@/data/weapons';
import { useWeaponChecks } from '@/hooks/useWeaponChecks';
import { WeaponItem } from './WeaponItem';

export function WeaponList() {
  const { isLoaded, toggleCheck, isChecked, getCheckedCount } = useWeaponChecks();
  const weaponsByCategory = useMemo(() => getWeaponsByCategory(), []);

  // カテゴリごとのチェック状況を計算
  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; checked: number; isComplete: boolean }> = {};
    Object.entries(weaponsByCategory).forEach(([category, weapons]) => {
      const total = weapons.length;
      const checked = getCheckedCount(weapons.map((w) => w.id));
      stats[category] = {
        total,
        checked,
        isComplete: total > 0 && checked === total,
      };
    });
    return stats;
  }, [weaponsByCategory, getCheckedCount]);

  // カテゴリの並び替え: grizzco → 未完了 → 完了済み
  const allCategories = useMemo(() => {
    const categories = Object.keys(weaponsByCategory) as WeaponCategoryType[];
    return categories.sort((a, b) => {
      // grizzco を最初に
      if (a === 'grizzco') return -1;
      if (b === 'grizzco') return 1;

      // 完了状況で並び替え（未完了が先）
      const aComplete = categoryStats[a]?.isComplete || false;
      const bComplete = categoryStats[b]?.isComplete || false;
      if (aComplete !== bComplete) {
        return aComplete ? 1 : -1;
      }

      // 同じ完了状況の場合は元の順序を維持
      return 0;
    });
  }, [weaponsByCategory, categoryStats]);

  const [activeCategory, setActiveCategory] = useState<WeaponCategoryType>(allCategories[0]);

  // アクティブなカテゴリの武器
  const activeWeapons = useMemo(
    () => weaponsByCategory[activeCategory] || [],
    [weaponsByCategory, activeCategory]
  );

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

          {/* カテゴリタブ */}
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-2 min-w-max">
              {allCategories.map((category) => {
                const stats = categoryStats[category];
                const isComplete = stats?.isComplete || false;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                      ${
                        activeCategory === category
                          ? 'bg-green-600 text-white'
                          : isComplete
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }
                    `}
                  >
                    {isComplete && '✓ '}
                    {CATEGORY_LABELS[category]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* 武器リスト */}
      <main className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {activeWeapons.map((weapon) => (
            <WeaponItem
              key={weapon.id}
              weapon={weapon}
              checked={isChecked(weapon.id)}
              onToggle={toggleCheck}
            />
          ))}
        </div>

        {activeWeapons.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            武器がありません
          </div>
        )}
      </main>
    </div>
  );
}
