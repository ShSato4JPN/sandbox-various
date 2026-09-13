import "./App.css";

interface GridProps {
  cols: number;
  rows: number;
}

function Grid({ cols, rows }: GridProps) {
  const totalRows = rows + 1;
  
  const gridCols = `grid-cols-${cols}`;
  const gridRows = `grid-rows-${totalRows}`;
  const rowSpan = `row-span-${totalRows}`;

  return (
    <div className={`grid ${gridCols} ${gridRows} gap-2`}>
      {Array.from({ length: cols }, (_, colIndex) => (
        <div key={colIndex} className={`grid grid-rows-subgrid ${rowSpan}`}>
          <div className="font-bold">label-{colIndex + 1}</div>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div key={rowIndex}>data-{colIndex + 1}-{rowIndex + 1}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="h-dvh w-dvw grid place-items-center">
      <div className="space-y-8">
        <Grid cols={3} rows={4} />
        <Grid cols={2} rows={3} />
        <Grid cols={4} rows={2} />
      </div>
    </div>
  );
}

export default App;
