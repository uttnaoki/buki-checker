import type { Weapon } from '@/types/weapon.types';

import { SHOOTERS } from './shooters';
import { ROLLERS } from './rollers';
import { CHARGERS } from './chargers';
import { SLOSHERS } from './sloshers';
import { SPINNERS } from './spinners';
import { MANEUVERS } from './maneuvers';
import { SHELTERS } from './shelters';
import { BLASTERS } from './blasters';
import { BRUSHES } from './brushes';
import { STRINGERS } from './stringers';
import { WIPERS } from './wipers';
import { GRIZZCO_WEAPONS } from './grizzco';

// Re-export all category arrays
export {
  SHOOTERS,
  ROLLERS,
  CHARGERS,
  SLOSHERS,
  SPINNERS,
  MANEUVERS,
  SHELTERS,
  BLASTERS,
  BRUSHES,
  STRINGERS,
  WIPERS,
  GRIZZCO_WEAPONS,
};

// カテゴリ順（ゲーム内タブ順）
export const CATEGORY_ORDER = [
  'shooter',
  'roller',
  'charger',
  'slosher',
  'spinner',
  'maneuver',
  'shelter',
  'blaster',
  'brush',
  'stringer',
  'wiper',
  'grizzco',
] as const;

export type WeaponCategory = (typeof CATEGORY_ORDER)[number];

// カテゴリと武器配列のマッピング
export const WEAPONS_BY_CATEGORY: Record<WeaponCategory, Weapon[]> = {
  shooter: SHOOTERS,
  roller: ROLLERS,
  charger: CHARGERS,
  slosher: SLOSHERS,
  spinner: SPINNERS,
  maneuver: MANEUVERS,
  shelter: SHELTERS,
  blaster: BLASTERS,
  brush: BRUSHES,
  stringer: STRINGERS,
  wiper: WIPERS,
  grizzco: GRIZZCO_WEAPONS,
};

// 全武器配列（タブ順）
export const WEAPONS: Weapon[] = CATEGORY_ORDER.flatMap(
  (category) => WEAPONS_BY_CATEGORY[category]
);

// カテゴリごとに武器を取得
export function getWeaponsByCategory() {
  return WEAPONS_BY_CATEGORY;
}

// 武器の総数
export const TOTAL_WEAPONS = WEAPONS.length;
