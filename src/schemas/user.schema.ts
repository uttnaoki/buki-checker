import { z } from 'zod';
import { idSchema, emailSchema, phoneSchema, nonEmptyStringSchema } from './common.schema';

/**
 * ユーザー関連スキーマ（サンプル）
 * 仕様駆動開発の実践例
 */

// ユーザープロフィールスキーマ
export const userProfileSchema = z.object({
  id: idSchema,
  name: nonEmptyStringSchema.max(50, '名前は50文字以内で入力してください'),
  email: emailSchema,
  phone: phoneSchema.optional(),
  avatar: z.string().url().optional(),
  bio: z.string().max(200, '自己紹介は200文字以内で入力してください').optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// ユーザープロフィール更新スキーマ
export const updateUserProfileSchema = userProfileSchema.pick({
  name: true,
  phone: true,
  avatar: true,
  bio: true,
}).partial();

// ユーザー登録スキーマ
export const userRegistrationSchema = z.object({
  name: nonEmptyStringSchema.max(50, '名前は50文字以内で入力してください'),
  email: emailSchema,
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してください')
    .regex(/[A-Z]/, 'パスワードには大文字を含めてください')
    .regex(/[a-z]/, 'パスワードには小文字を含めてください')
    .regex(/[0-9]/, 'パスワードには数字を含めてください'),
  passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'パスワードが一致しません',
  path: ['passwordConfirmation'],
});
