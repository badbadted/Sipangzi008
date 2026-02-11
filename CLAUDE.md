# Sipangzi008 - 待辦清單系統

## 專案概覽

一個多使用者待辦事項管理應用程式，支援 TED 與 KU 兩位使用者，具備任務建立、篩選與逾期提醒功能。部署於 Vercel。

## 技術棧

- **框架**: React 19 + TypeScript 5.9
- **建置工具**: Vite 6.2
- **樣式**: Tailwind CSS 4 (透過 `@tailwindcss/vite` 插件)
- **圖示**: lucide-react
- **程式碼品質**: ESLint 9
- **儲存**: localStorage（key: `todos`）

## 專案結構

```
src/
├── App.tsx                      # 根元件，組合所有子元件與佈局
├── main.tsx                     # React 進入點
├── index.css                    # 全域樣式
├── types/
│   └── todo.ts                  # 型別定義 (Todo, FilterType, UserFilterType, UserId)
├── hooks/
│   └── useTodos.ts              # 核心業務邏輯 Hook (CRUD、篩選、排序、localStorage 持久化)
├── components/
│   ├── TodoForm.tsx             # 新增待辦表單 (文字 + 使用者 + 預計完成日期)
│   ├── TodoItem.tsx             # 單一待辦項目 (完成切換、行內編輯、日期編輯、刪除、逾期標示)
│   ├── TodoList.tsx             # 待辦列表容器
│   └── TodoFilter.tsx           # 狀態篩選下拉選單 (全部/未完成/已完成)
```

## 核心功能

### 待辦事項 CRUD
- **新增**: 輸入文字 + 選擇使用者 (TED/KU) + 必填預計完成日期
- **編輯**: 雙擊待辦文字進入行內編輯模式
- **刪除**: 點擊垃圾桶圖示移除
- **完成切換**: 點擊圓形按鈕標記完成/未完成

### 篩選系統
- **使用者篩選** (`UserFilterType`): 全部 / TED / KU
- **狀態篩選** (`FilterType`): 全部 / 未完成 / 已完成
- 兩層篩選可疊加使用

### 排序
- 依「預計完成日期」升冪排序，無日期的排在最後

### 逾期提醒
- 未完成且預計完成日期早於今天的項目，以紅色背景 (`bg-red-50`) 與紅字標示「逾期」

### 日期編輯
- 點擊日曆圖示進入日期編輯模式，選取後即時儲存

## 資料模型

```typescript
type UserId = 'TED' | 'KU';

interface Todo {
  id: string;                    // crypto.randomUUID()
  text: string;                  // 待辦內容
  completed: boolean;            // 完成狀態
  userId: UserId;                // 所屬使用者
  createdAt?: number;            // 建立時間戳
  plannedCompletionDate?: number; // 預計完成日期時間戳
}
```

## 佈局

- 單欄置中佈局，最大寬度 `max-w-xl`

## 開發指令

```bash
npm run dev      # 啟動開發伺服器
npm run build    # TypeScript 編譯 + Vite 建置
npm run lint     # ESLint 檢查
npm run preview  # 預覽建置結果
```

## 開發慣例

- 語言: 繁體中文介面，程式碼中的 UI 文字使用中文
- 元件: 函式元件 + Hooks，不使用 class 元件
- 樣式: 使用 Tailwind utility classes，不使用獨立 CSS 檔案（除 index.css）
- 狀態管理: 使用 React 內建 useState/useMemo，無外部狀態庫
- 資料持久化: localStorage，有資料遷移機制 (`migrateTodo`)
