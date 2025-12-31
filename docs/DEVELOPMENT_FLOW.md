# 仕様駆動開発（SDD）フロー - モバイル向け

## 概要
このプロジェクトでは、**仕様駆動開発（Specification-Driven Development, SDD）**を採用しています。仕様を先に定義し、その仕様に基づいてテスト→実装を進めることで、品質と保守性を確保します。

## 開発フロー

```
1. 仕様書作成
   ↓
2. 型定義・スキーマ作成（Zod）
   ↓
3. テスト作成（Vitest）
   ↓
4. 実装
   ↓
5. テスト実行・検証
   ↓
6. レビュー・デプロイ
```

## ステップ詳細

### 1. 仕様書作成

#### テンプレートの使用
```bash
cp docs/specs/TEMPLATE.md docs/specs/[機能名].md
```

#### 仕様書に含めるべき項目
- [ ] ユーザーストーリー
- [ ] 機能要件・非機能要件
- [ ] UI/UX仕様（モバイル画面設計）
- [ ] データ仕様（入力/出力）
- [ ] バリデーションルール
- [ ] テストケース
- [ ] パフォーマンス要件

#### モバイル特有の考慮事項
- 画面サイズ: 375px - 428px（iPhone基準）
- タッチターゲット: 最小44x44px
- ジェスチャー: タップ、スワイプ、ロングプレス
- ページロード: 3秒以内
- ブラウザ対応: iOS Safari 14+, Android Chrome 90+

### 2. 型定義・スキーマ作成

#### Zodスキーマの作成
```typescript
// src/schemas/[機能名].schema.ts
import { z } from 'zod';

export const [機能名]Schema = z.object({
  // フィールド定義
  name: z.string().min(1, 'エラーメッセージ'),
  // ...
});
```

#### 型定義の作成
```typescript
// src/types/[機能名].types.ts
import { z } from 'zod';
import * as schemas from '@/schemas/[機能名].schema';

export type [型名] = z.infer<typeof schemas.[スキーマ名]>;
```

#### パス設定
- スキーマ: `src/schemas/`
- 型定義: `src/types/`
- `@/` エイリアスで `src/` を参照可能

### 3. テスト作成

#### スキーマテストの作成
```typescript
// src/schemas/__tests__/[機能名].schema.test.ts
import { describe, it, expect } from 'vitest';
import { [スキーマ名] } from '../[機能名].schema';

describe('[スキーマ名]', () => {
  it('有効なデータを検証できる', () => {
    const valid = { /* ... */ };
    const result = [スキーマ名].safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('無効なデータでエラーになる', () => {
    const invalid = { /* ... */ };
    const result = [スキーマ名].safeParse(invalid);
    expect(result.success).toBe(false);
  });
});
```

#### コンポーネントテストの作成
```typescript
// src/components/__tests__/[Component].test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Component } from '../Component';

describe('Component', () => {
  it('正しくレンダリングされる', () => {
    render(<Component />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });
});
```

#### テスト実行コマンド
```bash
# 全テスト実行
pnpm test

# ウォッチモード
pnpm test

# カバレッジ計測
pnpm test:coverage

# UI付きテスト
pnpm test:ui
```

### 4. 実装

#### コンポーネント実装の流れ
1. 仕様書を確認
2. 型定義をインポート
3. Zodスキーマでバリデーション
4. モバイルファースト設計
5. アクセシビリティ考慮

#### 実装例
```typescript
'use client';

import { z } from 'zod';
import { userProfileSchema } from '@/schemas/user.schema';
import type { UserProfile } from '@/types/user.types';

export function UserProfileForm() {
  // Zodスキーマを使ったバリデーション
  const handleSubmit = (data: unknown) => {
    try {
      const validData = userProfileSchema.parse(data);
      // 処理...
    } catch (error) {
      if (error instanceof z.ZodError) {
        // エラーハンドリング
      }
    }
  };

  return (
    // JSX...
  );
}
```

### 5. テスト実行・検証

#### チェックリスト
- [ ] 全テストがパス
- [ ] カバレッジが80%以上
- [ ] 型エラーなし
- [ ] Lintエラーなし
- [ ] モバイルブラウザで動作確認

#### コマンド
```bash
# テスト
pnpm test run

# 型チェック
pnpm build

# Lint
pnpm lint
```

### 6. レビュー・デプロイ

#### レビューポイント
- 仕様書との整合性
- テストカバレッジ
- コード品質
- パフォーマンス
- アクセシビリティ

## ディレクトリ構造

```
buki-checker/
├── docs/                     # ドキュメント
│   ├── specs/               # 機能仕様書
│   │   ├── TEMPLATE.md     # 仕様書テンプレート
│   │   └── user-profile.md # サンプル仕様書
│   ├── design/              # UI/UX仕様
│   └── architecture/        # アーキテクチャ設計
├── src/
│   ├── schemas/             # Zodスキーマ
│   │   ├── common.schema.ts
│   │   ├── user.schema.ts
│   │   └── __tests__/       # スキーマテスト
│   ├── types/               # TypeScript型定義
│   │   ├── common.types.ts
│   │   └── user.types.ts
│   └── components/          # Reactコンポーネント
│       └── __tests__/       # コンポーネントテスト
├── app/                     # Next.js App Router
├── vitest.config.ts         # Vitestの設定
└── package.json
```

## ツールとライブラリ

### 仕様検証
- **Zod**: スキーマバリデーション
- **TypeScript**: 型安全性

### テスト
- **Vitest**: テストフレームワーク
- **Testing Library**: コンポーネントテスト
- **jsdom**: DOM環境

### パッケージ管理
- **pnpm**: 高速で効率的なパッケージマネージャー

### バージョン管理
- **anyenv + nodenv**: Nodeバージョン管理

## ベストプラクティス

### 1. 仕様ファースト
実装前に必ず仕様書を作成し、チームでレビューする。

### 2. 型安全性の徹底
Zodスキーマから型を推論し、`any`型は使用しない。

### 3. テスト駆動
仕様に基づいたテストを先に作成してから実装する。

### 4. モバイルファースト
スマホ画面を基準に設計し、タッチ操作を最適化する。

### 5. パフォーマンス重視
- 画像の遅延読み込み
- コンポーネントのメモ化
- バンドルサイズの最適化

### 6. アクセシビリティ
WCAG 2.1 AA準拠を目指し、スクリーンリーダー対応を行う。

## よくある質問

### Q: 仕様書はどのタイミングで作成する？
A: 実装を開始する前に必ず作成し、チームでレビューします。

### Q: 既存コードの仕様書は？
A: 既存コードにも段階的に仕様書を追加していきます。

### Q: テストカバレッジの目標は？
A: 80%以上を目標としますが、重要な部分は100%を目指します。

### Q: モバイルブラウザのテストは？
A: 実機またはブラウザの開発者ツールで確認します。

## 参考資料

- [Zod公式ドキュメント](https://zod.dev/)
- [Vitest公式ドキュメント](https://vitest.dev/)
- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [Testing Library](https://testing-library.com/)
- [WCAG 2.1ガイドライン](https://www.w3.org/WAI/WCAG21/quickref/)
