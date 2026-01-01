// 武器アイコン一括ダウンロードスクリプト
const https = require('https');
const fs = require('fs');
const path = require('path');

// 武器ID -> Inkipedia英語名のマッピング
const weaponMapping = {
  // シューター
  'wakaba-shooter': 'Splattershot Jr.',
  'splattershot': 'Splattershot',
  'promodeler-mg': 'Aerospray MG',
  'sharp-marker': 'Splash-o-matic',
  'bold-marker': 'Sploosh-o-matic',
  'n-zap85': 'N-ZAP \'85',
  '52gal': '.52 Gal',
  '96gal': '.96 Gal',
  'prime-shooter': 'Splattershot Pro',
  'jet-sweeper': 'Jet Squelcher',
  'space-shooter': 'Squeezer',
  'l3-reelgun': 'L-3 Nozzlenose',
  'h3-reelgun': 'H-3 Nozzlenose',
  'bottlegeyser': 'Squeezer',
  'splattery': 'Dapple Dualies',

  // ブラスター
  'hot-blaster': 'Blaster',
  'nova-blaster': 'Luna Blaster',
  'clash-blaster': 'Clash Blaster',
  'rapid-blaster': 'Rapid Blaster',
  'long-blaster': 'Range Blaster',
  's-blast92': 'S-BLAST \'92',

  // ローラー
  'splat-roller': 'Splat Roller',
  'carbon-roller': 'Carbon Roller',
  'dynamo-roller': 'Dynamo Roller',
  'wide-roller': 'Flingza Roller',
  'variable-roller': 'Big Swig Roller',

  // フデ
  'pablo': 'Inkbrush',
  'hokusai': 'Octobrush',
  'fincent': 'Painbrush',

  // チャージャー
  'squiffer': 'Classic Squiffer',
  'splat-charger': 'Splat Charger',
  'eliter-4k': 'E-liter 4K',
  'soychooter': 'Goo Tuber',
  '14shiki-taketsutsutou': 'Bamboozler 14 Mk I',

  // スロッシャー
  'bucketslosher': 'Slosher',
  'hissen': 'Tri-Slosher',
  'screw-slosher': 'Sloshing Machine',
  'overflow-slosher': 'Bloblobber',
  'explosher': 'Explosher',

  // スピナー
  'barrel-spinner': 'Heavy Splatling',
  'splatspinner': 'Mini Splatling',
  'hydra-splatling': 'Hydra Splatling',
  'kugelschreiber': 'Ballpoint Splatling',
  'nautilus': 'Nautilus 47',

  // マニューバー
  'splat-maneuver': 'Splat Dualies',
  'dual-sweeper': 'Dualie Squelchers',
  'kelvin525': 'Glooga Dualies',
  'quad-hopper': 'Dark Tetra Dualies',
  'spy-gadget': 'Douser Dualies FF',

  // シェルター
  'parashelter': 'Splat Brella',
  'campingshelter': 'Tenta Brella',
  '24shiki-harikae-gasa': 'Undercover Brella',

  // ストリンガー
  'tristringer': 'Tri-Stringer',
  'lact-450': 'REEF-LUX 450',

  // ワイパー
  'drivewiper': 'Splatana Wiper',
  'jimwiper': 'Splatana Stamper',

  // クマサン印
  'grizzco-blaster': 'Grizzco Blaster',
  'grizzco-charger': 'Grizzco Charger',
  'grizzco-slosher': 'Grizzco Slosher',
  'grizzco-maneuver': 'Grizzco Dualies',
  'grizzco-roller': 'Grizzco Roller',
  'grizzco-wiper': 'Grizzco Splatana',
  'grizzco-stringer': 'Grizzco Stringer',
  'grizzco-shelter': 'Grizzco Brella',
  'grizzco-spinner': 'Grizzco Splatling',
};

// 既知のURLマッピング（CDNハッシュ付き）
const knownUrls = {
  'wakaba-shooter': 'https://cdn.wikimg.net/en/splatoonwiki/images/1/1e/S3_Weapon_Main_Splattershot_Jr..png',
  'hot-blaster': 'https://cdn.wikimg.net/en/splatoonwiki/images/a/a7/S3_Weapon_Main_Blaster.png',
};

const outputDir = path.join(__dirname, '../public/images/weapons');

// ファイルをダウンロード
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('武器アイコンダウンロード開始...');
  console.log(`対象武器数: ${Object.keys(weaponMapping).length}`);

  for (const [weaponId, englishName] of Object.entries(weaponMapping)) {
    const outputPath = path.join(outputDir, `${weaponId}.png`);

    // すでにダウンロード済み（1KB以上）ならスキップ
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      if (stats.size > 1000) {
        console.log(`スキップ: ${weaponId} (already downloaded)`);
        continue;
      }
    }

    // 既知のURLがあればダウンロード
    if (knownUrls[weaponId]) {
      try {
        console.log(`ダウンロード中: ${weaponId} (${englishName})`);
        await downloadFile(knownUrls[weaponId], outputPath);
        console.log(`  ✓ 成功`);
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`  ✗ 失敗: ${error.message}`);
      }
    } else {
      console.log(`スキップ: ${weaponId} (URL未登録)`);
    }
  }

  console.log('ダウンロード完了！');
}

main().catch(console.error);
