import { describe, it, expect } from 'vitest';
import {
  weaponCategorySchema,
  weaponSchema,
  weaponCheckStateSchema,
  storageDataSchema,
  filterTypeSchema,
} from '../weapon.schema';

describe('weaponCategorySchema', () => {
  it('有効なカテゴリを検証できる', () => {
    const categories = [
      'shooter',
      'blaster',
      'roller',
      'brush',
      'charger',
      'slosher',
      'spinner',
      'maneuver',
      'shelter',
      'stringer',
      'wiper',
    ];

    categories.forEach((category) => {
      const result = weaponCategorySchema.safeParse(category);
      expect(result.success).toBe(true);
    });
  });

  it('無効なカテゴリでエラーになる', () => {
    const result = weaponCategorySchema.safeParse('invalid-category');
    expect(result.success).toBe(false);
  });
});

describe('weaponSchema', () => {
  it('有効な武器データを検証できる', () => {
    const validWeapon = {
      id: 'wakaba-shooter',
      name: 'わかばシューター',
      category: 'shooter',
    };

    const result = weaponSchema.safeParse(validWeapon);
    expect(result.success).toBe(true);
  });

  it('アイコンURLは任意項目である', () => {
    const weaponWithoutIcon = {
      id: 'wakaba-shooter',
      name: 'わかばシューター',
      category: 'shooter',
    };

    const result = weaponSchema.safeParse(weaponWithoutIcon);
    expect(result.success).toBe(true);
  });

  it('アイコンURLがある場合はURL形式を検証する', () => {
    const weaponWithIcon = {
      id: 'wakaba-shooter',
      name: 'わかばシューター',
      category: 'shooter',
      iconUrl: 'https://example.com/icon.png',
    };

    const result = weaponSchema.safeParse(weaponWithIcon);
    expect(result.success).toBe(true);
  });

  it('IDが空の場合エラーになる', () => {
    const invalidWeapon = {
      id: '',
      name: 'わかばシューター',
      category: 'shooter',
    };

    const result = weaponSchema.safeParse(invalidWeapon);
    expect(result.success).toBe(false);
  });

  it('名前が空の場合エラーになる', () => {
    const invalidWeapon = {
      id: 'wakaba-shooter',
      name: '',
      category: 'shooter',
    };

    const result = weaponSchema.safeParse(invalidWeapon);
    expect(result.success).toBe(false);
  });
});

describe('weaponCheckStateSchema', () => {
  it('有効なチェック状態を検証できる', () => {
    const validCheckState = {
      weaponId: 'wakaba-shooter',
      checked: true,
      checkedAt: '2025-12-31T00:00:00Z',
    };

    const result = weaponCheckStateSchema.safeParse(validCheckState);
    expect(result.success).toBe(true);
  });

  it('checkedAtは任意項目である', () => {
    const checkStateWithoutDate = {
      weaponId: 'wakaba-shooter',
      checked: false,
    };

    const result = weaponCheckStateSchema.safeParse(checkStateWithoutDate);
    expect(result.success).toBe(true);
  });

  it('checkedAtが不正な日時形式の場合エラーになる', () => {
    const invalidCheckState = {
      weaponId: 'wakaba-shooter',
      checked: true,
      checkedAt: 'invalid-date',
    };

    const result = weaponCheckStateSchema.safeParse(invalidCheckState);
    expect(result.success).toBe(false);
  });
});

describe('storageDataSchema', () => {
  it('有効なストレージデータを検証できる', () => {
    const validStorageData = {
      version: '1.0',
      checks: {
        'wakaba-shooter': {
          weaponId: 'wakaba-shooter',
          checked: true,
          checkedAt: '2025-12-31T00:00:00Z',
        },
      },
      lastUpdated: '2025-12-31T00:00:00Z',
    };

    const result = storageDataSchema.safeParse(validStorageData);
    expect(result.success).toBe(true);
  });

  it('checksが空オブジェクトでも有効', () => {
    const emptyStorageData = {
      version: '1.0',
      checks: {},
      lastUpdated: '2025-12-31T00:00:00Z',
    };

    const result = storageDataSchema.safeParse(emptyStorageData);
    expect(result.success).toBe(true);
  });
});

describe('filterTypeSchema', () => {
  it('有効なフィルタータイプを検証できる', () => {
    const types = ['all', 'checked', 'unchecked'];

    types.forEach((type) => {
      const result = filterTypeSchema.safeParse(type);
      expect(result.success).toBe(true);
    });
  });

  it('無効なフィルタータイプでエラーになる', () => {
    const result = filterTypeSchema.safeParse('invalid');
    expect(result.success).toBe(false);
  });
});
