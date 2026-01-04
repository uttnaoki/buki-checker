import type { Weapon } from '@/types/weapon.types';

/**
 * ========================================
 * 重要: 武器のindexは絶対に変更しないこと
 * ========================================
 *
 * 各武器のindexはlocalStorageとシェアURLのエンコードに使用されています。
 * indexを変更すると、ユーザーの保存データが壊れます。
 *
 * 新しい武器を追加する場合:
 * - 既存の武器のindexは変更しない
 * - 新しい武器には次の連番(71, 72, ...)を割り当てる
 *
 * 武器を削除する場合:
 * - そのindexは欠番として残す（再利用しない）
 */

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

// タブ順
export const CATEGORY_TAB_ORDER: WeaponCategory[] = [
  'grizzco',
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
] as const;

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
export const getWeaponsByCategory = () => {
  return WEAPONS_BY_CATEGORY;
};

// 武器の総数
export const TOTAL_WEAPONS = WEAPONS.length;

// index → 武器 のマッピング
export const WEAPON_BY_INDEX = new Map<number, Weapon>(
  WEAPONS.map((weapon) => [weapon.index, weapon])
);

// id → 武器 のマッピング
export const WEAPON_BY_ID = new Map<string, Weapon>(
  WEAPONS.map((weapon) => [weapon.id, weapon])
);

// index → id
export const getWeaponIdByIndex = (index: number): string | undefined => {
  return WEAPON_BY_INDEX.get(index)?.id;
};

// id → index
export const getWeaponIndexById = (id: string): number | undefined => {
  return WEAPON_BY_ID.get(id)?.index;
};
