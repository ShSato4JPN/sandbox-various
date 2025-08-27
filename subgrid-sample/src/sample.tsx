function App() {
  const data = [
    [1, 2, 3, 4, 5, 6],
    [1, 2, "abc\nd\ne\nfg", 4, 5, 6],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6],
  ];

  const rows = data[0].length;
  const cols = data.length;

  return (
    <div className="p-4">
      {/* subgrid無し版 */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">subgrid無し版</h2>
        <div
          className="grid border-2"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(120px, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(50px, auto))`,
          }}
        >
          {/* 全てのセルを明示的に配置 */}
          {data.map((col, colIndex) => {
            if (colIndex % 2 === 0) {
              // 偶数列：結合されたセル
              return (
                <div
                  key={`merged-${colIndex}`}
                  className="bg-orange-200 border grid place-items-center"
                  style={{
                    gridColumn: colIndex + 1,
                    gridRow: `1 / ${rows + 1}`,
                  }}
                >
                  <div className="text-center font-semibold">
                    結合列 {colIndex + 1}
                    <br />
                    中央表示
                  </div>
                </div>
              );
            } else {
              // 奇数列：通常のセル
              return col.map((cell, rowIndex) => (
                <div
                  key={`${colIndex}-${rowIndex}`}
                  className="border p-2 whitespace-pre-wrap flex items-center justify-center"
                  style={{
                    gridColumn: colIndex + 1,
                    gridRow: rowIndex + 1,
                  }}
                >
                  {cell}
                </div>
              ));
            }
          })}
        </div>
      </div>

      {/* 比較用：subgrid版 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">参考：subgrid版</h2>
        <div
          className="grid border-2"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(120px, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(50px, auto))`,
          }}
        >
          {data.map((col, colIndex) => (
            <div
              key={colIndex}
              className="grid grid-rows-subgrid"
              style={{
                gridRow: `1 / ${rows + 1}`,
              }}
            >
              {colIndex % 2 === 0 ? (
                <div
                  className="bg-orange-200 border grid place-items-center"
                  style={{
                    gridRow: `1 / ${rows + 1}`,
                  }}
                >
                  <div className="text-center font-semibold">
                    結合列 {colIndex + 1}
                    <br />
                    中央表示
                  </div>
                </div>
              ) : (
                <>
                  {col.map((cell, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="border p-2 whitespace-pre-wrap flex items-center justify-center"
                    >
                      {cell}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
