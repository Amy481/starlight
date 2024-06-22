# Starlight - 文章創作平台

Starlight 是一個使用 Nuxt 3 開發的文章創作平台，提供用戶登入、登出以及文章的 CRUD（創建、讀取、更新、刪除）功能

## 開始使用

### 專案設置

請確保已安裝所需的依賴項：

```bash
# 使用 npm
npm install

# 使用 pnpm
pnpm install

# 使用 yarn
yarn install

# 使用 bun
bun install
```

### 開發伺服器

在 `http://localhost:3000` 上啟動開發伺服器：

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## 設置

請根據.env.example 設置.env

```makefile
JWT_SIGN_SECRET= jwt加密密鑰
REMEMBER_ME_ENCRYPTION_KEY= 記住我的加密密鑰
DATABASE_URL= 資料庫連結
```

完成後，請執行`npx prisma migrate dev --name init` 執行 prisma 資料表遷移

## 功能

starlight 共包含以下功能

- 用戶相關功能
  - 註冊、登入/登出
  - 記住我
  - 用戶文章列表頁
- 文章相關功能
  - 文章 CRUD 功能
  - 文章列表無限下滑載入
  - 文章關聯標籤
  - 文章收藏數計算
  - 文章閱覽數計算
- 其他
  - 權限不足的導航守衛
  - 意外狀態處理
  - error 頁面
