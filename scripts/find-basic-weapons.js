const fs = require('fs');

// 基本武器の英語名マッピング（亜種ではなく基本版のみ）
const basicWeaponNames = {
  // Shooter
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

  // Blaster
  'hot-blaster': 'Blaster',
  'nova-blaster': 'Luna_Blaster',
  'clash-blaster': 'Clash_Blaster',
  'rapid-blaster': 'Rapid_Blaster',
  'long-blaster': 'Range_Blaster',
  's-blast92': 'S-BLAST_%2792',

  // Roller
  'splat-roller': 'Splat_Roller',
  'carbon-roller': 'Carbon_Roller',
  'dynamo-roller': 'Dynamo_Roller',
  'wide-roller': 'Flingza_Roller',
  'variable-roller': 'Big_Swig_Roller',

  // Brush
  'pablo': 'Inkbrush',
  'hokusai': 'Octobrush',
  'fincent': 'Painbrush',

  // Charger
  'squiffer': 'Classic_Squiffer',
  'splat-charger': 'Splat_Charger',
  'eliter-4k': 'E-liter_4K',
  'soychooter': 'Goo_Tuber',
  '14shiki-taketsutsutou': 'Bamboozler_14_Mk_I',

  // Slosher
  'bucketslosher': 'Slosher',
  'hissen': 'Tri-Slosher',
  'screw-slosher': 'Sloshing_Machine',
  'overflow-slosher': 'Bloblobber',
  'explosher': 'Explosher',

  // Spinner
  'barrel-spinner': 'Heavy_Splatling',
  'splatspinner': 'Mini_Splatling',
  'hydra-splatling': 'Hydra_Splatling',
  'kugelschreiber': 'Ballpoint_Splatling',
  'nautilus': 'Nautilus_47',

  // Maneuver
  'splat-maneuver': 'Splat_Dualies',
  'dual-sweeper': 'Dualie_Squelchers',
  'kelvin525': 'Glooga_Dualies',
  'quad-hopper': 'Dark_Tetra_Dualies',
  'spy-gadget': 'Douser_Dualies_FF',

  // Shelter
  'parashelter': 'Splat_Brella',
  'campingshelter': 'Tenta_Brella',
  '24shiki-harikae-gasa': 'Undercover_Brella',

  // Stringer
  'tristringer': 'Tri-Stringer',
  'lact-450': 'REEF-LUX_450',

  // Wiper
  'drivewiper': 'Splatana_Wiper',
  'jimwiper': 'Splatana_Stamper',

  // Grizzco (これらは基本版のみ)
  'grizzco-blaster': 'Grizzco_Blaster',
  'grizzco-charger': 'Grizzco_Charger',
  'grizzco-slosher': 'Grizzco_Slosher',
  'grizzco-maneuver': 'Grizzco_Dualies',
  'grizzco-roller': 'Grizzco_Roller',
  'grizzco-wiper': 'Grizzco_Splatana',
  'grizzco-stringer': 'Grizzco_Stringer',
  'grizzco-shelter': 'Grizzco_Brella',
};

// 亜種武器を含む現在のマッピング
const currentUrls = JSON.parse(
  fs.readFileSync(__dirname + '/weapon-urls-complete.json', 'utf8')
);

console.log('='.repeat(60));
console.log('亜種武器の確認');
console.log('='.repeat(60));

const variantWeapons = [];

for (const [weaponId, url] of Object.entries(currentUrls)) {
  const basicName = basicWeaponNames[weaponId];
  if (!basicName) continue;

  const fileName = url.split('/').pop();

  // 亜種かどうかチェック（Custom, Neo, Deco, Forge, Cometz等を含む）
  const variantKeywords = [
    'Custom', 'Neo', 'Deco', 'Forge', 'Krak-On', 'Enperry',
    'Annaki', 'Glamorz', 'Cometz', 'Charcoal', 'Foil',
    'Hoofz', 'Bulbz', 'Inkline', 'Nouveau', 'Clawz'
  ];

  const isVariant = variantKeywords.some(keyword => fileName.includes(keyword));
  const isNotExactMatch = !fileName.includes(`Main_${basicName}.png`) &&
                          !fileName.includes(`Main_${basicName}_2D_Current.png`);

  if (isVariant || isNotExactMatch) {
    variantWeapons.push({
      id: weaponId,
      basicName,
      currentFile: fileName,
    });
    console.log(`⚠ ${weaponId.padEnd(25)} ${fileName}`);
  }
}

console.log();
console.log('='.repeat(60));
console.log(`亜種武器数: ${variantWeapons.length}`);
console.log('='.repeat(60));

// 亜種リストを保存
fs.writeFileSync(
  __dirname + '/variant-weapons.json',
  JSON.stringify(variantWeapons, null, 2)
);

console.log(`\n亜種武器リストを保存: variant-weapons.json`);
