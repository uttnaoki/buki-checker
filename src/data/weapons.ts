import type { Weapon } from '@/types/weapon.types';

/**
 * スプラトゥーン3 武器マスターデータ
 *
 * Note: 現在は各カテゴリの代表的な武器のみ登録
 * TODO: 全武器を追加する
 */

export const WEAPONS: Weapon[] = [
  // シューター
  {
    id: 'wakaba-shooter',
    name: 'わかばシューター',
    category: 'shooter',
  },
  {
    id: 'splattershot',
    name: 'スプラシューター',
    category: 'shooter',
  },
  {
    id: 'promodeler-mg',
    name: 'プロモデラーMG',
    category: 'shooter',
  },
  {
    id: 'n-zap85',
    name: 'N-ZAP85',
    category: 'shooter',
  },
  {
    id: '52gal',
    name: '.52ガロン',
    category: 'shooter',
  },

  // ブラスター
  {
    id: 'hot-blaster',
    name: 'ホットブラスター',
    category: 'blaster',
  },
  {
    id: 'nova-blaster',
    name: 'ノヴァブラスター',
    category: 'blaster',
  },
  {
    id: 'clash-blaster',
    name: 'クラッシュブラスター',
    category: 'blaster',
  },

  // ローラー
  {
    id: 'splat-roller',
    name: 'スプラローラー',
    category: 'roller',
  },
  {
    id: 'carbon-roller',
    name: 'カーボンローラー',
    category: 'roller',
  },
  {
    id: 'dynamo-roller',
    name: 'ダイナモローラー',
    category: 'roller',
  },

  // フデ
  {
    id: 'pablo',
    name: 'パブロ',
    category: 'brush',
  },
  {
    id: 'hokusai',
    name: 'ホクサイ',
    category: 'brush',
  },

  // チャージャー
  {
    id: 'squiffer',
    name: 'スクイックリン',
    category: 'charger',
  },
  {
    id: 'splat-charger',
    name: 'スプラチャージャー',
    category: 'charger',
  },
  {
    id: 'eliter-4k',
    name: 'リッター4K',
    category: 'charger',
  },

  // スロッシャー
  {
    id: 'bucketslosher',
    name: 'バケットスロッシャー',
    category: 'slosher',
  },
  {
    id: 'hissen',
    name: 'ヒッセン',
    category: 'slosher',
  },

  // スピナー
  {
    id: 'barrel-spinner',
    name: 'バレルスピナー',
    category: 'spinner',
  },
  {
    id: 'splatspinner',
    name: 'スプラスピナー',
    category: 'spinner',
  },

  // マニューバー
  {
    id: 'splat-maneuver',
    name: 'スプラマニューバー',
    category: 'maneuver',
  },
  {
    id: 'dual-sweeper',
    name: 'デュアルスイーパー',
    category: 'maneuver',
  },

  // シェルター
  {
    id: 'parashelter',
    name: 'パラシェルター',
    category: 'shelter',
  },
  {
    id: 'campingshelter',
    name: 'キャンピングシェルター',
    category: 'shelter',
  },

  // ストリンガー
  {
    id: 'tristringer',
    name: 'トライストリンガー',
    category: 'stringer',
  },
  {
    id: 'lact-450',
    name: 'LACT-450',
    category: 'stringer',
  },

  // ワイパー
  {
    id: 'drivewiper',
    name: 'ドライブワイパー',
    category: 'wiper',
  },
  {
    id: 'jimwiper',
    name: 'ジムワイパー',
    category: 'wiper',
  },

  // クマサン印（サーモンラン専用武器）
  {
    id: 'grizzco-blaster',
    name: 'クマサン印のブラスター',
    category: 'grizzco',
  },
  {
    id: 'grizzco-charger',
    name: 'クマサン印のチャージャー',
    category: 'grizzco',
  },
  {
    id: 'grizzco-slosher',
    name: 'クマサン印のスロッシャー',
    category: 'grizzco',
  },
  {
    id: 'grizzco-maneuver',
    name: 'クマサン印のマニューバー',
    category: 'grizzco',
  },
  {
    id: 'grizzco-roller',
    name: 'クマサン印のローラー',
    category: 'grizzco',
  },
  {
    id: 'grizzco-wiper',
    name: 'クマサン印のワイパー',
    category: 'grizzco',
  },
  {
    id: 'grizzco-stringer',
    name: 'クマサン印のストリンガー',
    category: 'grizzco',
  },
  {
    id: 'grizzco-shelter',
    name: 'クマサン印のシェルター',
    category: 'grizzco',
  },
  {
    id: 'grizzco-spinner',
    name: 'クマサン印のスピナー',
    category: 'grizzco',
  },
];

// カテゴリごとに武器を取得
export function getWeaponsByCategory() {
  const grouped = WEAPONS.reduce((acc, weapon) => {
    if (!acc[weapon.category]) {
      acc[weapon.category] = [];
    }
    acc[weapon.category].push(weapon);
    return acc;
  }, {} as Record<string, Weapon[]>);

  return grouped;
}

// 武器の総数
export const TOTAL_WEAPONS = WEAPONS.length;
