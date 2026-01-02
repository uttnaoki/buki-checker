'use client';

import { useState, useEffect, useMemo } from 'react';
import { Share2 } from 'lucide-react';
import { WEAPONS } from '@/data/weapons';
import { useWeaponCheckStore } from '@/stores/weaponCheckStore';
import { useSettingsStore, DEFAULT_NAME } from '@/stores/settingsStore';
import { BottomNav } from '@/components/BottomNav';
import { ScratchGrid } from '@/components/ScratchGrid';
import { ProgressBar } from '@/components/ProgressBar';

export default function ScratchPage() {
  const { hasHydrated, checkedIndices, getEncodedProgress } =
    useWeaponCheckStore();
  const { name: rawName } = useSettingsStore();
  const name = rawName || DEFAULT_NAME;
  const [showCompleteAnimation, setShowCompleteAnimation] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  // checkedIndicesからcheckedIds (Set<string>) を生成
  const checkedIds = useMemo(() => {
    const ids = new Set<string>();
    for (const weapon of WEAPONS) {
      if (checkedIndices.has(weapon.index)) {
        ids.add(weapon.id);
      }
    }
    return ids;
  }, [checkedIndices]);

  const totalWeapons = WEAPONS.length;
  const checkedCount = checkedIds.size;
  const isComplete = checkedCount === totalWeapons;

  // 共有ボタンのクリックハンドラ
  const handleShare = async () => {
    const encoded = getEncodedProgress();
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const shareUrl = `${baseUrl}/share?p=${encoded}&name=${encodeURIComponent(
      name
    )}`;

    // Web Share APIが利用可能な場合
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${name}のスクラッチ`,
          text: `${checkedCount}/${totalWeapons}種類のブキをチェックしました！`,
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
            <h1 className="text-xl font-bold text-gray-900">
              {name}のスクラッチ
            </h1>
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
      <main className="max-w-md mx-auto p-4 pb-32">
        <ProgressBar
          checkedCount={checkedCount}
          totalCount={totalWeapons}
          label="達成度"
        />

        <ScratchGrid
          checkedIds={checkedIds}
          showCompleteAnimation={showCompleteAnimation}
        />

        {/* 説明テキスト */}
        <p className="text-center text-sm text-gray-500 mt-4">
          {isComplete && '全てのブキを支給されました！'}
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
