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
        w-full flex items-center gap-3 p-4
        transition-colors duration-200
        border-b border-gray-200
        active:bg-gray-100
        ${checked ? 'bg-green-50' : 'bg-white'}
      `}
      aria-label={`${weapon.name}を${checked ? '未チェック' : 'チェック'}にする`}
    >
      <span className="text-2xl flex-shrink-0">
        {checked ? '☑' : '□'}
      </span>
      <span
        className={`
          text-left flex-1 text-base
          ${checked ? 'text-gray-600' : 'text-gray-900'}
        `}
      >
        {weapon.name}
      </span>
    </button>
  );
}
