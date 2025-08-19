import "./App.css";
import SubgridTable from "./SubgridTable";

const columnData = {
  labels: ["ID", "名前", "メール", "役職", "部署", "ステータス"],
  data: [
    [1, 2, 3, 4, 5],
    ["田中太郎", "佐藤花子", "鈴木一郎", "高橋美咲", "伊藤健太"],
    ["tanaka@example.com", "sato@example.com", "suzuki@example.com", "takahashi@example.com", "ito@example.com"],
    ["シニアエンジニア\n（フルスタック）", "UIUXデザイナー", "プロダクトマネージャー", "データアナリスト", "フロントエンド\nエンジニア"],
    ["開発部", "デザイン部", "営業部", "企画部", "開発部"],
    ["Active", "Active", "Pending", "Inactive", "Active"]
  ]
};

function App() {
  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
      <h1 style={{ 
        textAlign: "center", 
        color: "#333", 
        marginBottom: "30px",
        fontSize: "28px",
        fontWeight: "300"
      }}>
        CSS Subgrid テーブルサンプル
      </h1>
      <SubgridTable data={columnData} />
    </div>
  );
}

export default App;
