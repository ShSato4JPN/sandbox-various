"use client";
import useSWR from "swr";

async function fetcher(key: string, init?: RequestInit) {
  const res = await fetch(key, {
    next: { revalidate: 60 * 60 },
  });

  return res.json();
}

export default function Test() {
  const { data: data1 } = useSWR("/api/slowposts/1", fetcher);
  const { data: data2 } = useSWR("/api/slowposts/2", fetcher);
  const { data: data3 } = useSWR("/api/slowposts/3", fetcher);
  return (
    <>
      <p>data1</p>
      <p>{JSON.stringify(data1)}</p>
      <p>data2</p>
      <h3>{JSON.stringify(data2)}</h3>
      <p>data3</p>
      <h1>{JSON.stringify(data3)}</h1>
    </>
  );
}
