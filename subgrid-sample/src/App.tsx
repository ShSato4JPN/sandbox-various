import "./App.css";

function App() {
  const data = [
    [1, 2, 3, 4, 5, 6],
    [1, 2, "abc\nd\ne\nfg", 4, 5, 6],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6],
  ];

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${data.length}, auto)`,
        gridTemplateRows: `repeat(${data[0].length}, auto)`,
      }}
    >
      {data.map((col, colIndex) => {
        return (
          <div
            key={colIndex}
            className="grid grid-rows-subgrid"
            style={{
              gridRow: `1 / ${data[0].length + 1}`,
            }}
          >
            {colIndex % 2 === 0 ? (
              <div>test</div>
            ) : (
              <>
                {col.map((cell, rowIndex) => (
                  <div key={rowIndex} className="border-1 whitespace-pre-wrap">
                    {cell}
                  </div>
                ))}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default App;
