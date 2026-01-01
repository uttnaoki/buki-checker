#!/bin/bash

# Splatoon 3武器アイコン一括ダウンロードスクリプト
# Inkipediaから武器アイコンをダウンロード

BASE_URL="https://cdn.wikimg.net/en/splatoonwiki/images"
OUTPUT_DIR="../public/images/weapons"

# 武器ID -> Inkipedia英語名のマッピング
declare -A WEAPON_MAPPING=(
  # シューター
  ["wakaba-shooter"]="Splattershot_Jr."
  ["splattershot"]="Splat_Roller" # 仮
  ["promodeler-mg"]="Aerospray_MG"
  ["sharp-marker"]="Splash-o-matic"
  ["bold-marker"]="Sploosh-o-matic"
  ["n-zap85"]="N-ZAP_%2785"
  ["52gal"]=".52_Gal"
  ["96gal"]=".96_Gal"
  ["prime-shooter"]="Splattershot_Pro"
  ["jet-sweeper"]="Jet_Squelcher"
  ["space-shooter"]="Squeezer"
  ["l3-reelgun"]="L-3_Nozzlenose"
  ["h3-reelgun"]="H-3_Nozzlenose"
  ["bottlegeyser"]="Squeezer"
  ["splattery"]="Dapple_Dualies"

  # ブラスター
  ["hot-blaster"]="Blaster"
  ["nova-blaster"]="Luna_Blaster"
  ["clash-blaster"]="Clash_Blaster"
  ["rapid-blaster"]="Rapid_Blaster"
  ["long-blaster"]="Range_Blaster"
  ["s-blast92"]="S-BLAST_%2792"

  # ローラー
  ["splat-roller"]="Splat_Roller"
  ["carbon-roller"]="Carbon_Roller"
  ["dynamo-roller"]="Dynamo_Roller"
  ["wide-roller"]="Flingza_Roller"
  ["variable-roller"]="Big_Swig_Roller"

  # フデ
  ["pablo"]="Inkbrush"
  ["hokusai"]="Octobrush"
  ["fincent"]="Painbrush"

  # チャージャー
  ["squiffer"]="Classic_Squiffer"
  ["splat-charger"]="Splat_Charger"
  ["eliter-4k"]="E-liter_4K"
  ["soychooter"]="Goo_Tuber"
  ["14shiki-taketsutsutou"]="Bamboozler_14_Mk_I"

  # スロッシャー
  ["bucketslosher"]="Slosher"
  ["hissen"]="Tri-Slosher"
  ["screw-slosher"]="Sloshing_Machine"
  ["overflow-slosher"]="Bloblobber"
  ["explosher"]="Explosher"

  # スピナー
  ["barrel-spinner"]="Heavy_Splatling"
  ["splatspinner"]="Mini_Splatling"
  ["hydra-splatling"]="Hydra_Splatling"
  ["kugelschreiber"]="Ballpoint_Splatling"
  ["nautilus"]="Nautilus_47"

  # マニューバー
  ["splat-maneuver"]="Splat_Dualies"
  ["dual-sweeper"]="Dualie_Squelchers"
  ["kelvin525"]="Glooga_Dualies"
  ["quad-hopper"]="Dark_Tetra_Dualies"
  ["spy-gadget"]="Douser_Dualies_FF"

  # シェルター
  ["parashelter"]="Splat_Brella"
  ["campingshelter"]="Tenta_Brella"
  ["24shiki-harikae-gasa"]="Undercover_Brella"

  # ストリンガー
  ["tristringer"]="Tri-Stringer"
  ["lact-450"]="REEF-LUX_450"

  # ワイパー
  ["drivewiper"]="Splatana_Wiper"
  ["jimwiper"]="Splatana_Stamper"

  # クマサン印
  ["grizzco-blaster"]="Grizzco_Blaster"
  ["grizzco-charger"]="Grizzco_Charger"
  ["grizzco-slosher"]="Grizzco_Slosher"
  ["grizzco-maneuver"]="Grizzco_Dualies"
  ["grizzco-roller"]="Grizzco_Roller"
  ["grizzco-wiper"]="Grizzco_Splatana"
  ["grizzco-stringer"]="Grizzco_Stringer"
  ["grizzco-shelter"]="Grizzco_Brella"
  ["grizzco-spinner"]="Grizzco_Splatling"
)

echo "武器アイコンダウンロード開始..."
echo "対象武器数: ${#WEAPON_MAPPING[@]}"

cd "$(dirname "$0")"
mkdir -p "$OUTPUT_DIR"

for weapon_id in "${!WEAPON_MAPPING[@]}"; do
  english_name="${WEAPON_MAPPING[$weapon_id]}"
  output_file="$OUTPUT_DIR/${weapon_id}.png"

  # すでにダウンロード済みならスキップ
  if [ -f "$output_file" ] && [ $(stat -f%z "$output_file") -gt 1000 ]; then
    echo "スキップ: $weapon_id (already downloaded)"
    continue
  fi

  echo "ダウンロード中: $weapon_id ($english_name)"

  # Inkipediaのファイル検索ページにアクセスして正しいURLを取得
  # とりあえず一般的なパターンでダウンロードを試みる
  # URLパターン: /[hash1]/[hash2]/S3_Weapon_Main_[name].png

  # 直接ダウンロードを試みる（パスハッシュは動的なので、検索が必要）
  # 仮のアプローチ: wgetでInkipediaのファイルページをチェック

  sleep 0.5  # レート制限対策
done

echo "ダウンロード完了！"
