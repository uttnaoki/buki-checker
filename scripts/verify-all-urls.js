const fs = require('fs');

// 全59武器のマッピング（武器ID -> 検索パターン）
const weaponSearchPatterns = {
  // Shooter (16)
  'wakaba-shooter': ['Splattershot_Jr.', 'Custom_Splattershot_Jr.'],
  'splattershot': ['Splattershot.png', 'Hero_Shot', 'Glamorz_Splattershot', 'Annaki_Splattershot'],
  'promodeler-mg': ['Aerospray_MG', 'Aerospray_RG', 'Colorz_Aerospray'],
  'sharp-marker': ['Splash-o-matic', 'Neo_Splash-o-matic'],
  'bold-marker': ['Sploosh-o-matic', 'Neo_Sploosh-o-matic'],
  'n-zap85': ['N-ZAP_%2785', "N-ZAP_'85", 'N-ZAP_%2789'],
  '52gal': ['.52_Gal'],
  '96gal': ['.96_Gal'],
  'prime-shooter': ['Splattershot_Pro', 'Forge_Splattershot_Pro'],
  'jet-sweeper': ['Jet_Squelcher'],
  'space-shooter': ['Squeezer', 'Foil_Squeezer'],
  'l3-reelgun': ['L-3_Nozzlenose'],
  'h3-reelgun': ['H-3_Nozzlenose'],
  'bottlegeyser': ['Squeezer', 'Foil_Squeezer'],
  'splattery': ['Dapple_Dualies'],

  // Blaster (6)
  'hot-blaster': ['Blaster.png', 'Custom_Blaster', 'Gleamz_Blaster'],
  'nova-blaster': ['Luna_Blaster'],
  'clash-blaster': ['Clash_Blaster'],
  'rapid-blaster': ['Rapid_Blaster', 'Custom_Rapid_Blaster'],
  'long-blaster': ['Range_Blaster', 'Custom_Range_Blaster'],
  's-blast92': ['S-BLAST_%2792', "S-BLAST_'92"],

  // Roller (5)
  'splat-roller': ['Splat_Roller', 'Krak-On_Splat_Roller'],
  'carbon-roller': ['Carbon_Roller'],
  'dynamo-roller': ['Dynamo_Roller'],
  'wide-roller': ['Flingza_Roller'],
  'variable-roller': ['Big_Swig_Roller'],

  // Brush (3)
  'pablo': ['Inkbrush'],
  'hokusai': ['Octobrush', 'Cometz_Octobrush'],
  'fincent': ['Painbrush', 'Decavitator', 'Charcoal_Decavitator'],

  // Charger (5)
  'squiffer': ['Classic_Squiffer'],
  'splat-charger': ['Splat_Charger', 'Z%2BF_Splat_Charger'],
  'eliter-4k': ['E-liter_4K'],
  'soychooter': ['Goo_Tuber'],
  '14shiki-taketsutsutou': ['Bamboozler_14_Mk_I'],

  // Slosher (5)
  'bucketslosher': ['Slosher.png', 'Slosher_Deco'],
  'hissen': ['Tri-Slosher', 'Tri-Slosher_Nouveau'],
  'screw-slosher': ['Sloshing_Machine', 'Sloshing_Machine_Neo'],
  'overflow-slosher': ['Bloblobber'],
  'explosher': ['Explosher'],

  // Spinner (5)
  'barrel-spinner': ['Heavy_Splatling', 'Heavy_Edit_Splatling'],
  'splatspinner': ['Mini_Splatling'],
  'hydra-splatling': ['Hydra_Splatling'],
  'kugelschreiber': ['Ballpoint_Splatling'],
  'nautilus': ['Nautilus_47', 'Nautilus_79'],

  // Maneuver (5)
  'splat-maneuver': ['Splat_Dualies', 'Enperry_Splat_Dualies'],
  'dual-sweeper': ['Dualie_Squelchers'],
  'kelvin525': ['Glooga_Dualies'],
  'quad-hopper': ['Dark_Tetra_Dualies', 'Light_Tetra_Dualies'],
  'spy-gadget': ['Douser_Dualies_FF'],

  // Shelter (3)
  'parashelter': ['Splat_Brella', 'Sorella_Brella'],
  'campingshelter': ['Tenta_Brella', 'Tenta_Sorella_Brella'],
  '24shiki-harikae-gasa': ['Undercover_Brella', 'Undercover_Sorella_Brella'],

  // Stringer (2)
  'tristringer': ['Tri-Stringer', 'Inkline_Tri-Stringer', 'Bulbz_Tri-Stringer'],
  'lact-450': ['REEF-LUX_450', 'Wellstring'],

  // Wiper (2)
  'drivewiper': ['Splatana_Wiper', 'Wiper_Deco'],
  'jimwiper': ['Splatana_Stamper', 'Stamper_Nouveau'],

  // Grizzco (8)
  'grizzco-blaster': ['Grizzco_Blaster'],
  'grizzco-charger': ['Grizzco_Charger'],
  'grizzco-slosher': ['Grizzco_Slosher'],
  'grizzco-maneuver': ['Grizzco_Dualies'],
  'grizzco-roller': ['Grizzco_Roller'],
  'grizzco-wiper': ['Grizzco_Splatana'],
  'grizzco-stringer': ['Grizzco_Stringer'],
  'grizzco-shelter': ['Grizzco_Brella'],
};

// 全パスを読み込み
const allPaths = fs.readFileSync('/tmp/weapon-paths-all.txt', 'utf8').trim().split('\n');

const result = {};
let found = 0;
let notFound = [];

console.log('='.repeat(60));
console.log('全59武器のURL検証開始');
console.log('='.repeat(60));

for (const [weaponId, patterns] of Object.entries(weaponSearchPatterns)) {
  let matchingPath = null;

  // 各パターンで検索
  for (const pattern of patterns) {
    // まず通常版を試す（_2D_Currentなし）
    let found = allPaths.find(path => {
      const fileName = path.split('/').pop();
      return fileName.includes(pattern) && !fileName.includes('_2D_Current');
    });

    if (!found) {
      // _2D_Current版を試す
      found = allPaths.find(path => {
        const fileName = path.split('/').pop();
        return fileName.includes(pattern) && fileName.includes('_2D_Current');
      });
    }

    if (found) {
      matchingPath = found;
      break;
    }
  }

  if (matchingPath) {
    const url = `https://cdn.wikimg.net/en/splatoonwiki/images/${matchingPath}`;
    result[weaponId] = url;
    found++;
    const fileName = matchingPath.split('/').pop();
    console.log(`✓ ${weaponId.padEnd(25)} ${fileName}`);
  } else {
    notFound.push({ id: weaponId, patterns });
    console.log(`✗ ${weaponId.padEnd(25)} NOT FOUND (tried: ${patterns.join(', ')})`);
  }
}

console.log('\n' + '='.repeat(60));
console.log(`見つかった武器: ${found}/59`);
console.log(`見つからなかった武器: ${notFound.length}`);
console.log('='.repeat(60));

if (notFound.length > 0) {
  console.log('\n【見つからなかった武器の詳細】');
  notFound.forEach(w => {
    console.log(`\n  ${w.id}:`);
    console.log(`    試したパターン: ${w.patterns.join(', ')}`);

    // 類似のファイル名を検索
    const firstPattern = w.patterns[0].replace(/_/g, '').toLowerCase();
    const similar = allPaths
      .filter(p => {
        const fileName = p.toLowerCase();
        return firstPattern.split('').slice(0, 8).some((char, i) =>
          fileName.includes(firstPattern.substring(0, i + 8))
        );
      })
      .slice(0, 5);

    if (similar.length > 0) {
      console.log('    類似ファイル:');
      similar.forEach(s => console.log(`      - ${s.split('/').pop()}`));
    }
  });
}

// JSONとして保存
const outputPath = __dirname + '/weapon-urls-verified.json';
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
console.log(`\n保存完了: ${outputPath}`);
console.log(`合計: ${Object.keys(result).length}個のURL`);

// 統計情報
console.log('\n【カテゴリ別統計】');
const categories = {
  shooter: 0, blaster: 0, roller: 0, brush: 0, charger: 0,
  slosher: 0, spinner: 0, maneuver: 0, shelter: 0,
  stringer: 0, wiper: 0, grizzco: 0
};

// weapons.tsから読み込んでカテゴリ別に集計
const weaponsData = fs.readFileSync(__dirname + '/../src/data/weapons.ts', 'utf8');
for (const [weaponId] of Object.entries(result)) {
  if (weaponId.startsWith('grizzco-')) categories.grizzco++;
  else if (weaponsData.includes(`id: '${weaponId}'`)) {
    const match = weaponsData.match(new RegExp(`id: '${weaponId}'[\\s\\S]*?category: '(\\w+)'`));
    if (match) categories[match[1]]++;
  }
}

Object.entries(categories).forEach(([cat, count]) => {
  if (count > 0) console.log(`  ${cat}: ${count}`);
});
