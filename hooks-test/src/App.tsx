import { useState } from "react";
import "./App.css";
import CompA from "./components/compA";
import CompB from "./components/compB";
import CompC from "./components/compC";

function App() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isShow2, setIsShow2] = useState<boolean>(false);

  if (isShow2) {
    return <CompC />;
  }

  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i}>
          <CompA />
        </div>
      ))}

      {isShow && <CompB />}
      <button onClick={() => setIsShow(true)}>click</button>
      <button onClick={() => setIsShow2(true)}>click</button>
    </>
  );
}

export default App;
