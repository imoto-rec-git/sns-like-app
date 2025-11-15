# SNS-like App

Next.js App Router、Supabase、Prisma、Clerkを使用したSNSライクなWebアプリケーションです。

## 📝 プロジェクト概要

このプロジェクトは、モダンなWebアプリケーション開発技術を学習するために作成したSNSアプリケーションです。サーバーコンポーネントとクライアントコンポーネントの使い分け、Server Actions、認証フロー、データベース設計などを実践的に学ぶことができます。

## ✨ 主な機能

### 実装済み機能

- 🔐 **認証機能**
  - Clerkによるユーザー認証
  - サインアップ・サインイン
  - Webhookによるユーザー情報の同期

- 📝 **投稿機能**
  - 投稿の作成（最大140文字）
  - 投稿一覧の表示
  - リアルタイムな投稿の反映

- 👤 **ユーザー機能**
  - プロフィールページ
  - ユーザー情報の表示

### データモデル

- **User**: ユーザー情報（Clerk IDと連携）
- **Post**: 投稿情報
- **Like**: いいね機能
- **Reply**: 返信機能
- **Follow**: フォロー・フォロワー機能

## 🛠️ 技術スタック

### フロントエンド

- **[Next.js](https://nextjs.org/)** (v14.2.4) - App Routerを使用したReactフレームワーク
- **[React](https://react.dev/)** (v18) - UIライブラリ
- **[TypeScript](https://www.typescriptlang.org/)** (v5) - 型安全な開発
- **[Tailwind CSS](https://tailwindcss.com/)** (v3.4.1) - ユーティリティファーストのCSSフレームワーク
- **[Radix UI](https://www.radix-ui.com/)** - アクセシブルなUIコンポーネント
- **[Lucide React](https://lucide.dev/)** - アイコンライブラリ

### バックエンド

- **[Prisma](https://www.prisma.io/)** (v5.16.1) - 次世代のNode.js/TypeScript ORM
- **[PostgreSQL](https://www.postgresql.org/)** - データベース
- **[Clerk](https://clerk.com/)** (@clerk/nextjs v5.1.6) - 認証・ユーザー管理サービス
- **[Zod](https://zod.dev/)** (v3.23.8) - スキーマバリデーション

### その他

- **[class-variance-authority](https://cva.style/docs)** - バリアントベースのスタイリング
- **[clsx](https://github.com/lukeed/clsx)** & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - クラス名の結合・マージ

## 🚀 セットアップ手順

### 前提条件

- Node.js 20.15.1 以上
- pnpm（推奨）
- PostgreSQLデータベース
- Clerkアカウント

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd sns-like-app
```

### 2. 依存関係のインストール

```bash
pnpm install
```

### 3. 環境変数の設定

`.env.example`を`.env`にコピーして、必要な環境変数を設定してください。

```bash
cp .env.example .env
```

必要な環境変数：

```env
# Database
DATABASE_URL="postgresql://..."

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

### 4. データベースのセットアップ

```bash
# Prismaマイグレーションの実行
pnpm prisma migrate dev

# Prisma Clientの生成
pnpm prisma generate
```

### 5. 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

## 📂 プロジェクト構成

```
sns-like-app/
├── app/                      # Next.js App Router
│   ├── api/                 # API Routes
│   │   └── callback/        # Clerk Webhook
│   ├── profile/             # プロフィールページ
│   ├── sign-in/             # サインインページ
│   ├── sign-up/             # サインアップページ
│   ├── layout.tsx           # ルートレイアウト
│   ├── page.tsx             # ホームページ
│   └── globals.css          # グローバルスタイル
├── components/              # Reactコンポーネント
│   ├── component/           # アプリケーションコンポーネント
│   │   ├── Header.tsx
│   │   ├── LeftSidebar.tsx
│   │   ├── RightSidebar.tsx
│   │   ├── MainContent.tsx
│   │   ├── PostForm.tsx     # 投稿フォーム
│   │   ├── PostList.tsx     # 投稿一覧
│   │   ├── Post.tsx         # 投稿表示
│   │   └── ...
│   └── ui/                  # 再利用可能なUIコンポーネント
├── lib/                     # ユーティリティとヘルパー
│   ├── actions.ts           # Server Actions
│   ├── prisma.ts            # Prismaクライアント
│   ├── postDataFetcher.ts   # データフェッチャー
│   └── utils.ts             # ユーティリティ関数
├── prisma/                  # Prismaスキーマとマイグレーション
│   ├── schema.prisma        # データベーススキーマ
│   └── migrations/          # マイグレーション履歴
├── public/                  # 静的ファイル
├── middleware.ts            # Next.js Middleware（Clerk認証）
└── package.json
```

## 🎓 学習ポイント

このプロジェクトで学べる主要な技術概念：

### 1. Next.js App Router

- サーバーコンポーネントとクライアントコンポーネントの使い分け
- `use client`ディレクティブの適切な配置
- Server Actionsによるフォーム処理

### 2. Server Actions

- `'use server'`を使用したサーバーサイド処理
- `useFormState`によるフォーム状態管理
- `revalidatePath`によるキャッシュ更新

### 3. Prisma ORM

- リレーショナルデータベースのスキーマ設計
- マイグレーション管理
- 型安全なデータベースクエリ

### 4. Clerk認証

- ドロップイン認証コンポーネント
- Middlewareによる保護されたルート
- Webhookによるユーザーデータ同期

### 5. TypeScript

- 型安全な開発環境
- インターフェースとType定義
- Zodによる実行時バリデーション

## 🔧 開発コマンド

```bash
# 開発サーバーの起動
pnpm dev

# プロダクションビルド
pnpm build

# プロダクションサーバーの起動
pnpm start

# リンターの実行
pnpm lint

# Prisma Studio（データベースGUI）の起動
pnpm prisma studio

# マイグレーションの作成
pnpm prisma migrate dev --name <migration-name>
```

## 📚 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

## 📝 今後の開発予定

- [ ] いいね機能の実装
- [ ] 返信・コメント機能の実装
- [ ] フォロー・フォロワー機能の実装
- [ ] 画像アップロード機能
- [ ] ハッシュタグ機能
- [ ] 通知機能
- [ ] リアルタイム更新（WebSocket/SSE）

## ⚠️ 注意事項

このプロジェクトは学習目的で作成されたものです。本番環境での使用を想定していません。

- セキュリティ対策が不十分な可能性があります
- パフォーマンス最適化が十分でない可能性があります
- エラーハンドリングが不完全な可能性があります

## 📄 ライセンス

MIT

---

**Created for learning purposes** 🚀
