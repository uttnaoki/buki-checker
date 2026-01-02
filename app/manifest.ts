import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'サーモンラン ブキチェッカー',
    short_name: 'ブキチェッカー',
    description:
      'スプラトゥーン3 サーモンラン ブキチェッカー - ランダム編成で支給されたブキを記録・管理',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    start_url: '/',
    display: 'standalone',
    background_color: '#f9fafb',
    theme_color: '#22c55e',
  };
}
