const fs = require('fs');
const https = require('https');
const path = require('path');

// 全59武器のURLを読み込み
const weaponUrls = JSON.parse(
  fs.readFileSync(__dirname + '/weapon-urls-complete.json', 'utf8')
);

const outputDir = path.join(__dirname, '../public/images/weapons');

// 出力ディレクトリが存在しない場合は作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let downloaded = 0;
let skipped = 0;
let failed = 0;
const errors = [];

function downloadImage(url, weaponId) {
  return new Promise((resolve) => {
    const outputPath = path.join(outputDir, `${weaponId}.png`);

    // 既に存在し、ファイルサイズが10KB以上なら スキップ
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      if (stats.size > 10000) {
        console.log(`⏭  ${weaponId.padEnd(25)} (already exists, ${(stats.size / 1024).toFixed(1)}KB)`);
        skipped++;
        resolve();
        return;
      }
    }

    const file = fs.createWriteStream(outputPath);

    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(outputPath);
          console.log(`✓ ${weaponId.padEnd(25)} (${(stats.size / 1024).toFixed(1)}KB)`);
          downloaded++;
          resolve();
        });
      } else {
        fs.unlink(outputPath, () => {});
        console.log(`✗ ${weaponId.padEnd(25)} HTTP ${response.statusCode}`);
        errors.push({ id: weaponId, error: `HTTP ${response.statusCode}`, url });
        failed++;
        resolve();
      }
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      console.log(`✗ ${weaponId.padEnd(25)} ${err.message}`);
      errors.push({ id: weaponId, error: err.message, url });
      failed++;
      resolve();
    });
  });
}

async function downloadAll() {
  console.log('='.repeat(60));
  console.log('全59武器のアイコンダウンロード開始');
  console.log(`出力先: ${outputDir}`);
  console.log('='.repeat(60));
  console.log();

  const entries = Object.entries(weaponUrls);
  const total = entries.length;

  for (let i = 0; i < entries.length; i++) {
    const [weaponId, url] = entries[i];
    console.log(`[${(i + 1).toString().padStart(2)}/${total}] `, { end: '' });
    await downloadImage(url, weaponId);

    // レート制限のため300msの遅延
    if (i < entries.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }

  console.log();
  console.log('='.repeat(60));
  console.log('ダウンロード完了');
  console.log('='.repeat(60));
  console.log(`成功: ${downloaded}個`);
  console.log(`スキップ: ${skipped}個 (既存)`);
  console.log(`失敗: ${failed}個`);
  console.log(`合計: ${downloaded + skipped}/${total}個のアイコンが利用可能`);

  if (errors.length > 0) {
    console.log();
    console.log('【失敗した武器】');
    errors.forEach(e => {
      console.log(`  ${e.id}: ${e.error}`);
      console.log(`    URL: ${e.url}`);
    });
  }

  // ダウンロード結果を記録
  const result = {
    timestamp: new Date().toISOString(),
    total,
    downloaded,
    skipped,
    failed,
    errors,
  };

  fs.writeFileSync(
    path.join(__dirname, 'download-result.json'),
    JSON.stringify(result, null, 2)
  );
}

// 実行
downloadAll().catch(console.error);
