"use client";
import { SWRConfig } from "swr";
import Test from "./Test";

export default function Home() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (key: string, init?: RequestInit) =>
          fetch(key, init).then((res) => res.json()),
        fallback: {
          // ここに設定した値が初期値として表示される。
          //　その後、fetcher　によって取得された値で際レンダリングされる。
          "/api/posts/1": { data1: "data1" },
          "/api/posts/2": { data2: "data2" },
          "/api/posts/3": { data3: "data3" },
        },
      }}
    >
      <Test />
    </SWRConfig>
  );
}
