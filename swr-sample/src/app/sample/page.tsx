"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";

async function fetcher(key: string, init?: RequestInit) {
  return fetch(key, init).then((res) =>
    res.json().then((data) => {
      setTimeout(() => {
        return data;
      }, 5000);
    })
  );
}

export default function Home() {
  const { data, error } = useSWR("/api/post", fetcher);
  return (
    <>
      {typeof data === "undefined" ? (
        <p>loading ...</p>
      ) : data ? (
        <p>{JSON.stringify(data)}</p>
      ) : (
        <p>no-data</p>
      )}
      {error ? <p>{error}</p> : null}
    </>
  );
}
