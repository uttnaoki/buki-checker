'use client';

import type { Weapon } from '@/types/weapon.types';

interface WeaponItemProps {
  weapon: Weapon;
  checked: boolean;
  onToggle: (weaponId: string) => void;
}

export function WeaponItem({ weapon, checked, onToggle }: WeaponItemProps) {
  return (
    <button
      onClick={() => onToggle(weapon.id)}
      className={`
        relative aspect-square flex flex-col items-center justify-center p-3
        rounded-lg border-2 transition-all duration-200
        active:scale-95
        ${
          checked
            ? 'bg-green-50 border-green-600'
            : 'bg-white border-gray-300 hover:border-gray-400'
        }
      `}
      aria-label={`${weapon.name}を${checked ? '未チェック' : 'チェック'}にする`}
    >
      {/* チェックマーク */}
      {checked && (
        <div className="absolute top-1 right-1 text-green-600 text-xl">☑</div>
      )}

      {/* 武器名 */}
      <span
        className={`
          text-xs text-center leading-tight line-clamp-3
          ${checked ? 'text-gray-600' : 'text-gray-900'}
        `}
      >
        {weapon.name}
      </span>
    </button>
  );
}
