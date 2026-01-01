'use client';

import { useWeaponChecks } from '@/hooks/useWeaponChecks';
import { BottomNav } from '@/components/BottomNav';
import { WEAPONS } from '@/data/weapons';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const { clearAll, checkAll, getCheckedCount } = useWeaponChecks();

  const totalChecked = getCheckedCount();
  const totalWeapons = WEAPONS.length;
  const allChecked = totalChecked === totalWeapons;

  const handleClearAll = () => {
    if (totalChecked === 0) {
      return;
    }

    if (window.confirm('全てのチェックを解除しますか？')) {
      clearAll();
      router.push('/');
    }
  };

  const handleCheckAll = () => {
    if (allChecked) {
      return;
    }

    const allWeaponIds = WEAPONS.map((w) => w.id);
    checkAll(allWeaponIds);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-xl font-bold text-gray-900">設定</h1>
        </div>
      </header>

      {/* コンテンツ */}
      <main className="max-w-md mx-auto p-4 pb-20">
        <div className="space-y-6">
          {/* データ管理セクション */}
          <section>
            <h2 className="text-sm font-medium text-gray-700 mb-3">データ管理</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={handleClearAll}
                disabled={totalChecked === 0}
                className={`w-full px-4 py-4 text-left transition-colors ${
                  totalChecked === 0
                    ? 'bg-gray-50 cursor-not-allowed'
                    : 'hover:bg-red-50'
                }`}
              >
                <div className={`font-medium ${totalChecked === 0 ? 'text-gray-400' : 'text-red-700'}`}>
                  全件削除
                </div>
                <div className={`text-xs mt-1 ${totalChecked === 0 ? 'text-gray-400' : 'text-gray-600'}`}>
                  全ての武器のチェックを解除します
                </div>
              </button>
            </div>
          </section>

          {/* デバッグセクション */}
          <section>
            <h2 className="text-sm font-medium text-gray-700 mb-3">デバッグ</h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={handleCheckAll}
                disabled={allChecked}
                className={`w-full px-4 py-4 text-left transition-colors ${
                  allChecked
                    ? 'bg-gray-50 cursor-not-allowed'
                    : 'hover:bg-blue-50'
                }`}
              >
                <div className={`font-medium ${allChecked ? 'text-gray-400' : 'text-blue-700'}`}>
                  全件チェック
                </div>
                <div className={`text-xs mt-1 ${allChecked ? 'text-gray-400' : 'text-gray-600'}`}>
                  全ての武器をチェック済みにします
                </div>
              </button>
            </div>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
