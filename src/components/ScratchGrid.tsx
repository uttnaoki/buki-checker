'use client';

import Image from 'next/image';
import { WEAPONS } from '@/data/weapons';

// グリッドの列数
const GRID_COLS = 9;

// グリッドセルの種類
type GridCell =
  | { type: 'weapon'; weapon: (typeof WEAPONS)[number] }
  | { type: 'empty' };

// ブキを正方形グリッドに配置し、空きセルを中央に配置する
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

const gridCells = createGridCells(WEAPONS);

// チェック済みアイテムの透明度を計算（進捗率に応じて変化）
function calcCheckedOpacity(checkedCount: number, totalCount: number): number {
  const rate = checkedCount / totalCount;
  if (rate <= 0.5) return 0.3;
  if (rate <= 0.75) return 0.2;
  return 0.1;
}

interface ScratchGridProps {
  checkedIds: Set<string>;
  showCompleteAnimation?: boolean;
}

export function ScratchGrid({
  checkedIds,
  showCompleteAnimation = false,
}: ScratchGridProps) {
  const isChecked = (id: string) => checkedIds.has(id);
  const isComplete = checkedIds.size === WEAPONS.length;
  const checkedOpacity = calcCheckedOpacity(checkedIds.size, WEAPONS.length);

  return (
    <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-lg">
      {/* 完了画像 */}
      <Image
        src="/images/complete.jpg"
        alt="コンプリート画像"
        fill
        className="object-cover"
        priority
      />

      {/* ブキアイコングリッド */}
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
              style={{ opacity: checked ? checkedOpacity : 1 }}
            >
              <div className="absolute inset-0 bg-gray-800/90 m-[1px]">
                {weapon && (
                  <Image
                    src={weapon.iconUrl || '/images/weapons/placeholder.png'}
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
  );
}
