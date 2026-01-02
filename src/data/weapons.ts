import type { Weapon } from '@/types/weapon.types';

/**
 * スプラトゥーン3 サーモンラン 武器マスターデータ
 *
 * 順番はゲーム内部ID順に基づく
 * 参考: https://splatoonwiki.org/wiki/List_of_main_weapons_in_Splatoon_3
 */

export const WEAPONS: Weapon[] = [
  // シューター (ID: 0-90)
  {
    id: 'bold-marker',
    name: 'ボールドマーカー',
    category: 'shooter',
    iconUrl: '/images/weapons/bold-marker.png',
  },
  {
    id: 'wakaba-shooter',
    name: 'わかばシューター',
    category: 'shooter',
    iconUrl: '/images/weapons/wakaba-shooter.png',
  },
  {
    id: 'sharp-marker',
    name: 'シャープマーカー',
    category: 'shooter',
    iconUrl: '/images/weapons/sharp-marker.png',
  },
  {
    id: 'promodeler-mg',
    name: 'プロモデラーMG',
    category: 'shooter',
    iconUrl: '/images/weapons/promodeler-mg.png',
  },
  {
    id: 'splattershot',
    name: 'スプラシューター',
    category: 'shooter',
    iconUrl: '/images/weapons/splattershot.png',
  },
  {
    id: '52gal',
    name: '.52ガロン',
    category: 'shooter',
    iconUrl: '/images/weapons/52gal.png',
  },
  {
    id: 'n-zap85',
    name: 'N-ZAP85',
    category: 'shooter',
    iconUrl: '/images/weapons/n-zap85.png',
  },
  {
    id: 'prime-shooter',
    name: 'プライムシューター',
    category: 'shooter',
    iconUrl: '/images/weapons/prime-shooter.png',
  },
  {
    id: '96gal',
    name: '.96ガロン',
    category: 'shooter',
    iconUrl: '/images/weapons/96gal.png',
  },
  {
    id: 'jet-sweeper',
    name: 'ジェットスイーパー',
    category: 'shooter',
    iconUrl: '/images/weapons/jet-sweeper.png',
  },
  // スペースシューター (ID: 100)
  {
    id: 'space-shooter',
    name: 'スペースシューター',
    category: 'shooter',
    iconUrl: '/images/weapons/space-shooter.png',
  },
  // リールガン (ID: 300-310)
  {
    id: 'l3-reelgun',
    name: 'L3リールガン',
    category: 'shooter',
    iconUrl: '/images/weapons/l3-reelgun.png',
  },
  {
    id: 'h3-reelgun',
    name: 'H3リールガン',
    category: 'shooter',
    iconUrl: '/images/weapons/h3-reelgun.png',
  },
  // スクイーザー (ID: 400)
  {
    id: 'bottlegeyser',
    name: 'ボトルガイザー',
    category: 'shooter',
    iconUrl: '/images/weapons/bottlegeyser.png',
  },

  // ブラスター (ID: 200-260)
  {
    id: 'nova-blaster',
    name: 'ノヴァブラスター',
    category: 'blaster',
    iconUrl: '/images/weapons/nova-blaster.png',
  },
  {
    id: 'hot-blaster',
    name: 'ホットブラスター',
    category: 'blaster',
    iconUrl: '/images/weapons/hot-blaster.png',
  },
  {
    id: 'long-blaster',
    name: 'ロングブラスター',
    category: 'blaster',
    iconUrl: '/images/weapons/long-blaster.png',
  },
  {
    id: 'clash-blaster',
    name: 'クラッシュブラスター',
    category: 'blaster',
    iconUrl: '/images/weapons/clash-blaster.png',
  },
  {
    id: 'rapid-blaster',
    name: 'ラピッドブラスター',
    category: 'blaster',
    iconUrl: '/images/weapons/rapid-blaster.png',
  },
  {
    id: 'rapid-blaster-elite',
    name: 'Rブラスターエリート',
    category: 'blaster',
    iconUrl: '/images/weapons/rapid-blaster-elite.png',
  },
  {
    id: 's-blast92',
    name: 'S-BLAST92',
    category: 'blaster',
    iconUrl: '/images/weapons/s-blast92.png',
  },

  // ローラー (ID: 1000-1040)
  {
    id: 'carbon-roller',
    name: 'カーボンローラー',
    category: 'roller',
    iconUrl: '/images/weapons/carbon-roller.png',
  },
  {
    id: 'splat-roller',
    name: 'スプラローラー',
    category: 'roller',
    iconUrl: '/images/weapons/splat-roller.png',
  },
  {
    id: 'dynamo-roller',
    name: 'ダイナモローラー',
    category: 'roller',
    iconUrl: '/images/weapons/dynamo-roller.png',
  },
  {
    id: 'variable-roller',
    name: 'ヴァリアブルローラー',
    category: 'roller',
    iconUrl: '/images/weapons/variable-roller.png',
  },
  {
    id: 'wide-roller',
    name: 'ワイドローラー',
    category: 'roller',
    iconUrl: '/images/weapons/wide-roller.png',
  },

  // フデ (ID: 1100-1120)
  {
    id: 'pablo',
    name: 'パブロ',
    category: 'brush',
    iconUrl: '/images/weapons/pablo.png',
  },
  {
    id: 'hokusai',
    name: 'ホクサイ',
    category: 'brush',
    iconUrl: '/images/weapons/hokusai.png',
  },
  {
    id: 'fincent',
    name: 'フィンセント',
    category: 'brush',
    iconUrl: '/images/weapons/fincent.png',
  },

  // チャージャー (ID: 2000-2060, スコープ除く)
  {
    id: 'squiffer',
    name: 'スクイックリン',
    category: 'charger',
    iconUrl: '/images/weapons/squiffer.png',
  },
  {
    id: 'splat-charger',
    name: 'スプラチャージャー',
    category: 'charger',
    iconUrl: '/images/weapons/splat-charger.png',
  },
  {
    id: 'eliter-4k',
    name: 'リッター4K',
    category: 'charger',
    iconUrl: '/images/weapons/eliter-4k.png',
  },
  {
    id: '14shiki-taketsutsutou',
    name: '14式竹筒銃',
    category: 'charger',
    iconUrl: '/images/weapons/14shiki-taketsutsutou.png',
  },
  {
    id: 'soychooter',
    name: 'ソイチューバー',
    category: 'charger',
    iconUrl: '/images/weapons/soychooter.png',
  },
  {
    id: 'r-pen-5h',
    name: 'R-PEN/5H',
    category: 'charger',
    iconUrl: '/images/weapons/r-pen-5h.png',
  },

  // スロッシャー (ID: 3000-3050)
  {
    id: 'bucketslosher',
    name: 'バケットスロッシャー',
    category: 'slosher',
    iconUrl: '/images/weapons/bucketslosher.png',
  },
  {
    id: 'hissen',
    name: 'ヒッセン',
    category: 'slosher',
    iconUrl: '/images/weapons/hissen.png',
  },
  {
    id: 'screw-slosher',
    name: 'スクリュースロッシャー',
    category: 'slosher',
    iconUrl: '/images/weapons/screw-slosher.png',
  },
  {
    id: 'overflow-slosher',
    name: 'オーバーフロッシャー',
    category: 'slosher',
    iconUrl: '/images/weapons/overflow-slosher.png',
  },
  {
    id: 'explosher',
    name: 'エクスプロッシャー',
    category: 'slosher',
    iconUrl: '/images/weapons/explosher.png',
  },
  {
    id: 'dread-wringer',
    name: 'モップリン',
    category: 'slosher',
    iconUrl: '/images/weapons/dread-wringer.png',
  },

  // スピナー (ID: 4000-4050)
  {
    id: 'splatspinner',
    name: 'スプラスピナー',
    category: 'spinner',
    iconUrl: '/images/weapons/splatspinner.png',
  },
  {
    id: 'barrel-spinner',
    name: 'バレルスピナー',
    category: 'spinner',
    iconUrl: '/images/weapons/barrel-spinner.png',
  },
  {
    id: 'hydra-splatling',
    name: 'ハイドラント',
    category: 'spinner',
    iconUrl: '/images/weapons/hydra-splatling.png',
  },
  {
    id: 'kugelschreiber',
    name: 'クーゲルシュライバー',
    category: 'spinner',
    iconUrl: '/images/weapons/kugelschreiber.png',
  },
  {
    id: 'nautilus',
    name: 'ノーチラス47',
    category: 'spinner',
    iconUrl: '/images/weapons/nautilus.png',
  },
  {
    id: 'heavy-edit-splatling',
    name: 'イグザミナー',
    category: 'spinner',
    iconUrl: '/images/weapons/heavy-edit-splatling.png',
  },

  // マニューバー (ID: 5000-5050)
  {
    id: 'splattery',
    name: 'スパッタリー',
    category: 'maneuver',
    iconUrl: '/images/weapons/splattery.png',
  },
  {
    id: 'splat-maneuver',
    name: 'スプラマニューバー',
    category: 'maneuver',
    iconUrl: '/images/weapons/splat-maneuver.png',
  },
  {
    id: 'kelvin525',
    name: 'ケルビン525',
    category: 'maneuver',
    iconUrl: '/images/weapons/kelvin525.png',
  },
  {
    id: 'dual-sweeper',
    name: 'デュアルスイーパー',
    category: 'maneuver',
    iconUrl: '/images/weapons/dual-sweeper.png',
  },
  {
    id: 'quad-hopper',
    name: 'クアッドホッパーブラック',
    category: 'maneuver',
    iconUrl: '/images/weapons/quad-hopper.png',
  },
  {
    id: 'guen-ff',
    name: 'ガエンFF',
    category: 'maneuver',
    iconUrl: '/images/weapons/guen-ff.png',
  },

  // シェルター (ID: 6000-6030)
  {
    id: 'parashelter',
    name: 'パラシェルター',
    category: 'shelter',
    iconUrl: '/images/weapons/parashelter.png',
  },
  {
    id: 'campingshelter',
    name: 'キャンピングシェルター',
    category: 'shelter',
    iconUrl: '/images/weapons/campingshelter.png',
  },
  {
    id: 'spy-gadget',
    name: 'スパイガジェット',
    category: 'shelter',
    iconUrl: '/images/weapons/spy-gadget.png',
  },
  {
    id: 'recycled-brella-24',
    name: '24式張替傘',
    category: 'shelter',
    iconUrl: '/images/weapons/recycled-brella-24.png',
  },

  // ストリンガー (ID: 7010-7030)
  {
    id: 'tristringer',
    name: 'トライストリンガー',
    category: 'stringer',
    iconUrl: '/images/weapons/tristringer.png',
  },
  {
    id: 'lact-450',
    name: 'LACT-450',
    category: 'stringer',
    iconUrl: '/images/weapons/lact-450.png',
  },
  {
    id: 'wellstring-v',
    name: 'フルイドV',
    category: 'stringer',
    iconUrl: '/images/weapons/wellstring-v.png',
  },

  // ワイパー (ID: 8000-8020)
  {
    id: 'drivewiper',
    name: 'ドライブワイパー',
    category: 'wiper',
    iconUrl: '/images/weapons/drivewiper.png',
  },
  {
    id: 'jimwiper',
    name: 'ジムワイパー',
    category: 'wiper',
    iconUrl: '/images/weapons/jimwiper.png',
  },
  {
    id: 'mint-decavitator',
    name: 'デンタルワイパーミント',
    category: 'wiper',
    iconUrl: '/images/weapons/mint-decavitator.png',
  },

  // クマサン印（サーモンラン専用武器）
  {
    id: 'grizzco-blaster',
    name: 'クマサン印のブラスター',
    category: 'grizzco',
    iconUrl: '/images/weapons/grizzco-blaster.png',
  },
  {
    id: 'grizzco-charger',
    name: 'クマサン印のチャージャー',
    category: 'grizzco',
    iconUrl: '/images/weapons/grizzco-charger.png',
  },
  {
    id: 'grizzco-slosher',
    name: 'クマサン印のスロッシャー',
    category: 'grizzco',
    iconUrl: '/images/weapons/grizzco-slosher.png',
  },
  {
    id: 'grizzco-maneuver',
    name: 'クマサン印のマニューバー',
    category: 'grizzco',
    iconUrl: '/images/weapons/grizzco-maneuver.png',
  },
  {
    id: 'grizzco-roller',
    name: 'クマサン印のローラー',
    category: 'grizzco',
    iconUrl: '/images/weapons/grizzco-roller.png',
  },
  {
    id: 'grizzco-wiper',
    name: 'クマサン印のワイパー',
    category: 'grizzco',
    iconUrl: '/images/weapons/grizzco-wiper.png',
  },
  {
    id: 'grizzco-stringer',
    name: 'クマサン印のストリンガー',
    category: 'grizzco',
    iconUrl: '/images/weapons/grizzco-stringer.png',
  },
  {
    id: 'grizzco-shelter',
    name: 'クマサン印のシェルター',
    category: 'grizzco',
    iconUrl: '/images/weapons/grizzco-shelter.png',
  },
];

// カテゴリごとに武器を取得
export function getWeaponsByCategory() {
  const grouped = WEAPONS.reduce(
    (acc, weapon) => {
      if (!acc[weapon.category]) {
        acc[weapon.category] = [];
      }
      acc[weapon.category].push(weapon);
      return acc;
    },
    {} as Record<string, Weapon[]>
  );

  return grouped;
}

// 武器の総数
export const TOTAL_WEAPONS = WEAPONS.length;
