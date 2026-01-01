// 武器アイコン一括ダウンロードスクリプト (2D版)
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
  'space-shooter': 'Splattershot Nova',
  'l3-reelgun': 'L-3 Nozzlenose',
  'h3-reelgun': 'H-3 Nozzlenose',
  'bottlegeyser': 'Squeezer',
  'splattery': 'Dapple Dualies',

  // ブラスター
  'hot-blaster': 'Blaster',
  'nova-blaster': 'Luna Blaster',
  'clash-blaster': 'Clash Blaster',
  'rapid-blaster': 'Rapid Blaster',
  'rapid-blaster-elite': 'Rapid Blaster Pro',
  'long-blaster': 'Range Blaster',
  's-blast92': 'S-BLAST \'92',

  // ローラー
  'splat-roller': 'Splat Roller',
  'carbon-roller': 'Carbon Roller',
  'dynamo-roller': 'Dynamo Roller',
  'wide-roller': 'Big Swig Roller',
  'variable-roller': 'Flingza Roller',

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
  'r-pen-5h': 'Snipewriter 5H',

  // スロッシャー
  'bucketslosher': 'Slosher',
  'hissen': 'Tri-Slosher',
  'screw-slosher': 'Sloshing Machine',
  'overflow-slosher': 'Bloblobber',
  'explosher': 'Explosher',
  'dread-wringer': 'Dread Wringer',

  // スピナー
  'barrel-spinner': 'Heavy Splatling',
  'splatspinner': 'Mini Splatling',
  'hydra-splatling': 'Hydra Splatling',
  'kugelschreiber': 'Ballpoint Splatling',
  'nautilus': 'Nautilus 47',
  'heavy-edit-splatling': 'Heavy Edit Splatling',

  // マニューバー
  'splat-maneuver': 'Splat Dualies',
  'dual-sweeper': 'Dualie Squelchers',
  'kelvin525': 'Glooga Dualies',
  'quad-hopper': 'Dark Tetra Dualies',
  'splattery': 'Dapple Dualies',
  'guen-ff': 'Douser Dualies FF',

  // シェルター
  'parashelter': 'Splat Brella',
  'campingshelter': 'Tenta Brella',
  '24shiki-harikae-gasa': 'Undercover Brella',
  'recycled-brella-24': 'Recycled Brella 24 Mk I',

  // ストリンガー
  'tristringer': 'Tri-Stringer',
  'lact-450': 'REEF-LUX 450',
  'wellstring-v': 'Wellstring V',

  // ワイパー
  'drivewiper': 'Splatana Wiper',
  'jimwiper': 'Splatana Stamper',
  'mint-decavitator': 'Mint Decavitator',

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

const outputDir = path.join(__dirname, '../public/images/weapons');

// リダイレクトを追跡してファイルをダウンロード（再帰的に処理）
function downloadFile(url, filepath, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    // 無限リダイレクト防止
    if (redirectCount > 5) {
      reject(new Error('Too many redirects'));
      return;
    }

    https.get(url, (response) => {
      // リダイレクトを処理
      if (response.statusCode === 301 || response.statusCode === 302) {
        let redirectUrl = response.headers.location;

        // 相対URLの場合は絶対URLに変換
        if (redirectUrl.startsWith('//')) {
          redirectUrl = 'https:' + redirectUrl;
        } else if (redirectUrl.startsWith('/')) {
          redirectUrl = 'https://splatoonwiki.org' + redirectUrl;
        }

        // 再帰的にリダイレクトを追跡
        downloadFile(redirectUrl, filepath, redirectCount + 1)
          .then(resolve)
          .catch(reject);
      } else if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
        file.on('error', (err) => {
          fs.unlink(filepath, () => {});
          reject(err);
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Inkipediaのファイル名からURLを生成
function getInkipediaUrl(englishName) {
  // 2D Current版のファイル名を生成
  const fileName = `S3_Weapon_Main_${englishName}_2D_Current.png`;
  // Inkipediaの特殊リダイレクトページを使用
  return `https://splatoonwiki.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}`;
}

async function main() {
  console.log('武器アイコンダウンロード開始... (2D版)');
  console.log(`対象武器数: ${Object.keys(weaponMapping).length}`);

  let successCount = 0;
  let failCount = 0;

  for (const [weaponId, englishName] of Object.entries(weaponMapping)) {
    const outputPath = path.join(outputDir, `${weaponId}.png`);

    try {
      console.log(`ダウンロード中: ${weaponId} (${englishName})`);
      const url = getInkipediaUrl(englishName);
      await downloadFile(url, outputPath);

      // ファイルサイズを確認
      const stats = fs.statSync(outputPath);
      if (stats.size > 1000) {
        console.log(`  ✓ 成功 (${Math.round(stats.size / 1024)}KB)`);
        successCount++;
      } else {
        console.log(`  ⚠ 警告: ファイルサイズが小さすぎます (${stats.size}B)`);
        failCount++;
      }

      // レート制限対策
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`  ✗ 失敗: ${error.message}`);
      failCount++;
    }
  }

  console.log('\n=== ダウンロード完了 ===');
  console.log(`成功: ${successCount}件`);
  console.log(`失敗: ${failCount}件`);
}

main().catch(console.error);
