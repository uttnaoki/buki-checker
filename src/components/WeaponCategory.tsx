'use client';

import { useState } from 'react';
import type { Weapon, WeaponCategory as WeaponCategoryType } from '@/types/weapon.types';
import { CATEGORY_LABELS } from '@/types/weapon.types';
import { WeaponItem } from './WeaponItem';

interface WeaponCategoryProps {
  category: WeaponCategoryType;
  weapons: Weapon[];
  isChecked: (weaponId: string) => boolean;
  onToggle: (weaponId: string) => void;
  checkedCount: number;
}

export function WeaponCategory({
  category,
  weapons,
  isChecked,
  onToggle,
  checkedCount,
}: WeaponCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const totalCount = weapons.length;
  const categoryLabel = CATEGORY_LABELS[category];

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-expanded={isExpanded}
        aria-label={`${categoryLabel}カテゴリを${isExpanded ? '折りたたむ' : '展開する'}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{isExpanded ? '▼' : '▶'}</span>
          <span className="font-bold text-lg">{categoryLabel}</span>
        </div>
        <span className="text-sm text-gray-600">
          ({checkedCount}/{totalCount})
        </span>
      </button>

      {isExpanded && (
        <div className="bg-white">
          {weapons.map((weapon) => (
            <WeaponItem
              key={weapon.id}
              weapon={weapon}
              checked={isChecked(weapon.id)}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
