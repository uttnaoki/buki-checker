import { describe, it, expect } from 'vitest';
import {
  userProfileSchema,
  updateUserProfileSchema,
  userRegistrationSchema,
} from '../user.schema';

/**
 * ユーザースキーマのテスト
 * 仕様駆動開発における仕様の検証
 */

describe('userProfileSchema', () => {
  it('有効なユーザープロフィールを検証できる', () => {
    const validProfile = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: '山田太郎',
      email: 'yamada@example.com',
      phone: '090-1234-5678',
      avatar: 'https://example.com/avatar.jpg',
      bio: 'こんにちは',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    };

    const result = userProfileSchema.safeParse(validProfile);
    expect(result.success).toBe(true);
  });

  it('名前が空の場合エラーになる', () => {
    const invalidProfile = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: '',
      email: 'yamada@example.com',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    };

    const result = userProfileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
  });

  it('名前が51文字以上の場合エラーになる', () => {
    const invalidProfile = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'あ'.repeat(51),
      email: 'yamada@example.com',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    };

    const result = userProfileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('名前は50文字以内で入力してください');
    }
  });

  it('メールアドレスの形式が不正な場合エラーになる', () => {
    const invalidProfile = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: '山田太郎',
      email: 'invalid-email',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    };

    const result = userProfileSchema.safeParse(invalidProfile);
    expect(result.success).toBe(false);
  });

  it('電話番号は任意項目である', () => {
    const validProfile = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: '山田太郎',
      email: 'yamada@example.com',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    };

    const result = userProfileSchema.safeParse(validProfile);
    expect(result.success).toBe(true);
  });
});

describe('updateUserProfileSchema', () => {
  it('すべてのフィールドが任意である', () => {
    const emptyUpdate = {};
    const result = updateUserProfileSchema.safeParse(emptyUpdate);
    expect(result.success).toBe(true);
  });

  it('名前のみ更新できる', () => {
    const partialUpdate = {
      name: '田中花子',
    };

    const result = updateUserProfileSchema.safeParse(partialUpdate);
    expect(result.success).toBe(true);
  });

  it('自己紹介が201文字以上の場合エラーになる', () => {
    const invalidUpdate = {
      bio: 'あ'.repeat(201),
    };

    const result = updateUserProfileSchema.safeParse(invalidUpdate);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('自己紹介は200文字以内で入力してください');
    }
  });
});

describe('userRegistrationSchema', () => {
  it('有効な登録情報を検証できる', () => {
    const validRegistration = {
      name: '山田太郎',
      email: 'yamada@example.com',
      password: 'Password123',
      passwordConfirmation: 'Password123',
    };

    const result = userRegistrationSchema.safeParse(validRegistration);
    expect(result.success).toBe(true);
  });

  it('パスワードが8文字未満の場合エラーになる', () => {
    const invalidRegistration = {
      name: '山田太郎',
      email: 'yamada@example.com',
      password: 'Pass1',
      passwordConfirmation: 'Pass1',
    };

    const result = userRegistrationSchema.safeParse(invalidRegistration);
    expect(result.success).toBe(false);
  });

  it('パスワードに大文字が含まれていない場合エラーになる', () => {
    const invalidRegistration = {
      name: '山田太郎',
      email: 'yamada@example.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    };

    const result = userRegistrationSchema.safeParse(invalidRegistration);
    expect(result.success).toBe(false);
  });

  it('パスワードに小文字が含まれていない場合エラーになる', () => {
    const invalidRegistration = {
      name: '山田太郎',
      email: 'yamada@example.com',
      password: 'PASSWORD123',
      passwordConfirmation: 'PASSWORD123',
    };

    const result = userRegistrationSchema.safeParse(invalidRegistration);
    expect(result.success).toBe(false);
  });

  it('パスワードに数字が含まれていない場合エラーになる', () => {
    const invalidRegistration = {
      name: '山田太郎',
      email: 'yamada@example.com',
      password: 'PasswordABC',
      passwordConfirmation: 'PasswordABC',
    };

    const result = userRegistrationSchema.safeParse(invalidRegistration);
    expect(result.success).toBe(false);
  });

  it('パスワードと確認用パスワードが一致しない場合エラーになる', () => {
    const invalidRegistration = {
      name: '山田太郎',
      email: 'yamada@example.com',
      password: 'Password123',
      passwordConfirmation: 'DifferentPass123',
    };

    const result = userRegistrationSchema.safeParse(invalidRegistration);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('パスワードが一致しません');
    }
  });
});
