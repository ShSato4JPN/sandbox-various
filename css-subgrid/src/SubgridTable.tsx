import React, { useRef, useState } from "react";

interface ColumnData {
  labels: string[];
  data: (string | number)[][];
  columnFlags?: boolean[]; // 結合表示フラグの配列
}

interface SubgridTableProps {
  data: ColumnData;
}

export default function SubgridTable({ data }: SubgridTableProps) {
  const { labels, data: columnData, columnFlags } = data;
  const numRows = columnData[0]?.length || 0;
  const [focusedColumn, setFocusedColumn] = useState<number | null>(null);
  const [columnOrder, setColumnOrder] = useState<number[]>(() =>
    Array.from({ length: numRows }, (_, i) => i)
  );
  const [isDragging, setIsDragging] = useState(false);
  const [draggedColumn, setDraggedColumn] = useState<number | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<number | null>(null);
  const dragStartX = useRef(0);
  const dragStartIndex = useRef(-1);

  // フラグがtrueの列を特定
  const isFlaggedColumn = (index: number) => {
    return columnFlags ? columnFlags[index] === true : false;
  };

  // 配列要素を移動する関数
  const arrayMove = (array: number[], oldIndex: number, newIndex: number) => {
    const newArray = [...array];
    const [removed] = newArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, removed);
    return newArray;
  };

  // ドラッグ開始
  const handleDragStart = (e: React.DragEvent, columnIndex: number) => {
    setIsDragging(true);
    setDraggedColumn(columnIndex);
    dragStartX.current = e.clientX;
    dragStartIndex.current = columnIndex;

    // ドラッグイメージを透明にする
    const dragImage = new Image();
    dragImage.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    e.dataTransfer.effectAllowed = "move";
  };

  // ドラッグオーバー
  const handleDragOver = (e: React.DragEvent, columnIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(columnIndex);
  };

  // ドラッグエンター
  const handleDragEnter = (e: React.DragEvent, columnIndex: number) => {
    e.preventDefault();
    setDragOverColumn(columnIndex);
  };

  // ドラッグリーブ
  const handleDragLeave = (e: React.DragEvent) => {
    // リーブ時は即座にクリアしない（子要素との出入りで誤動作するため）
  };

  // ドロップ
  const handleDrop = (e: React.DragEvent, dropColumnIndex: number) => {
    e.preventDefault();

    if (draggedColumn !== null && draggedColumn !== dropColumnIndex) {
      const newOrder = arrayMove(columnOrder, draggedColumn, dropColumnIndex);
      setColumnOrder(newOrder);
    }

    // 状態をリセット
    setIsDragging(false);
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  // ドラッグ終了
  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg font-sans">
      {/* メインテーブルグリッド */}
      <div
        className="grid relative"
        style={{
          gridTemplateColumns: `repeat(${numRows}, 1fr)`,
          gridTemplateRows: `auto repeat(${labels.length}, 1fr)`,
        }}
      >
        {/* 列全体のホバーボーダー */}
        {focusedColumn !== null && !isDragging && (
          <div
            className="pointer-events-none z-20 border-4 border-blue-400 rounded-md"
            style={{
              gridColumn: focusedColumn + 1,
              gridRow: `1 / ${labels.length + 2}`,
            }}
          />
        )}

        {/* ドロップ位置のハイライト */}
        {isDragging &&
          dragOverColumn !== null &&
          dragOverColumn !== draggedColumn && (
            <div
              className="pointer-events-none z-30 border-4 border-green-400 bg-green-100/30 rounded-md"
              style={{
                gridColumn: dragOverColumn + 1,
                gridRow: `1 / ${labels.length + 2}`,
              }}
            />
          )}

        {/* ヘッダー行 */}
        {columnOrder.map((originalColumnIndex, displayIndex) => (
          <div
            key={`header-${originalColumnIndex}`}
            className={`p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold border-r border-white/30 last:border-r-0 border-b-2 border-indigo-400 flex items-center justify-center text-sm cursor-pointer transition-all relative group ${
              draggedColumn === displayIndex ? "opacity-50 scale-95" : ""
            }`}
            style={{
              gridColumn: displayIndex + 1,
              gridRow: 1,
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, displayIndex)}
            onDragOver={(e) => handleDragOver(e, displayIndex)}
            onDragEnter={(e) => handleDragEnter(e, displayIndex)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, displayIndex)}
            onDragEnd={handleDragEnd}
            onMouseEnter={() => !isDragging && setFocusedColumn(displayIndex)}
            onMouseLeave={() => !isDragging && setFocusedColumn(null)}
            tabIndex={0}
            onFocus={() => !isDragging && setFocusedColumn(displayIndex)}
            onBlur={() => !isDragging && setFocusedColumn(null)}
          >
            {!isFlaggedColumn(originalColumnIndex) &&
              `ユーザー ${originalColumnIndex + 1}`}

            {/* ドラッグハンドル */}
            <div className="absolute top-1 right-1 cursor-grab active:cursor-grabbing bg-white/20 rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                className="text-white"
              >
                <circle cx="3" cy="3" r="1" fill="currentColor" />
                <circle cx="9" cy="3" r="1" fill="currentColor" />
                <circle cx="3" cy="9" r="1" fill="currentColor" />
                <circle cx="9" cy="9" r="1" fill="currentColor" />
              </svg>
            </div>
          </div>
        ))}

        {/* データ行 */}
        {labels.map((label, labelIndex) =>
          columnOrder.map((originalColumnIndex, displayIndex) => (
            <div
              key={`data-${labelIndex}-${originalColumnIndex}`}
              className={`p-4 border-r border-gray-200 last:border-r-0 border-b border-gray-200 last:border-b-0 flex items-center text-sm text-gray-800 leading-relaxed bg-white hover:bg-blue-50 transition-all cursor-pointer break-words ${
                draggedColumn === displayIndex ? "opacity-50" : ""
              }`}
              style={{
                gridColumn: displayIndex + 1,
                gridRow: labelIndex + 2,
              }}
              draggable
              onDragStart={(e) => handleDragStart(e, displayIndex)}
              onDragOver={(e) => handleDragOver(e, displayIndex)}
              onDragEnter={(e) => handleDragEnter(e, displayIndex)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, displayIndex)}
              onDragEnd={handleDragEnd}
              onMouseEnter={() => !isDragging && setFocusedColumn(displayIndex)}
              onMouseLeave={() => !isDragging && setFocusedColumn(null)}
              tabIndex={0}
              onFocus={() => !isDragging && setFocusedColumn(displayIndex)}
              onBlur={() => !isDragging && setFocusedColumn(null)}
            >
              {!isFlaggedColumn(originalColumnIndex) &&
                (label === "ステータス" ? (
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wide ${
                      columnData[labelIndex][originalColumnIndex]
                        ?.toString()
                        .toLowerCase() === "active"
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : columnData[labelIndex][originalColumnIndex]
                            ?.toString()
                            .toLowerCase() === "inactive"
                        ? "bg-red-100 text-red-800 border border-red-300"
                        : "bg-orange-100 text-orange-800 border border-orange-300"
                    }`}
                  >
                    {columnData[labelIndex][originalColumnIndex]}
                  </span>
                ) : (
                  columnData[labelIndex][originalColumnIndex]
                ))}
            </div>
          ))
        )}

        {/* フラグがtrueの列の結合セル */}
        {columnOrder.map(
          (originalColumnIndex, displayIndex) =>
            isFlaggedColumn(originalColumnIndex) && (
              <div
                key={`merged-${originalColumnIndex}`}
                className={`bg-gradient-to-br from-red-500 to-orange-600 text-white flex items-center justify-center border-r border-gray-200 last:border-r-0 transition-all cursor-pointer relative group ${
                  draggedColumn === displayIndex ? "opacity-50 scale-95" : ""
                }`}
                style={{
                  gridColumn: displayIndex + 1,
                  gridRow: `1 / ${labels.length + 2}`,
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, displayIndex)}
                onDragOver={(e) => handleDragOver(e, displayIndex)}
                onDragEnter={(e) => handleDragEnter(e, displayIndex)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, displayIndex)}
                onDragEnd={handleDragEnd}
                onMouseEnter={() =>
                  !isDragging && setFocusedColumn(displayIndex)
                }
                onMouseLeave={() => !isDragging && setFocusedColumn(null)}
                tabIndex={0}
                onFocus={() => !isDragging && setFocusedColumn(displayIndex)}
                onBlur={() => !isDragging && setFocusedColumn(null)}
              >
                <div className="font-bold text-xl tracking-widest text-center">
                  結合
                </div>

                {/* ドラッグハンドル */}
                <div className="absolute top-2 right-2 cursor-grab active:cursor-grabbing bg-white/20 rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    className="text-white"
                  >
                    <circle cx="3" cy="3" r="1" fill="currentColor" />
                    <circle cx="9" cy="3" r="1" fill="currentColor" />
                    <circle cx="3" cy="9" r="1" fill="currentColor" />
                    <circle cx="9" cy="9" r="1" fill="currentColor" />
                  </svg>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

// デモ用のサンプルデータとコンポーネント
function Demo() {
  const sampleData = {
    labels: ["ID", "ユーザー名", "メールアドレス", "ステータス", "登録日"],
    data: [
      [1, 2, 3, 4, 5, 6], // ID行
      ["田中太郎", "佐藤花子", "山田次郎", "鈴木美咲", "高橋健太", "渡辺綾"], // ユーザー名行
      [
        "tanaka@email.com",
        "sato@email.com",
        "yamada@email.com",
        "suzuki@email.com",
        "takahashi@email.com",
        "watanabe@email.com",
      ], // メールアドレス行
      ["Active", "Inactive", "Active", "Pending", "Active", "Inactive"], // ステータス行
      [
        "2024-01-15",
        "2024-02-20",
        "2024-03-10",
        "2024-04-05",
        "2024-05-12",
        "2024-06-18",
      ], // 登録日行
    ],
    columnFlags: [true, false, true, false, false, true], // 列1,3,6を結合表示
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          SubgridTable with Drag & Drop
        </h1>
        <SubgridTable data={sampleData} />
      </div>
    </div>
  );
}
