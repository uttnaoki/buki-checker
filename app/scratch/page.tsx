'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Share2 } from 'lucide-react';
import { WEAPONS, WEAPON_BY_ID } from '@/data/weapons';
import { useWeaponCheckStore } from '@/stores/weaponCheckStore';
import { BottomNav } from '@/components/BottomNav';

// グリッドの列数
const GRID_COLS = 9;

// グリッドセルの種類
type GridCell =
  | { type: 'weapon'; weapon: (typeof WEAPONS)[number] }
  | { type: 'empty' };

// 武器を正方形グリッドに配置し、空きセルを中央に配置する
function createGridCells(weapons: typeof WEAPONS): GridCell[] {
  const totalWeapons = weapons.length;
  // 正方形グリッドに必要な行数（列数と同じ）
  const gridRows = GRID_COLS;
  const totalCells = GRID_COLS * gridRows;
  const emptyCells = totalCells - totalWeapons;

  if (emptyCells <= 0) {
    // 空きセルがない場合はそのまま武器を返す
    return weapons.map((weapon) => ({ type: 'weapon', weapon }));
  }

  // 空きセルを中央に配置
  const weaponsBefore = Math.floor(totalWeapons / 2);

  const cells: GridCell[] = [];

  // 前半の武器
  for (let i = 0; i < weaponsBefore; i++) {
    cells.push({ type: 'weapon', weapon: weapons[i] });
  }

  // 中央の空きセル
  for (let i = 0; i < emptyCells; i++) {
    cells.push({ type: 'empty' });
  }

  // 後半の武器
  for (let i = weaponsBefore; i < totalWeapons; i++) {
    cells.push({ type: 'weapon', weapon: weapons[i] });
  }

  return cells;
}

export default function ResultPage() {
  const { hasHydrated, checkedIndices, getEncodedProgress } = useWeaponCheckStore();
  const [showCompleteAnimation, setShowCompleteAnimation] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  // checkedIndicesから直接チェック状態を取得
  const isChecked = (weaponId: string) => {
    const weapon = WEAPON_BY_ID.get(weaponId);
    return weapon ? checkedIndices.has(weapon.index) : false;
  };

  const totalWeapons = WEAPONS.length;
  const checkedCount = checkedIndices.size;
  const progressPercentage =
    totalWeapons > 0 ? (checkedCount / totalWeapons) * 100 : 0;
  const isComplete = checkedCount === totalWeapons;
  const opacityValue = useMemo(() => {
    const rate = checkedCount / totalWeapons;
    if (rate <= 0.5) return 0.3;
    if (rate <= 0.75) return 0.2;
    return 0.1;
  }, [checkedCount, totalWeapons]);

  // グリッドセルを生成
  const gridCells = createGridCells(WEAPONS);

  // 共有ボタンのクリックハンドラ
  const handleShare = async () => {
    const encoded = getEncodedProgress();
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const shareUrl = `${baseUrl}/share?p=${encoded}`;

    // Web Share APIが利用可能な場合
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ブキチェッカー - スクラッチ進捗',
          text: `${checkedCount}/${totalWeapons}種類の武器をチェックしました！`,
          url: shareUrl,
        });
        return;
      } catch {
        // ユーザーがキャンセルした場合など
      }
    }

    // フォールバック: クリップボードにコピー
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {}
  };

  // コンプリート時のアニメーション表示
  useEffect(() => {
    if (hasHydrated && isComplete) {
      // setStateを非同期で呼び出してカスケードレンダーを回避
      const showTimer = setTimeout(() => {
        setShowCompleteAnimation(true);
      }, 0);
      const hideTimer = setTimeout(() => {
        setShowCompleteAnimation(false);
      }, 2000);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [hasHydrated, isComplete]);

  if (!hasHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-md mx-auto p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">スクラッチ</h1>
            <p className="text-sm text-gray-600 mt-1">
              {isComplete
                ? 'コンプリート！'
                : `あと ${totalWeapons - checkedCount} 種類`}
            </p>
          </div>
          <button
            onClick={handleShare}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="進捗を共有"
          >
            <Share2 className="w-5 h-5" />
            {showCopied && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap">
                URLをコピーしました
              </span>
            )}
          </button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-md mx-auto p-4 pb-24">
        {/* プログレス */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">進捗</span>
            <span className="font-bold text-green-600">
              {checkedCount} / {totalWeapons}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-green-600 h-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 text-right mt-1">
            {progressPercentage.toFixed(1)}%
          </div>
        </div>

        {/* 画像エリア */}
        <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-lg">
          {/* 完了画像 */}
          <Image
            src="/images/complete.jpg"
            alt="コンプリート画像"
            fill
            className="object-cover"
            priority
          />

          {/* 武器アイコングリッド */}
          <div
            className="absolute inset-0 grid gap-0"
            style={{
              gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_COLS}, 1fr)`,
            }}
          >
            {gridCells.map((cell, index) => {
              const isEmpty = cell.type === 'empty';
              const weapon = isEmpty ? null : cell.weapon;
              const checked = isEmpty || (weapon && isChecked(weapon.id));

              return (
                <div
                  key={isEmpty ? `empty-${index}` : weapon!.id}
                  className="relative aspect-square transition-opacity duration-300"
                  style={{ opacity: checked ? opacityValue : 1 }}
                >
                  <div className={`absolute inset-0 bg-gray-800/90 m-[1px]`}>
                    {weapon && (
                      <Image
                        src={
                          weapon.iconUrl || '/images/weapons/placeholder.png'
                        }
                        alt={weapon.name}
                        fill
                        className="object-contain p-0.5"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* コンプリート時のオーバーレイ（アニメーション） */}
          {isComplete && (
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                showCompleteAnimation ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className={`bg-black/50 px-6 py-3 rounded-full transition-transform duration-500 ${
                  showCompleteAnimation ? 'scale-100' : 'scale-75'
                }`}
              >
                <span className="text-white text-2xl font-bold tracking-wider">
                  COMPLETE!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 説明テキスト */}
        <p className="text-center text-sm text-gray-500 mt-4">
          {isComplete
            ? '全ての武器を支給されました！'
            : '武器をチェックすると画像が見えてきます'}
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
