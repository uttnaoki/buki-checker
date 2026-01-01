// Inkipediaから全武器アイコンのURLを取得
const https = require('https');
const fs = require('fs');
const path = require('path');

// InkipediaのカテゴリページからURLを抽出
function fetchCategoryPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// HTMLから画像URLを抽出
function extractImageUrls(html) {
  const urls = {};

  // S3_Weapon_Main_[name].pngのパターンにマッチ
  const regex = /href="\/\/cdn\.wikimg\.net\/en\/splatoonwiki\/images\/([a-f0-9])\/([a-f0-9]{2})\/(S3_Weapon_Main_[^"]+\.png)"/g;

  let match;
  while ((match = regex.exec(html)) !== null) {
    const [, hash1, hash2, filename] = match;
    const url = `https://cdn.wikimg.net/en/splatoonwiki/images/${hash1}/${hash2}/${filename}`;

    // ファイル名をクリーンアップして武器名を抽出
    const weaponName = filename
      .replace('S3_Weapon_Main_', '')
      .replace('.png', '')
      .replace(/_2D_Current$/, ''); // _2D_Current サフィックスを削除

    // 重複を避ける（_2D_Currentなしを優先）
    if (!urls[weaponName] || !filename.includes('_2D_Current')) {
      urls[weaponName] = url;
    }
  }

  return urls;
}

async function main() {
  console.log('Inkipediaから武器アイコンURLを取得中...');

  const allUrls = {};

  // カテゴリページは複数ページに分かれている
  const baseUrl = 'https://splatoonwiki.org/wiki/Category:Splatoon_3_weapon_icons';

  try {
    // 1ページ目
    console.log('1ページ目を取得中...');
    const html = await fetchCategoryPage(baseUrl);
    const urls = extractImageUrls(html);
    Object.assign(allUrls, urls);

    console.log(`取得した武器数: ${Object.keys(allUrls).length}`);

    // 結果をJSONとして保存
    const outputPath = path.join(__dirname, 'weapon-urls.json');
    fs.writeFileSync(outputPath, JSON.stringify(allUrls, null, 2));
    console.log(`URLリストを保存しました: ${outputPath}`);

    // 武器名リストも表示
    console.log('\n取得した武器:');
    Object.keys(allUrls).sort().forEach(name => {
      console.log(`  - ${name}`);
    });

  } catch (error) {
    console.error('エラー:', error);
  }
}

main();
