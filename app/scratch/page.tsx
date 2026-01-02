'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { WEAPONS } from '@/data/weapons';
import { useWeaponChecks } from '@/hooks/useWeaponChecks';
import { BottomNav } from '@/components/BottomNav';

// グリッドの列数
const GRID_COLS = 9;

export default function ResultPage() {
  const { isLoaded, isChecked, getCheckedCount } = useWeaponChecks();
  const [showCompleteAnimation, setShowCompleteAnimation] = useState(false);

  const totalWeapons = WEAPONS.length;
  const checkedCount = getCheckedCount();
  const progressPercentage = totalWeapons > 0 ? (checkedCount / totalWeapons) * 100 : 0;
  const isComplete = checkedCount === totalWeapons;

  // コンプリート時のアニメーション表示
  useEffect(() => {
    if (isLoaded && isComplete) {
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
  }, [isLoaded, isComplete]);

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
          <h1 className="text-xl font-bold text-gray-900">スクラッチ</h1>
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
            className="object-cover"
            priority
          />

          {/* 武器アイコングリッド */}
          <div
            className="absolute inset-0 grid gap-0"
            style={{
              gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
            }}
          >
            {WEAPONS.map((weapon) => {
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
