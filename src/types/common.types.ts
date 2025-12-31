import { z } from 'zod';
import * as schemas from '@/schemas/common.schema';

/**
 * 共通型定義
 * Zodスキーマから型を推論して定義
 */

export type DateString = z.infer<typeof schemas.dateSchema>;
export type Id = z.infer<typeof schemas.idSchema>;
export type NumericId = z.infer<typeof schemas.numericIdSchema>;
export type NonEmptyString = z.infer<typeof schemas.nonEmptyStringSchema>;
export type Email = z.infer<typeof schemas.emailSchema>;
export type Url = z.infer<typeof schemas.urlSchema>;
export type Phone = z.infer<typeof schemas.phoneSchema>;
export type Pagination = z.infer<typeof schemas.paginationSchema>;
export type SortOrder = z.infer<typeof schemas.sortOrderSchema>;
export type TouchCoordinates = z.infer<typeof schemas.touchCoordinatesSchema>;
export type DeviceInfo = z.infer<typeof schemas.deviceInfoSchema>;

// API レスポンス型
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  timestamp: DateString;
};

export type ErrorResponse = z.infer<typeof schemas.errorResponseSchema>;

// ステータス型
export type Status = 'idle' | 'loading' | 'success' | 'error';

// フォーム状態
export type FormState<T> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
};
