import { z } from 'zod';

/**
 * 武器関連スキーマ
 */

// 武器カテゴリ
export const weaponCategorySchema = z.enum([
  'shooter',    // シューター
  'blaster',    // ブラスター
  'roller',     // ローラー
  'brush',      // フデ
  'charger',    // チャージャー
  'slosher',    // スロッシャー
  'spinner',    // スピナー
  'maneuver',   // マニューバー
  'shelter',    // シェルター
  'stringer',   // ストリンガー
  'wiper',      // ワイパー
]);

// 武器データ
export const weaponSchema = z.object({
  id: z.string().min(1, '武器IDは必須です'),
  name: z.string().min(1, '武器名は必須です'),
  category: weaponCategorySchema,
  iconUrl: z.string().url().optional(),
});

// 武器チェック状態
export const weaponCheckStateSchema = z.object({
  weaponId: z.string(),
  checked: z.boolean(),
  checkedAt: z.string().datetime().optional(),
});

// ローカルストレージデータ
export const storageDataSchema = z.object({
  version: z.string().default('1.0'),
  checks: z.record(z.string(), weaponCheckStateSchema),
  lastUpdated: z.string().datetime(),
});

// フィルター種別
export const filterTypeSchema = z.enum(['all', 'checked', 'unchecked']);
