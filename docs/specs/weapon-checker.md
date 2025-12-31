# 武器チェッカー機能仕様書

## 基本情報
- **機能名**: スプラトゥーン3 武器チェッカー
- **作成日**: 2025-12-31
- **更新日**: 2025-12-31
- **担当者**: 開発チーム
- **ステータス**: Draft

## 概要
スプラトゥーン3の全武器を表示し、練習済み/未練習をチェックできる機能

## ユーザーストーリー
**As a** スプラトゥーン3プレイヤー
**I want** 全ての武器の練習状況を管理したい
**So that** どの武器を使ったか、まだ使っていないかを簡単に確認できる

## 要件

### 機能要件
- [x] 武器をカテゴリ別に表示
- [x] 武器をタップしてチェック/未チェックを切り替え
- [x] チェック状態をローカルストレージに保存
- [ ] チェック済み/未チェック件数の表示
- [ ] カテゴリごとの進捗表示
- [ ] 全チェック/全解除機能
- [ ] フィルター機能（チェック済みのみ/未チェックのみ）

### 非機能要件
- [x] パフォーマンス: ページロード3秒以内
- [x] レスポンシブ: モバイルファースト設計（375px-428px）
- [x] タッチターゲット: 最小44x44px
- [x] ブラウザ対応: iOS Safari 14+, Android Chrome 90+
- [x] データ永続化: ローカルストレージ

## UI/UX仕様

### モバイル画面設計
```
┌────────────────────────────┐
│  武器チェッカー    [進捗]   │
├────────────────────────────┤
│  [全て] [未] [済] [リセット] │ ← フィルター
├────────────────────────────┤
│  ▼ シューター (12/45)       │
│  □ わかばシューター         │
│  ☑ スプラシューター         │
│  □ プロモデラーMG          │
│  ...                       │
│                            │
│  ▼ ブラスター (0/18)        │
│  □ ホットブラスター         │
│  □ ノヴァブラスター         │
│  ...                       │
│                            │
│  ▼ ローラー (5/24)         │
│  ...                       │
└────────────────────────────┘
```

### インタラクション
- タップ: 武器のチェック/未チェック切り替え
- カテゴリヘッダータップ: カテゴリの展開/折りたたみ
- フィルタータップ: 表示する武器の絞り込み

### 視覚的フィードバック
- チェック済み: ☑ アイコン + 背景色変更
- 未チェック: □ アイコン + 通常背景
- タップ時: リップルエフェクト

## データ仕様

### 武器カテゴリ（スプラトゥーン3）
```typescript
enum WeaponCategory {
  SHOOTER = 'シューター',
  BLASTER = 'ブラスター',
  ROLLER = 'ローラー',
  BRUSH = 'フデ',
  CHARGER = 'チャージャー',
  SLOSHER = 'スロッシャー',
  SPINNER = 'スピナー',
  MANEUVER = 'マニューバー',
  SHELTER = 'シェルター',
  STRINGER = 'ストリンガー',
  WIPER = 'ワイパー'
}
```

### 武器データ
```typescript
type Weapon = {
  id: string;           // 一意のID
  name: string;         // 武器名（例: 'わかばシューター'）
  category: WeaponCategory;
  iconUrl?: string;     // 後で追加予定
}
```

### チェック状態
```typescript
type WeaponCheckState = {
  weaponId: string;
  checked: boolean;
  checkedAt?: string;   // ISO8601形式
}

// ローカルストレージのキー
const STORAGE_KEY = 'splatoon3-weapon-checks';

// ローカルストレージの構造
type StorageData = {
  version: string;      // データバージョン
  checks: Record<string, WeaponCheckState>;
  lastUpdated: string;  // ISO8601形式
}
```

## 技術仕様

### 使用するコンポーネント
- `WeaponList` - 武器一覧表示
- `WeaponCategory` - カテゴリセクション
- `WeaponItem` - 個別の武器アイテム
- `ProgressBar` - 進捗表示
- `FilterButtons` - フィルターボタン群

### 状態管理
- `useState` - チェック状態、フィルター状態
- `useLocalStorage` - カスタムフック（ローカルストレージ連携）
- `useMemo` - フィルタリング結果のメモ化

### ローカルストレージ連携
```typescript
// データの読み込み
const loadChecks = (): StorageData => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { version: '1.0', checks: {}, lastUpdated: new Date().toISOString() };
};

// データの保存
const saveChecks = (data: StorageData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
```

### パフォーマンス最適化
- [x] 武器リストのメモ化
- [x] 仮想スクロール（武器数が多い場合）
- [x] チェック状態変更のデバウンス
- [x] コンポーネントの遅延読み込み

## テスト仕様

### テストケース
1. **正常系**
   - [x] 武器データの読み込み
   - [x] カテゴリ別の表示
   - [x] チェック/未チェックの切り替え
   - [x] ローカルストレージへの保存
   - [x] ローカルストレージからの読み込み

2. **異常系**
   - [x] ローカルストレージが使用できない場合
   - [x] 不正なデータ形式の場合
   - [x] データバージョンが異なる場合

3. **モバイル特有**
   - [x] タッチイベントの動作確認
   - [x] スクロール時のパフォーマンス
   - [x] 画面回転時のレイアウト

### テストコードパス
- スキーマテスト: `src/schemas/__tests__/weapon.schema.test.ts`
- コンポーネントテスト: `src/components/__tests__/WeaponChecker.test.tsx`
- フックテスト: `src/hooks/__tests__/useLocalStorage.test.ts`

## 実装チェックリスト
- [x] 仕様書作成
- [ ] 武器データの準備（マスターデータ）
- [ ] 型定義作成（src/types/weapon.types.ts）
- [ ] Zodスキーマ作成（src/schemas/weapon.schema.ts）
- [ ] テストコード作成
- [ ] useLocalStorageフック実装
- [ ] WeaponItemコンポーネント実装
- [ ] WeaponCategoryコンポーネント実装
- [ ] WeaponListコンポーネント実装
- [ ] メインページ実装
- [ ] テスト実行・合格
- [ ] レビュー完了
- [ ] デプロイ

## Phase 2（将来的な拡張）
- [ ] 武器アイコンの追加
- [ ] 検索機能
- [ ] ソート機能（名前順、チェック順など）
- [ ] データのエクスポート/インポート
- [ ] 複数のチェックリスト管理
- [ ] ダークモード対応
- [ ] PWA対応（オフライン利用）

## 参考資料
- スプラトゥーン3 公式サイト: https://www.nintendo.co.jp/switch/av5ja/
- Splatoon3.ink（非公式データソース）
