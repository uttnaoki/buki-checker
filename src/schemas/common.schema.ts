import { z } from 'zod';

/**
 * 共通スキーマ定義
 * 仕様駆動開発のベースとなるスキーマを定義
 */

// 日付スキーマ
export const dateSchema = z.string().datetime();

// ID系スキーマ
export const idSchema = z.string().uuid();
export const numericIdSchema = z.number().int().positive();

// 文字列系スキーマ
export const nonEmptyStringSchema = z.string().min(1, '入力は必須です');
export const emailSchema = z.string().email('正しいメールアドレスを入力してください');
export const urlSchema = z.string().url('正しいURLを入力してください');

// 電話番号（日本の携帯電話）
export const phoneSchema = z
  .string()
  .regex(/^0[789]0-?\d{4}-?\d{4}$/, '正しい電話番号を入力してください');

// ページネーション
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

// ソート
export const sortOrderSchema = z.enum(['asc', 'desc']);

// レスポンス共通
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    message: z.string().optional(),
    timestamp: dateSchema,
  });

// エラーレスポンス
export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
  }),
  timestamp: dateSchema,
});

// タッチイベント座標（モバイル向け）
export const touchCoordinatesSchema = z.object({
  x: z.number(),
  y: z.number(),
});

// デバイス情報
export const deviceInfoSchema = z.object({
  userAgent: z.string(),
  screenWidth: z.number().int().positive(),
  screenHeight: z.number().int().positive(),
  devicePixelRatio: z.number().positive(),
});
