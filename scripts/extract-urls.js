const fs = require('fs');

// 武器ID -> 英語名のマッピング（Inkipediaのファイル名に使用される）
const weaponNames = {
  'wakaba-shooter': 'Splattershot_Jr.',
  'splattershot': 'Splattershot',
  'promodeler-mg': 'Aerospray_MG',
  'sharp-marker': 'Splash-o-matic',
  'bold-marker': 'Sploosh-o-matic',
  'n-zap85': 'N-ZAP_%2785',
  '52gal': '.52_Gal',
  '96gal': '.96_Gal',
  'prime-shooter': 'Splattershot_Pro',
  'jet-sweeper': 'Jet_Squelcher',
  'space-shooter': 'Squeezer',
  'l3-reelgun': 'L-3_Nozzlenose',
  'h3-reelgun': 'H-3_Nozzlenose',
  'bottlegeyser': 'Squeezer',
  'splattery': 'Dapple_Dualies',

  'hot-blaster': 'Blaster',
  'nova-blaster': 'Luna_Blaster',
  'clash-blaster': 'Clash_Blaster',
  'rapid-blaster': 'Rapid_Blaster',
  'long-blaster': 'Range_Blaster',
  's-blast92': 'S-BLAST_%2792',

  'splat-roller': 'Splat_Roller',
  'carbon-roller': 'Carbon_Roller',
  'dynamo-roller': 'Dynamo_Roller',
  'wide-roller': 'Flingza_Roller',
  'variable-roller': 'Big_Swig_Roller',

  'pablo': 'Inkbrush',
  'hokusai': 'Octobrush',
  'fincent': 'Painbrush',

  'squiffer': 'Classic_Squiffer',
  'splat-charger': 'Splat_Charger',
  'eliter-4k': 'E-liter_4K',
  'soychooter': 'Goo_Tuber',
  '14shiki-taketsutsutou': 'Bamboozler_14_Mk_I',

  'bucketslosher': 'Slosher',
  'hissen': 'Tri-Slosher',
  'screw-slosher': 'Sloshing_Machine',
  'overflow-slosher': 'Bloblobber',
  'explosher': 'Explosher',

  'barrel-spinner': 'Heavy_Splatling',
  'splatspinner': 'Mini_Splatling',
  'hydra-splatling': 'Hydra_Splatling',
  'kugelschreiber': 'Ballpoint_Splatling',
  'nautilus': 'Nautilus_47',

  'splat-maneuver': 'Splat_Dualies',
  'dual-sweeper': 'Dualie_Squelchers',
  'kelvin525': 'Glooga_Dualies',
  'quad-hopper': 'Dark_Tetra_Dualies',
  'spy-gadget': 'Douser_Dualies_FF',

  'parashelter': 'Splat_Brella',
  'campingshelter': 'Tenta_Brella',
  '24shiki-harikae-gasa': 'Undercover_Brella',

  'tristringer': 'Tri-Stringer',
  'lact-450': 'REEF-LUX_450',

  'drivewiper': 'Splatana_Wiper',
  'jimwiper': 'Splatana_Stamper',

  'grizzco-blaster': 'Grizzco_Blaster',
  'grizzco-charger': 'Grizzco_Charger',
  'grizzco-slosher': 'Grizzco_Slosher',
  'grizzco-maneuver': 'Grizzco_Dualies',
  'grizzco-roller': 'Grizzco_Roller',
  'grizzco-wiper': 'Grizzco_Splatana',
  'grizzco-stringer': 'Grizzco_Stringer',
  'grizzco-shelter': 'Grizzco_Brella',
  'grizzco-spinner': 'Grizzco_Splatling',
};

// /tmp/weapon-paths.txtから全パスを読み込み
const allPaths = fs.readFileSync('/tmp/weapon-paths.txt', 'utf8').trim().split('\n');

const result = {};
let found = 0;
let notFound = [];

for (const [weaponId, englishName] of Object.entries(weaponNames)) {
  // パスからこの武器名を含むものを検索（大文字小文字を区別しない）
  const pattern = `S3_Weapon_Main_${englishName}.png`;
  const matchingPath = allPaths.find(path => path.endsWith(pattern));

  if (matchingPath) {
    // フルURLを構築
    const url = `https://cdn.wikimg.net/en/splatoonwiki/images/${matchingPath}`;
    result[weaponId] = url;
    found++;
    console.log(`✓ ${weaponId}: ${englishName}`);
  } else {
    notFound.push({ id: weaponId, name: englishName });
    console.log(`✗ ${weaponId}: ${englishName} (not found)`);
  }
}

console.log(`\n見つかった武器: ${found}/${Object.keys(weaponNames).length}`);
console.log(`見つからなかった武器: ${notFound.length}`);

if (notFound.length > 0) {
  console.log('\n見つからなかった武器:');
  notFound.forEach(w => console.log(`  - ${w.id} (${w.name})`));
}

// JSONとして保存
const outputPath = __dirname + '/weapon-urls-extracted.json';
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
console.log(`\n抽出したURLを保存: ${outputPath}`);
