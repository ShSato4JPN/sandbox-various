import { useState } from "react";

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

  // IDが奇数のユーザーを特定（IDは最初の行）
  const isOddId = (index: number) => {
    const id = columnData[0][index];
    return typeof id === "number" && id % 2 === 1;
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg font-sans">
      {/* メインテーブルグリッド */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${numRows}, 1fr)`,
          gridTemplateRows: `auto repeat(${labels.length}, 1fr)`,
        }}
      >
        {/* ヘッダー行 */}
        {Array.from({ length: numRows }, (_, columnIndex) => (
          <div
            key={`header-${columnIndex}`}
            className={`p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold border-r border-white/30 last:border-r-0 border-b-2 border-indigo-400 flex items-center justify-center text-sm transition-all ${
              focusedColumn === columnIndex
                ? "ring-4 ring-blue-400 ring-inset z-10"
                : ""
            }`}
            style={{
              gridColumn: columnIndex + 1,
              gridRow: 1,
            }}
            onMouseEnter={() => setFocusedColumn(columnIndex)}
            onMouseLeave={() => setFocusedColumn(null)}
            tabIndex={0}
            onFocus={() => setFocusedColumn(columnIndex)}
            onBlur={() => setFocusedColumn(null)}
          >
            {!isOddId(columnIndex) && `ユーザー ${columnIndex + 1}`}
          </div>
        ))}

        {/* データ行 */}
        {labels.map((label, labelIndex) =>
          Array.from({ length: numRows }, (_, columnIndex) => (
            <div
              key={`data-${labelIndex}-${columnIndex}`}
              className={`p-4 border-r border-gray-200 last:border-r-0 border-b border-gray-200 last:border-b-0 flex items-center text-sm text-gray-800 whitespace-pre-line leading-relaxed bg-white hover:bg-blue-50 transition-all ${
                focusedColumn === columnIndex
                  ? "ring-4 ring-blue-400 ring-inset z-10"
                  : ""
              }`}
              style={{
                gridColumn: columnIndex + 1,
                gridRow: labelIndex + 2,
              }}
              onMouseEnter={() => setFocusedColumn(columnIndex)}
              onMouseLeave={() => setFocusedColumn(null)}
              tabIndex={0}
              onFocus={() => setFocusedColumn(columnIndex)}
              onBlur={() => setFocusedColumn(null)}
            >
              {!isOddId(columnIndex) &&
                (label === "ステータス" ? (
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
                ))}
            </div>
          ))
        )}

        {/* 奇数列の結合セル */}
        {Array.from(
          { length: numRows },
          (_, columnIndex) =>
            isOddId(columnIndex) && (
              <div
                key={`merged-${columnIndex}`}
                className={`bg-gradient-to-br from-red-500 to-orange-600 text-white flex items-center justify-center border-r border-gray-200 last:border-r-0 transition-all ${
                  focusedColumn === columnIndex
                    ? "ring-4 ring-blue-400 ring-inset z-10"
                    : ""
                }`}
                style={{
                  gridColumn: columnIndex + 1,
                  gridRow: `1 / ${labels.length + 2}`, // ヘッダーから最後のデータ行まで
                }}
                onMouseEnter={() => setFocusedColumn(columnIndex)}
                onMouseLeave={() => setFocusedColumn(null)}
                tabIndex={0}
                onFocus={() => setFocusedColumn(columnIndex)}
                onBlur={() => setFocusedColumn(null)}
              >
                <div className="font-bold text-xl tracking-widest text-center">
                  奇数
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
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          CSS Grid with Column Spanning - 超シンプル版
        </h1>
        <SubgridTable data={sampleData} />
        <div className="mt-4 text-sm text-gray-600 space-y-1">
          <p>• CSS Gridの `gridRow: "1 / n"` で列全体を結合</p>
          <p>• 行高は自動で統一される</p>
          <p>• JavaScriptのロジックが大幅に簡素化</p>
          <p>• ID 1, 3, 5の列（奇数列）は結合セルとして「奇数」表示</p>
          <p>• 各列にマウスオーバーまたはフォーカスすると青い枠線が表示</p>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">
            🎉 大幅に簡素化されました！
          </h3>
          <div className="text-sm text-green-700 space-y-1">
            <p>✅ useEffect不要（行高自動調整）</p>
            <p>✅ useRef不要（DOM操作なし）</p>
            <p>✅ 複雑な計算ロジック不要</p>
            <p>✅ CSS Grid標準機能で列結合</p>
            <p>✅ ブラウザサポート: Chrome 92+, Firefox 89+, Safari 16+</p>
          </div>
        </div>
      </div>
    </div>
  );
}
