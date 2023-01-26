"use client";
import React, { useState } from "react";
import useSWRInfinite, from "swr/infinite";

// getKey の返却値 （swr　のキー）が fetcher　に渡される。
//　pageIndex : fetcher がキックするインデックス
// previousPageData : 前のインデックスで取得したデータ
const getKey = (pageIndex, previousPageData) => {
  console.log('*************************************************')
  console.log(`pageIndex: ${pageIndex}`);
  console.log(`previousPageData: ${previousPageData}`);
  console.log('*************************************************')
  if (previousPageData && !previousPageData.length) return null; // 最後に到達した
  return `https://api.github.com/repos/reactjs/react-a11y/issues?per_page=${PAGE_SIZE}&page=${
    pageIndex + 1
  }`;
};

const fetcher = (url) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 6;

// data: 各ページのフェッチしたレスポンス値の配列
// error: useSWR の error と同じ
// isLoading: useSWR の isLoading と同じ
// isValidating: useSWR の isValidating と同じ
// mutate: useSWR のバインドされたミューテート関数と同じですが、データ配列を操作します
// size: フェッチして返されるだろうページ数
// setSize: フェッチする必要のあるページ数を設定します
export default function App() {
  const [repo, setRepo] = useState("reactjs/react-a11y");
  const [val, setVal] = useState(repo);

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher
  );

  const issues = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  // 次のデータが存在しない、データ数が少ない場合はボタンを非活性にする。
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="reactjs/react-a11y"
      />
      <button
        onClick={() => {
          setRepo(val);
          setSize(1);
        }}
      >
        load issues
      </button>
      <p>
        showing {size} page(s) of {isLoadingMore ? "..." : issues.length}{" "}
        issue(s){" "}
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
        >
          {isLoadingMore
            ? "loading..."
            : isReachingEnd
            ? "no more issues"
            : "load more"}
        </button>
        <button disabled={isRefreshing} onClick={() => mutate()}>
          {isRefreshing ? "refreshing..." : "refresh"}
        </button>
        <button disabled={!size} onClick={() => setSize(0)}>
          clear
        </button>
      </p>
      {isEmpty ? <p>Yay, no issues found.</p> : null}
      {issues.map((issue) => {
        return (
          <p key={issue.id} style={{ margin: "6px 0" }}>
            - {issue.title}
          </p>
        );
      })}
    </div>
  );
}
