import "./app.css";
import { useState } from "react";

function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  const handleCountUpEvent = () => {
    setCount(count + 1);
  };

  const handleResetEvent = () => {
    setCount(0);
  };

  return (
    <div className="container">
      <div className="message-contents">
        <div className="title">Webpack からのメッセージ</div>
        <div className="message">
          こんにちは。これは Webpack で作成された React アプリケーションです。
        </div>
        <div className="counter">
          <div className="count-display">
            <span>{count}</span>
          </div>
          <div className="buttons">
            <button onClick={handleCountUpEvent}>Count Up</button>
            <button onClick={handleResetEvent}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
