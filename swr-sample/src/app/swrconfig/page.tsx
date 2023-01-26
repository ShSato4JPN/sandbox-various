"use client";
import { SWRConfig } from "swr";
import Test from "./Test";

export default function Home() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        //　ここで設定した fetcher　がこコンポーネント内で再利用される。
        fetcher: (key: string, init?: RequestInit) =>
          fetch(key, init).then((res) => res.json()),
      }}
    >
      <Test />
    </SWRConfig>
  );
}
