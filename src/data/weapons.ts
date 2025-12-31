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
    id: 'sharp-marker',
    name: 'シャープマーカー',
    category: 'shooter',
  },
  {
    id: 'bold-marker',
    name: 'ボールドマーカー',
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
  {
    id: '96gal',
    name: '.96ガロン',
    category: 'shooter',
  },
  {
    id: 'prime-shooter',
    name: 'プライムシューター',
    category: 'shooter',
  },
  {
    id: 'jet-sweeper',
    name: 'ジェットスウィーパー',
    category: 'shooter',
  },
  {
    id: 'space-shooter',
    name: 'スペースシューター',
    category: 'shooter',
  },
  {
    id: 'l3-reelgun',
    name: 'L3リールガン',
    category: 'shooter',
  },
  {
    id: 'h3-reelgun',
    name: 'H3リールガン',
    category: 'shooter',
  },
  {
    id: 'bottlegeyser',
    name: 'ボトルガイザー',
    category: 'shooter',
  },
  {
    id: 'splattery',
    name: 'スパッタリー',
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
  {
    id: 'rapid-blaster',
    name: 'ラピッドブラスター',
    category: 'blaster',
  },
  {
    id: 'long-blaster',
    name: 'ロングブラスター',
    category: 'blaster',
  },
  {
    id: 's-blast92',
    name: 'S-BLAST92',
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
  {
    id: 'wide-roller',
    name: 'ワイドローラー',
    category: 'roller',
  },
  {
    id: 'variable-roller',
    name: 'バリアブルローラー',
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
  {
    id: 'fincent',
    name: 'フィンセント',
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
  {
    id: 'soychooter',
    name: 'ソイチューバー',
    category: 'charger',
  },
  {
    id: '14shiki-taketsutsutou',
    name: '14式竹筒銃',
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
  {
    id: 'screw-slosher',
    name: 'スクリュースロッシャー',
    category: 'slosher',
  },
  {
    id: 'overflow-slosher',
    name: 'オーバーフロッシャー',
    category: 'slosher',
  },
  {
    id: 'explosher',
    name: 'エクスプロッシャー',
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
  {
    id: 'hydra-splatling',
    name: 'ハイドラント',
    category: 'spinner',
  },
  {
    id: 'kugelschreiber',
    name: 'クーゲルシライバー',
    category: 'spinner',
  },
  {
    id: 'nautilus',
    name: 'ノーチラス',
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
  {
    id: 'kelvin525',
    name: 'ケルビン525',
    category: 'maneuver',
  },
  {
    id: 'quad-hopper',
    name: 'クアッドホッパー',
    category: 'maneuver',
  },
  {
    id: 'spy-gadget',
    name: 'スパイガジェット',
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
  {
    id: '24shiki-harikae-gasa',
    name: '24式張替傘',
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
