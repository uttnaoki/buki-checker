'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { WEAPONS } from '@/data/weapons';
import { decodeProgress } from '@/utils/progressEncoder';
import { DEFAULT_NAME } from '@/stores/settingsStore';
import { ScratchGrid } from '@/components/ScratchGrid';
import { ProgressBar } from '@/components/ProgressBar';

const ShareContent = () => {
  const searchParams = useSearchParams();
  const progressParam = searchParams.get('p') || '';
  const name = searchParams.get('name') || DEFAULT_NAME;
  const checkedIds = decodeProgress(progressParam);

  const totalWeapons = WEAPONS.length;
  const checkedCount = checkedIds.size;
  const isComplete = checkedCount === totalWeapons;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-md mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/scratch"
              className="p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {name}のスクラッチ
              </h1>
              <p className="text-sm text-gray-600">
                {isComplete
                  ? 'コンプリート！'
                  : `あと ${totalWeapons - checkedCount} 種類`}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-md mx-auto p-4 pb-8">
        <ProgressBar
          checkedCount={checkedCount}
          totalCount={totalWeapons}
          label="達成度"
        />

        <ScratchGrid checkedIds={checkedIds} />

        {/* 説明テキスト */}
        <p className="text-center text-sm text-gray-500 mt-4">
          {isComplete && '全てのブキを支給されました！'}
        </p>
      </main>
    </div>
  );
}

const SharePage = () => {
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
};

export default SharePage;
