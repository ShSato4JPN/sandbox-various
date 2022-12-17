"use client";
import React, { useState } from "react";
import useSWRInfinite, from "swr/infinite";

// getKey の返却値 （swr　のキー）が fetcher　に渡される。
//　pageIndex : fetcher がキックするインデックス
// previousPageData : 前のインデックスで取得したデータ
const getKey = (pageIndex, previousPageData) => {
  console.dir(pageIndex)
  return `/api/posts/${pageIndex}`;
};

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App() {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher
  );

  const handleOnClick = () => {
    setSize( size + 1)
  }

  return (
    <>
    <button onClick={handleOnClick}>click</button>
    <p>{JSON.stringify(data)}</p>
    </>
  )
}
