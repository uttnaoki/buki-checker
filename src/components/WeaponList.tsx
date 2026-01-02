'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { BottomNav } from './BottomNav';
import type { WeaponCategory as WeaponCategoryType } from '@/types/weapon.types';
import { CATEGORY_LABELS } from '@/types/weapon.types';
import { getWeaponsByCategory, WEAPON_BY_ID } from '@/data/weapons';
import { useWeaponCheckStore } from '@/stores/weaponCheckStore';
import { WeaponItem } from './WeaponItem';

// カテゴリアイコンのマッピング
const CATEGORY_ICON_PATHS: Record<WeaponCategoryType, string> = {
  shooter: '/icons/categories/shooter.png',
  blaster: '/icons/categories/blaster.png',
  roller: '/icons/categories/roller.png',
  brush: '/icons/categories/brush.png',
  charger: '/icons/categories/charger.png',
  slosher: '/icons/categories/slosher.png',
  spinner: '/icons/categories/splatling.png',
  maneuver: '/icons/categories/dualie.png',
  shelter: '/icons/categories/brella.png',
  stringer: '/icons/categories/stringer.png',
  wiper: '/icons/categories/splatana.png',
  grizzco: '/icons/categories/grizzco.png',
};

export function WeaponList() {
  const { toggleCheck, checkedIndices, hasHydrated } = useWeaponCheckStore();

  // checkedIndicesから直接チェック状態を取得
  const isChecked = (weaponId: string) => {
    const weapon = WEAPON_BY_ID.get(weaponId);
    return weapon ? checkedIndices.has(weapon.index) : false;
  };

  const getCheckedCount = (weaponIds: string[]) => {
    return weaponIds.filter((id) => isChecked(id)).length;
  };
  const weaponsByCategory = useMemo(() => getWeaponsByCategory(), []);

  // 全武器リスト
  const allWeapons = useMemo(() => {
    return Object.values(weaponsByCategory).flat();
  }, [weaponsByCategory]);

  // カテゴリごとのチェック状況を計算
  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; checked: number; isComplete: boolean }> = {};

    // 全体の統計
    const totalWeapons = allWeapons.length;
    const totalChecked = getCheckedCount(allWeapons.map((w) => w.id));
    stats['all'] = {
      total: totalWeapons,
      checked: totalChecked,
      isComplete: totalWeapons > 0 && totalChecked === totalWeapons,
    };

    // カテゴリ別の統計
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
  }, [weaponsByCategory, allWeapons, getCheckedCount]);

  // カテゴリの並び替え: all → grizzco → 未完了 → 完了済み
  const allCategories = useMemo(() => {
    const categories = Object.keys(weaponsByCategory) as WeaponCategoryType[];
    const sorted = categories.sort((a, b) => {
      // grizzco を2番目に
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
    // all を先頭に追加
    return ['all' as const, ...sorted];
  }, [weaponsByCategory, categoryStats]);

  const [activeCategory, setActiveCategory] = useState<WeaponCategoryType | 'all'>('all');

  // アクティブなカテゴリの武器
  const activeWeapons = useMemo(
    () => (activeCategory === 'all' ? allWeapons : weaponsByCategory[activeCategory] || []),
    [activeCategory, allWeapons, weaponsByCategory]
  );

  if (!hasHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  const totalChecked = checkedIndices.size;
  const totalWeapons = Object.values(weaponsByCategory).reduce(
    (sum, weapons) => sum + weapons.length,
    0
  );
  const progressPercentage = totalWeapons > 0 ? (totalChecked / totalWeapons) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-wide">
                サーモンラン
              </h1>
              <p className="text-xs text-gray-600 tracking-wider">ブキチェッカー</p>
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
            <div className="flex gap-2 min-w-max pr-4">
              {allCategories.map((category) => {
                const stats = categoryStats[category];
                const isComplete = stats?.isComplete || false;
                const isAllCategory = category === 'all';
                const iconPath = isAllCategory ? null : CATEGORY_ICON_PATHS[category as WeaponCategoryType];

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category as WeaponCategoryType | 'all')}
                    className={`
                      rounded-lg transition-colors
                      flex items-center justify-center
                      ${isAllCategory ? 'px-4 py-2' : 'p-2'}
                      ${
                        activeCategory === category
                          ? 'bg-green-600 text-white'
                          : isComplete
                          ? 'bg-green-100 hover:bg-green-200'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }
                    `}
                  >
                    {isAllCategory ? (
                      <span className="font-bold text-sm">ALL</span>
                    ) : (
                      <Image
                        src={iconPath!}
                        alt={CATEGORY_LABELS[category as WeaponCategoryType]}
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* 武器リスト */}
      <main className="max-w-md mx-auto p-4 pb-20">
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
            ブキがありません
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
