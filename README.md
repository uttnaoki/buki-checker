# buki-checker

スプラトゥーン3 サーモンラン ブキチェッカー - モバイル向けアプリ

ランダム編成で支給されたブキを記録・管理できるツールです。

## 開発アプローチ

このプロジェクトは**仕様駆動開発（Specification-Driven Development, SDD）**を採用しています。

### 開発フロー
1. 仕様書作成
2. 型定義・スキーマ作成（Zod）
3. テスト作成（Vitest）
4. 実装
5. テスト実行・検証

詳細は [開発フローガイド](./docs/DEVELOPMENT_FLOW.md) を参照してください。

## セットアップ

### 前提条件
- Node.js 23.3.0（anyenv + nodenvで管理）
- pnpm（パッケージマネージャー）

### インストール

```bash
# 依存パッケージのインストール
pnpm install
```

### 開発サーバーの起動

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 利用可能なコマンド

```bash
# 開発サーバー起動
pnpm dev

# 本番ビルド
pnpm build

# 本番サーバー起動
pnpm start

# Lint実行
pnpm lint

# テスト実行
pnpm test

# テスト（UIモード）
pnpm test:ui

# カバレッジ計測
pnpm test:coverage
```

## プロジェクト構造

```
buki-checker/
├── docs/                     # ドキュメント
│   ├── specs/               # 機能仕様書
│   ├── design/              # UI/UX仕様
│   └── architecture/        # アーキテクチャ設計
├── src/
│   ├── schemas/             # Zodスキーマ定義
│   ├── types/               # TypeScript型定義
│   └── components/          # Reactコンポーネント
├── app/                     # Next.js App Router
└── vitest.config.ts         # Vitestの設定
```

## 技術スタック

- **フレームワーク**: Next.js 16.1 (App Router)
- **言語**: TypeScript 5.9
- **UI**: React 19.2, Tailwind CSS 4.1
- **バリデーション**: Zod 4.3
- **テスト**: Vitest 3.2, Testing Library
- **パッケージ管理**: pnpm 10.27
- **Node管理**: anyenv + nodenv

## 開発ガイド

### 新機能の追加手順

1. **仕様書作成**
   ```bash
   cp docs/specs/TEMPLATE.md docs/specs/[機能名].md
   ```

2. **スキーマ作成**
   - `src/schemas/[機能名].schema.ts` を作成
   - Zodスキーマを定義

3. **型定義作成**
   - `src/types/[機能名].types.ts` を作成
   - スキーマから型を推論

4. **テスト作成**
   - `src/schemas/__tests__/[機能名].schema.test.ts` を作成
   - テストケースを実装

5. **実装**
   - コンポーネントを実装
   - スキーマでバリデーション

6. **検証**
   ```bash
   pnpm test
   pnpm build
   ```

詳細は [開発フローガイド](./docs/DEVELOPMENT_FLOW.md) を参照してください。

## 参考資料

- [開発フローガイド](./docs/DEVELOPMENT_FLOW.md)
- [仕様書テンプレート](./docs/specs/TEMPLATE.md)
- [サンプル仕様書](./docs/specs/user-profile.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zod Documentation](https://zod.dev/)
- [Vitest Documentation](https://vitest.dev/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
