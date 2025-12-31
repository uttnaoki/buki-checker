import { z } from 'zod';
import * as schemas from '@/schemas/weapon.schema';

/**
 * 武器関連型定義
 */

export type WeaponCategory = z.infer<typeof schemas.weaponCategorySchema>;
export type Weapon = z.infer<typeof schemas.weaponSchema>;
export type WeaponCheckState = z.infer<typeof schemas.weaponCheckStateSchema>;
export type StorageData = z.infer<typeof schemas.storageDataSchema>;
export type FilterType = z.infer<typeof schemas.filterTypeSchema>;

// カテゴリの日本語表示名
export const CATEGORY_LABELS: Record<WeaponCategory, string> = {
  shooter: 'シューター',
  blaster: 'ブラスター',
  roller: 'ローラー',
  brush: 'フデ',
  charger: 'チャージャー',
  slosher: 'スロッシャー',
  spinner: 'スピナー',
  maneuver: 'マニューバー',
  shelter: 'シェルター',
  stringer: 'ストリンガー',
  wiper: 'ワイパー',
};

// ローカルストレージキー
export const STORAGE_KEY = 'splatoon3-weapon-checks' as const;
