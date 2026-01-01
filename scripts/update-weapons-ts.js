const fs = require('fs');
const path = require('path');

// 全武器URLを読み込み
const weaponUrls = JSON.parse(
  fs.readFileSync(__dirname + '/weapon-urls-complete.json', 'utf8')
);

// weapons.tsファイルを読み込み
const weaponsPath = path.join(__dirname, '../src/data/weapons.ts');
let content = fs.readFileSync(weaponsPath, 'utf8');

console.log('='.repeat(60));
console.log('weapons.tsにiconUrlを追加');
console.log('='.repeat(60));

let updated = 0;
let notFound = [];

// 各武器のiconUrlを追加または更新
for (const [weaponId, url] of Object.entries(weaponUrls)) {
  const iconUrl = `/images/weapons/${weaponId}.png`;

  // 既存のiconUrlパターンを探す
  const existingPattern = new RegExp(
    `(id:\\s*'${weaponId}'[^}]+?)iconUrl:\\s*'[^']*'`,
    's'
  );

  // iconUrlが既に存在する場合は置換
  if (existingPattern.test(content)) {
    content = content.replace(existingPattern, `$1iconUrl: '${iconUrl}'`);
    console.log(`✓ ${weaponId.padEnd(25)} (updated)`);
    updated++;
  } else {
    // iconUrlが存在しない場合は追加（categoryの後に挿入）
    const addPattern = new RegExp(
      `(id:\\s*'${weaponId}'[^}]+?category:\\s*'[^']+?',)`,
      's'
    );

    if (addPattern.test(content)) {
      content = content.replace(
        addPattern,
        `$1\n    iconUrl: '${iconUrl}',`
      );
      console.log(`✓ ${weaponId.padEnd(25)} (added)`);
      updated++;
    } else {
      notFound.push(weaponId);
      console.log(`✗ ${weaponId.padEnd(25)} (not found in weapons.ts)`);
    }
  }
}

// ファイルを保存
fs.writeFileSync(weaponsPath, content, 'utf8');

console.log();
console.log('='.repeat(60));
console.log(`更新完了: ${updated}/59個の武器にiconUrlを追加`);
if (notFound.length > 0) {
  console.log(`見つからなかった武器: ${notFound.join(', ')}`);
}
console.log('='.repeat(60));
