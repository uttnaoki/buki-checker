const https = require('https');
const fs = require('fs');
const path = require('path');

const weaponUrls = require('./weapon-urls-manual.json');
const outputDir = path.join(__dirname, '../public/images/weapons');

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(filepath);
          resolve(stats.size);
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // リダイレクト処理
        file.close();
        fs.unlinkSync(filepath);
        downloadFile(response.headers.location, filepath).then(resolve).catch(reject);
      } else {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlinkSync(filepath);
      reject(err);
    });
  });
}

async function main() {
  console.log('武器アイコン一括ダウンロード開始...');
  console.log(`対象武器数: ${Object.keys(weaponUrls).length}\n`);

  let success = 0;
  let skip = 0;
  let fail = 0;

  for (const [weaponId, url] of Object.entries(weaponUrls)) {
    const outputPath = path.join(outputDir, `${weaponId}.png`);

    // すでにダウンロード済み（10KB以上）ならスキップ
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      if (stats.size > 10000) {
        console.log(`⊙ ${weaponId} (already downloaded, ${(stats.size/1024).toFixed(1)}KB)`);
        skip++;
        continue;
      }
    }

    try {
      console.log(`↓ ${weaponId} ...`);
      const size = await downloadFile(url, outputPath);
      console.log(`  ✓ success (${(size/1024).toFixed(1)}KB)`);
      success++;
      await new Promise(resolve => setTimeout(resolve, 300)); // レート制限対策
    } catch (error) {
      console.error(`  ✗ failed: ${error.message}`);
      fail++;
    }
  }

  console.log('\n完了！');
  console.log(`成功: ${success}, スキップ: ${skip}, 失敗: ${fail}`);
}

main().catch(console.error);
