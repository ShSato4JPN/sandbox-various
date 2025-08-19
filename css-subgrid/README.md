完全解説をまとめます！📚

## 1. なぜ行の高さが全て同じになるのか

### CSS Gridの基本動作原理

```css
grid-template-rows: auto repeat(5, 1fr)
```

**キーポイント**:

- **同一行内の全セル**は自動的に同じ高さになる
- `auto`: コンテンツに応じて高さを決定
- CSS Gridが**行ごと**に最大高さを計算し、その行の全セルに適用

### 具体例

```
行1: [セルA: 50px] [セルB: 30px] [セルC: 40px]
→ CSS Grid処理後: [50px] [50px] [50px] (最大値に統一)

行2: [セルD: 80px] [セルE: 60px] [セルF: 70px]
→ CSS Grid処理後: [80px] [80px] [80px] (最大値に統一)
```

### 実装での適用

```typescript
// ヘッダー行: gridRow: 1
// データ行1: gridRow: 2
// データ行2: gridRow: 3
// ...

// 同じgridRowを持つ全セルが自動的に同じ高さになる
```

---

## 2. 結合はどのようなロジックで実装されているか

### A. Grid座標による結合

```typescript
// 通常セル: 1行ずつ配置
style={{ gridRow: labelIndex + 2 }}  // 行2, 3, 4, 5, 6

// 結合セル: 複数行をスパン
style={{ gridRow: `1 / ${labels.length + 2}` }}  // 行1〜6まで結合
```

### B. 条件分岐による表示制御

```typescript
// フラグがtrueの列のみ結合セルを表示
{columnOrder.map((originalColumnIndex, displayIndex) =>
  isFlaggedColumn(originalColumnIndex) && (
    <div style={{ gridRow: `1 / ${labels.length + 2}` }}>
      結合
    </div>
  )
)}

// フラグがfalseの列は通常セルを表示
{!isFlaggedColumn(originalColumnIndex) && `ユーザー ${originalColumnIndex + 1}`}
```

### C. レイヤー構造

```
レイヤー1: 通常のヘッダーセル (gridRow: 1)
レイヤー2: 通常のデータセル (gridRow: 2,3,4,5,6)
レイヤー3: 結合セル (gridRow: 1/7) ← 上に重なって表示
```

---

## 3. 注意点

### A. **グリッド座標の一貫性**

```typescript
❌ 危険: gridColumnの値が重複すると要素が重なる
✅ 安全: displayIndexで確実に異なる列に配置
```

### B. **ドラッグ&ドロップでの状態管理**

```typescript
❌ 危険: ドラッグ中にfocusedColumnを変更
✅ 安全: isDragging中はホバー処理を無効化

onMouseEnter={() => !isDragging && setFocusedColumn(displayIndex)}
```

### C. **配列インデックスの区別**

```typescript
originalColumnIndex: 元のデータ配列でのインデックス (データアクセス用)
displayIndex: 表示上のインデックス (グリッド配置用)

// ドラッグで順序が変わっても、データアクセスは元のインデックスで
columnData[labelIndex][originalColumnIndex]  // ✅ 正しい
columnData[labelIndex][displayIndex]         // ❌ 間違い
```

### D. **ブラウザ互換性**

```typescript
// CSS Grid行スパン記法の違い
gridRow: `1 / ${end}`     // 標準的な記法
gridRow: `1 / span ${n}`  // 代替記法 (古いブラウザ対応)
```

---

## 4. 動作原理

### A. **レンダリングフロー**

```
1. columnOrder配列を基に表示順序を決定
2. 各列をdisplayIndexでグリッドに配置
3. isFlaggedColumn()で結合判定
4. 結合列: 1つの大きなセル作成
5. 通常列: ヘッダー + データセルを個別作成
6. CSS Gridが自動的に高さを調整
```

### B. **ドラッグ処理フロー**

```
1. onDragStart: ドラッグ開始位置を記録
2. onDragOver: ドロップ可能エリアの視覚フィードバック
3. onDrop: columnOrder配列の要素を移動
4. 再レンダリング: 新しい順序で表示
```

### C. **状態の優先順位**

```
isDragging > focusedColumn > 通常状態

- ドラッグ中: ホバーボーダー無効、ドラッグフィードバック有効
- ホバー中: 青いボーダー表示
- 通常時: 何もなし
```

---

## 5. 実装にあたり必要な知識

### A. **CSS Grid必須知識**

```css
/* 基本概念 */
grid-template-columns: repeat(6, 1fr);  /* 6列、等幅 */
grid-template-rows: auto repeat(5, 1fr); /* ヘッダー+5データ行 */

/* セル配置 */
grid-column: 3;          /* 3列目に配置 */
grid-row: 2;             /* 2行目に配置 */
grid-row: 1 / 6;         /* 1〜6行目をスパン */

/* 重要: 同じgrid-rowの要素は自動的に同じ高さになる */
```

### B. **React状態管理パターン**

```typescript
// 配列の順序変更
const arrayMove = (array, oldIndex, newIndex) => {
  const newArray = [...array];  // 元配列を変更しない
  const [removed] = newArray.splice(oldIndex, 1);
  newArray.splice(newIndex, 0, removed);
  return newArray;
};

// 条件付きレンダリング
{condition && <Component />}        // 条件がtrueの時のみ表示
{condition ? <A /> : <B />}         // 条件分岐
{array.map(item => condition(item) && <Item />)}  // 配列内条件フィルタ
```

### C. **HTML5 Drag & Drop API**

```typescript
// 必須イベントハンドラ
onDragStart: ドラッグ開始時 (draggable要素で発火)
onDragOver: ドラッグ中の通過 (preventDefault必須)
onDrop: ドロップ時 (preventDefault必須)
onDragEnd: ドラッグ終了時 (成功/失敗問わず)

// データ転送
e.dataTransfer.setDragImage(image, x, y);  // カスタムドラッグ画像
e.dataTransfer.effectAllowed = 'move';     // ドラッグ効果指定
```

### D. **TypeScript型定義**

```typescript
// Props設計の基本
interface TableData {
  labels: string[];
  data: (string | number)[][];
  columnFlags?: boolean[];  // オプショナル (後方互換性)
}

// イベントハンドラの型
onDragStart: (e: React.DragEvent, index: number) => void;
onMouseEnter: () => void;
```

### E. **パフォーマンス考慮点**

```typescript
// ❌ 避けるべき: 毎回新しい配列/オブジェクト作成
style={{ gridRow: `1 / ${labels.length + 2}` }}  // 毎回新しい文字列

// ✅ 推奨: useMemoで最適化
const gridRowSpan = useMemo(() => `1 / ${labels.length + 2}`, [labels.length]);

// ❌ 避けるべき: 不要な再レンダリング
{data.map((item, index) => <Cell key={index} />)}  // indexをkeyにしない

// ✅ 推奨: 安定したkey使用
{data.map((item, index) => <Cell key={item.id || `cell-${index}`} />)}
```

---

## 🎯 実装成功のポイント

1. **CSS Gridを信頼する**: 高さ調整はGridに任せる
2. **状態を明確に分離**: 表示順序 vs データ順序
3. **段階的実装**: まずは静的表示 → ホバー → ドラッグの順で
4. **ブラウザDevToolsを活用**: Grid Inspectorで配置を確認
5. **エッジケースをテスト**: 長いテキスト、空データ、単一列など

この知識があれば、安定したテーブルコンポーネントが実装できます！🚀
