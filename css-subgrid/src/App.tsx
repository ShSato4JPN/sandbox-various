import "./App.css";
import SubgridTable from "./SubgridTable";

function App() {
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
        "takahashi@email.com\ntakahashi@email.com\ntakahashi@email.com",
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
    columnFlags: [true, false, true, false, false, true], // 列1,3,6を結合表示
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          SubgridTable with Drag & Drop
        </h1>
        <SubgridTable data={sampleData} />
      </div>
    </div>
  );
}

export default App;
