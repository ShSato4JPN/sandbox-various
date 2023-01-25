"use client";
import Test from "../../components/Test/";
import SwrConfig from "../SwrConfig";

async function fetcher(key: string, init?: RequestInit) {
  return fetch(key, init).then((res) =>
    res.json().then((data) => {
      return data;
    })
  );
}

export default async function Home() {
  const data = await fetcher("/api/post");
  return (
    <>
      <SwrConfig fallbackData={data}>
        <Test />
      </SwrConfig>
    </>
  );
}
