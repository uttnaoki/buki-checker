import { z } from 'zod';
import * as schemas from '@/schemas/user.schema';

/**
 * ユーザー関連型定義（サンプル）
 * Zodスキーマから型を推論
 */

export type UserProfile = z.infer<typeof schemas.userProfileSchema>;
export type UpdateUserProfile = z.infer<typeof schemas.updateUserProfileSchema>;
export type UserRegistration = z.infer<typeof schemas.userRegistrationSchema>;
