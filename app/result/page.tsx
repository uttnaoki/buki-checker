'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { WEAPONS } from '@/data/weapons';
import { useWeaponChecks } from '@/hooks/useWeaponChecks';
import { BottomNav } from '@/components/BottomNav';

// 武器の位置を事前に計算（ランダムだが固定）
function generatePositions(count: number, seed: number = 42) {
  const positions: { x: number; y: number; rotate: number }[] = [];
  let s = seed;

  const random = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  for (let i = 0; i < count; i++) {
    positions.push({
      x: random() * 80 + 10, // 10% - 90%
      y: random() * 70 + 15, // 15% - 85%
      rotate: random() * 40 - 20, // -20 ~ 20度
    });
  }
  return positions;
}

export default function ResultPage() {
  const { isLoaded, isChecked, getCheckedCount } = useWeaponChecks();

  const positions = useMemo(() => generatePositions(WEAPONS.length), []);

  const uncheckedWeapons = useMemo(() => {
    return WEAPONS.filter((weapon) => !isChecked(weapon.id));
  }, [isChecked]);

  const totalWeapons = WEAPONS.length;
  const checkedCount = getCheckedCount();
  const progressPercentage = totalWeapons > 0 ? (checkedCount / totalWeapons) * 100 : 0;
  const isComplete = checkedCount === totalWeapons;

  if (!isLoaded) {
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
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-xl font-bold text-gray-900">リザルト</h1>
          <p className="text-sm text-gray-600 mt-1">
            {isComplete
              ? 'コンプリート！'
              : `あと ${totalWeapons - checkedCount} 種類`}
          </p>
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
            className={`object-cover transition-all duration-500 ${
              isComplete ? 'blur-0 brightness-100' : 'blur-sm brightness-75'
            }`}
            priority
          />

          {/* 未チェックの武器アイコン */}
          {uncheckedWeapons.map((weapon) => {
            const weaponIndex = WEAPONS.findIndex((w) => w.id === weapon.id);
            const pos = positions[weaponIndex];

            return (
              <div
                key={weapon.id}
                className="absolute w-12 h-12 transition-all duration-300"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
                }}
              >
                <div className="relative w-full h-full bg-gray-800/80 rounded-lg p-1 shadow-md">
                  <Image
                    src={weapon.iconUrl || '/images/weapons/placeholder.png'}
                    alt={weapon.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              </div>
            );
          })}

          {/* コンプリート時のオーバーレイ */}
          {isComplete && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 px-6 py-3 rounded-full">
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
