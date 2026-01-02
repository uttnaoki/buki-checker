'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CheckSquare, Sparkles, Settings } from 'lucide-react';

type NavItem = {
  href: string;
  label: string;
  icon: typeof CheckSquare;
};

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'チェック', icon: CheckSquare },
  { href: '/scratch', label: 'スクラッチ', icon: Sparkles },
  { href: '/settings', label: '設定', icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <nav className="max-w-md mx-auto py-2 flex">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center gap-1 py-1 rounded-lg transition-colors ${
                isActive
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
