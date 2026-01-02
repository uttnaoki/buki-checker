'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { WEAPONS } from '@/data/weapons';
import { decodeProgress } from '@/utils/progressEncoder';

// グリッドの列数
const GRID_COLS = 9;

// グリッドセルの種類
type GridCell =
  | { type: 'weapon'; weapon: (typeof WEAPONS)[number] }
  | { type: 'empty' };

// 武器を正方形グリッドに配置し、空きセルを中央に配置する
function createGridCells(weapons: typeof WEAPONS): GridCell[] {
  const totalWeapons = weapons.length;
  const gridRows = GRID_COLS;
  const totalCells = GRID_COLS * gridRows;
  const emptyCells = totalCells - totalWeapons;

  if (emptyCells <= 0) {
    return weapons.map((weapon) => ({ type: 'weapon', weapon }));
  }

  const weaponsBefore = Math.floor(totalWeapons / 2);
  const cells: GridCell[] = [];

  for (let i = 0; i < weaponsBefore; i++) {
    cells.push({ type: 'weapon', weapon: weapons[i] });
  }

  for (let i = 0; i < emptyCells; i++) {
    cells.push({ type: 'empty' });
  }

  for (let i = weaponsBefore; i < totalWeapons; i++) {
    cells.push({ type: 'weapon', weapon: weapons[i] });
  }

  return cells;
}

function ShareContent() {
  const searchParams = useSearchParams();
  const progressParam = searchParams.get('p') || '';
  const checkedIds = decodeProgress(progressParam);

  const totalWeapons = WEAPONS.length;
  const checkedCount = checkedIds.size;
  const progressPercentage =
    totalWeapons > 0 ? (checkedCount / totalWeapons) * 100 : 0;
  const isComplete = checkedCount === totalWeapons;

  const gridCells = createGridCells(WEAPONS);

  const isChecked = (id: string) => checkedIds.has(id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-3">
            <Link
              href="/scratch"
              className="p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                共有スクラッチ
              </h1>
              <p className="text-sm text-gray-600">
                {isComplete
                  ? 'コンプリート！'
                  : `${checkedCount} / ${totalWeapons} 種類`}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-md mx-auto p-4 pb-8">
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
              if (cell.type === 'empty') {
                return (
                  <div
                    key={`empty-${index}`}
                    className="relative aspect-square"
                  />
                );
              }

              const weapon = cell.weapon;
              const checked = isChecked(weapon.id);

              return (
                <div
                  key={weapon.id}
                  className={`relative aspect-square transition-opacity duration-300 ${
                    checked ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <div className="absolute inset-0 bg-gray-800/90 m-[1px]">
                    <Image
                      src={weapon.iconUrl || '/images/weapons/placeholder.png'}
                      alt={weapon.name}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 説明テキスト */}
        <p className="text-center text-sm text-gray-500 mt-4">
          {isComplete && '全ての武器を支給されました！'}
        </p>
      </main>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-600">読み込み中...</div>
        </div>
      }
    >
      <ShareContent />
    </Suspense>
  );
}
