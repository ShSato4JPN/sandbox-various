import "./App.css";

function App() {
  return (
    <div
      onClick={() => {
        alert("A");
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          alert("B");
        }}
      >
        child
      </div>
    </div>
  );
}

export default App;
