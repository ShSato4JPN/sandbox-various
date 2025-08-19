import { useEffect, useRef, useState } from "react";

interface ColumnData {
  labels: string[];
  data: (string | number)[][];
}

interface SubgridTableProps {
  data: ColumnData;
}

export default function SubgridTable({ data }: SubgridTableProps) {
  const { labels, data: columnData } = data;
  const numRows = columnData[0]?.length || 0;
  const [focusedColumn, setFocusedColumn] = useState<number | null>(null);
  const [rowHeights, setRowHeights] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IDが奇数のユーザーを特定（IDは最初の行）
  const isOddId = (index: number) => {
    const id = columnData[0][index];
    return typeof id === "number" && id % 2 === 1;
  };

  // 行の高さを計算して統一
  useEffect(() => {
    const calculateRowHeights = () => {
      if (!containerRef.current) return;

      const heights: number[] = [];

      // ヘッダー行の高さを計算
      const headerElements = containerRef.current.querySelectorAll(
        '[data-row="header"]'
      );
      if (headerElements.length > 0) {
        const headerHeight = Math.max(
          ...Array.from(headerElements).map(
            (el) => el.getBoundingClientRect().height
          )
        );
        heights.push(headerHeight);
      }

      // 各データ行の高さを計算
      labels.forEach((_, labelIndex) => {
        const rowElements = containerRef.current!.querySelectorAll(
          `[data-row="data-${labelIndex}"]`
        );
        if (rowElements.length > 0) {
          const rowHeight = Math.max(
            ...Array.from(rowElements).map(
              (el) => el.getBoundingClientRect().height
            )
          );
          heights.push(rowHeight);
        }
      });

      setRowHeights(heights);
    };

    // 初期計算
    calculateRowHeights();

    // リサイズ時に再計算
    const handleResize = () => {
      setTimeout(calculateRowHeights, 100);
    };

    window.addEventListener("resize", handleResize);

    // フォント読み込み完了後に再計算
    document.fonts.ready.then(calculateRowHeights);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [labels, columnData]);

  return (
    <div
      className="border border-gray-300 rounded-lg overflow-hidden shadow-lg font-sans"
      ref={containerRef}
    >
      <div className="flex">
        {/* データ列群 */}
        <div className="flex flex-1">
          {Array.from({ length: numRows }, (_, columnIndex) => (
            <div
              key={columnIndex}
              className={`flex-1 relative transition-all ${
                focusedColumn === columnIndex
                  ? "ring-4 ring-blue-400 ring-inset z-10"
                  : ""
              }`}
              style={{ minWidth: "120px" }}
              onMouseEnter={() => setFocusedColumn(columnIndex)}
              onMouseLeave={() => setFocusedColumn(null)}
              tabIndex={0}
              onFocus={() => setFocusedColumn(columnIndex)}
              onBlur={() => setFocusedColumn(null)}
            >
              {isOddId(columnIndex) ? (
                /* 奇数列：結合された1つのセル */
                <div
                  className="bg-gradient-to-br from-red-500 to-orange-600 text-white flex items-center justify-center border-r border-gray-200 last:border-r-0 cursor-pointer"
                  style={{
                    height:
                      rowHeights.reduce((sum, height) => sum + height, 0) ||
                      "auto",
                  }}
                >
                  <div className="font-bold text-xl tracking-widest text-center">
                    奇数
                  </div>
                </div>
              ) : (
                /* 偶数列：通常の列 */
                <div className="flex flex-col">
                  {/* ヘッダーセル */}
                  <div
                    className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold border-r border-white/30 last:border-r-0 border-b-2 border-indigo-400 flex items-center justify-center text-sm cursor-pointer"
                    data-row="header"
                    style={{
                      height: rowHeights[0] ? `${rowHeights[0]}px` : "auto",
                    }}
                  >
                    ユーザー {columnIndex + 1}
                  </div>

                  {/* データセル */}
                  {labels.map((label, labelIndex) => (
                    <div
                      key={labelIndex}
                      className="p-4 border-r border-gray-200 last:border-r-0 border-b border-gray-200 last:border-b-0 flex items-center text-sm text-gray-800 whitespace-pre-line leading-relaxed bg-white hover:bg-blue-50 transition-colors cursor-pointer"
                      data-row={`data-${labelIndex}`}
                      style={{
                        height: rowHeights[labelIndex + 1]
                          ? `${rowHeights[labelIndex + 1]}px`
                          : "auto",
                      }}
                    >
                      {label === "ステータス" ? (
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wide ${
                            columnData[labelIndex][columnIndex]
                              ?.toString()
                              .toLowerCase() === "active"
                              ? "bg-green-100 text-green-800 border border-green-300"
                              : columnData[labelIndex][columnIndex]
                                  ?.toString()
                                  .toLowerCase() === "inactive"
                              ? "bg-red-100 text-red-800 border border-red-300"
                              : "bg-orange-100 text-orange-800 border border-orange-300"
                          }`}
                        >
                          {columnData[labelIndex][columnIndex]}
                        </span>
                      ) : (
                        columnData[labelIndex][columnIndex]
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
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
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          SubgridTable - 行高統一版
        </h1>
        <SubgridTable data={sampleData} />
        <div className="mt-4 text-sm text-gray-600">
          <p>• ID 1, 3, 5の列（奇数列）は1つの結合セルとして「奇数」表示</p>
          <p>• ID 2, 4, 6の列（偶数列）は通常のデータ表示</p>
          <p>
            • 各列にマウスオーバーまたはフォーカスすると青い枠線が表示されます
          </p>
          <p>• 行の高さが全ての列で統一されています</p>
          <p>• ラベル列が削除されました</p>
        </div>
      </div>
    </div>
  );
}
