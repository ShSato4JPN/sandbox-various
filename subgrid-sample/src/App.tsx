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
        gridTemplateColumns: `repeat(${data.length}, 1fr)`,
        gridTemplateRows: `repeat(${data[0].length}, auto)`,
      }}
    >
      {data.map((col, colIndex) => (
        <div
          key={colIndex}
          className="grid grid-rows-subgrid"
          style={{
            gridRow: `1 / ${data[0].length + 1}`,
          }}
        >
          {col.map((cell, rowIndex) => (
            <div key={rowIndex} className="whitespace-pre-wrap">
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
