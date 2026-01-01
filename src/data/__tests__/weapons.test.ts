import { describe, it, expect } from 'vitest';
import { WEAPONS, getWeaponsByCategory, TOTAL_WEAPONS } from '../weapons';
import { existsSync } from 'fs';
import { join } from 'path';

describe('WEAPONS データ検証', () => {
  it('武器数が70個である', () => {
    expect(WEAPONS).toHaveLength(70);
    expect(TOTAL_WEAPONS).toBe(70);
  });

  it('重複したIDが存在しない', () => {
    const ids = WEAPONS.map((weapon) => weapon.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('全ての武器にid, name, categoryが存在する', () => {
    WEAPONS.forEach((weapon) => {
      expect(weapon.id).toBeTruthy();
      expect(weapon.name).toBeTruthy();
      expect(weapon.category).toBeTruthy();
      expect(typeof weapon.id).toBe('string');
      expect(typeof weapon.name).toBe('string');
      expect(typeof weapon.category).toBe('string');
    });
  });

  it('全ての武器に有効なカテゴリが設定されている', () => {
    const validCategories = [
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
      'grizzco',
    ];

    WEAPONS.forEach((weapon) => {
      expect(validCategories).toContain(weapon.category);
    });
  });

  describe('カテゴリごとの武器数', () => {
    const expectedCounts = {
      shooter: 14,
      blaster: 6,
      roller: 5,
      brush: 3,
      charger: 6,
      slosher: 6,
      spinner: 6,
      maneuver: 6,
      shelter: 4,
      stringer: 3,
      wiper: 3,
      grizzco: 8,
    };

    Object.entries(expectedCounts).forEach(([category, expectedCount]) => {
      it(`${category}カテゴリの武器数が${expectedCount}個である`, () => {
        const weaponsInCategory = WEAPONS.filter((w) => w.category === category);
        expect(weaponsInCategory).toHaveLength(expectedCount);
      });
    });
  });

  describe('必須武器の存在チェック', () => {
    const requiredWeapons = [
      // シューター
      'wakaba-shooter',
      'splattershot',
      'promodeler-mg',
      'sharp-marker',
      'bold-marker',
      'n-zap85',
      '52gal',
      '96gal',
      'prime-shooter',
      'jet-sweeper',
      'space-shooter',
      'l3-reelgun',
      'h3-reelgun',
      'bottlegeyser',
      // ブラスター
      'hot-blaster',
      'nova-blaster',
      'clash-blaster',
      'rapid-blaster',
      'long-blaster',
      's-blast92',
      // ローラー
      'splat-roller',
      'carbon-roller',
      'dynamo-roller',
      'wide-roller',
      'variable-roller',
      // フデ
      'pablo',
      'hokusai',
      'fincent',
      // チャージャー
      'squiffer',
      'splat-charger',
      'eliter-4k',
      'soychooter',
      '14shiki-taketsutsutou',
      'r-pen-5h',
      // スロッシャー
      'bucketslosher',
      'hissen',
      'screw-slosher',
      'overflow-slosher',
      'explosher',
      'dread-wringer',
      // スピナー
      'barrel-spinner',
      'splatspinner',
      'hydra-splatling',
      'kugelschreiber',
      'nautilus',
      'heavy-edit-splatling',
      // マニューバー
      'splat-maneuver',
      'dual-sweeper',
      'kelvin525',
      'quad-hopper',
      'splattery',
      'guen-ff',
      // シェルター
      'parashelter',
      'campingshelter',
      '24shiki-harikae-gasa',
      'recycled-brella-24',
      // ストリンガー
      'tristringer',
      'lact-450',
      'wellstring-v',
      // ワイパー
      'drivewiper',
      'jimwiper',
      'mint-decavitator',
      // クマサン印
      'grizzco-blaster',
      'grizzco-charger',
      'grizzco-slosher',
      'grizzco-maneuver',
      'grizzco-roller',
      'grizzco-wiper',
      'grizzco-stringer',
      'grizzco-shelter',
    ];

    requiredWeapons.forEach((weaponId) => {
      it(`必須武器 ${weaponId} が存在する`, () => {
        const weapon = WEAPONS.find((w) => w.id === weaponId);
        expect(weapon).toBeDefined();
      });
    });

    it('必須武器リストと実際の武器数が一致する', () => {
      expect(requiredWeapons).toHaveLength(TOTAL_WEAPONS);
    });
  });

  describe('余分な武器の検出', () => {
    const allowedWeaponIds = [
      // シューター
      'wakaba-shooter',
      'splattershot',
      'promodeler-mg',
      'sharp-marker',
      'bold-marker',
      'n-zap85',
      '52gal',
      '96gal',
      'prime-shooter',
      'jet-sweeper',
      'space-shooter',
      'l3-reelgun',
      'h3-reelgun',
      'bottlegeyser',
      // ブラスター
      'hot-blaster',
      'nova-blaster',
      'clash-blaster',
      'rapid-blaster',
      'long-blaster',
      's-blast92',
      // ローラー
      'splat-roller',
      'carbon-roller',
      'dynamo-roller',
      'wide-roller',
      'variable-roller',
      // フデ
      'pablo',
      'hokusai',
      'fincent',
      // チャージャー
      'squiffer',
      'splat-charger',
      'eliter-4k',
      'soychooter',
      '14shiki-taketsutsutou',
      'r-pen-5h',
      // スロッシャー
      'bucketslosher',
      'hissen',
      'screw-slosher',
      'overflow-slosher',
      'explosher',
      'dread-wringer',
      // スピナー
      'barrel-spinner',
      'splatspinner',
      'hydra-splatling',
      'kugelschreiber',
      'nautilus',
      'heavy-edit-splatling',
      // マニューバー
      'splat-maneuver',
      'dual-sweeper',
      'kelvin525',
      'quad-hopper',
      'splattery',
      'guen-ff',
      // シェルター
      'parashelter',
      'campingshelter',
      '24shiki-harikae-gasa',
      'recycled-brella-24',
      // ストリンガー
      'tristringer',
      'lact-450',
      'wellstring-v',
      // ワイパー
      'drivewiper',
      'jimwiper',
      'mint-decavitator',
      // クマサン印
      'grizzco-blaster',
      'grizzco-charger',
      'grizzco-slosher',
      'grizzco-maneuver',
      'grizzco-roller',
      'grizzco-wiper',
      'grizzco-stringer',
      'grizzco-shelter',
    ];

    it('許可されていない武器が存在しない', () => {
      const extraWeapons = WEAPONS.filter(
        (weapon) => !allowedWeaponIds.includes(weapon.id)
      );
      expect(extraWeapons).toHaveLength(0);
      if (extraWeapons.length > 0) {
        console.error('余分な武器:', extraWeapons.map((w) => w.id));
      }
    });
  });

  describe('画像ファイルの存在チェック', () => {
    it('iconUrlが設定されている武器の画像ファイルが存在する', () => {
      const weaponsWithIcons = WEAPONS.filter((weapon) => weapon.iconUrl);

      weaponsWithIcons.forEach((weapon) => {
        if (weapon.iconUrl) {
          // public/配下のパスを実際のファイルシステムパスに変換
          const imagePath = join(
            process.cwd(),
            'public',
            weapon.iconUrl.replace('/images/', 'images/')
          );
          expect(
            existsSync(imagePath),
            `画像ファイルが存在しません: ${weapon.id} (${weapon.iconUrl})`
          ).toBe(true);
        }
      });
    });
  });

  describe('getWeaponsByCategory 関数', () => {
    it('カテゴリごとに武器を正しくグループ化する', () => {
      const grouped = getWeaponsByCategory();

      // 全カテゴリが存在することを確認
      expect(grouped.shooter).toBeDefined();
      expect(grouped.blaster).toBeDefined();
      expect(grouped.roller).toBeDefined();
      expect(grouped.brush).toBeDefined();
      expect(grouped.charger).toBeDefined();
      expect(grouped.slosher).toBeDefined();
      expect(grouped.spinner).toBeDefined();
      expect(grouped.maneuver).toBeDefined();
      expect(grouped.shelter).toBeDefined();
      expect(grouped.stringer).toBeDefined();
      expect(grouped.wiper).toBeDefined();
      expect(grouped.grizzco).toBeDefined();
    });

    it('グループ化された武器の合計数が元の武器数と一致する', () => {
      const grouped = getWeaponsByCategory();
      const totalGrouped = Object.values(grouped).reduce(
        (sum, weapons) => sum + weapons.length,
        0
      );
      expect(totalGrouped).toBe(TOTAL_WEAPONS);
    });
  });
});
