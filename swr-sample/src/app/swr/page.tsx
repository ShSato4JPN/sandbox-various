"use client";
import useSWR from "swr";

const fetcher = (key: string, init?: RequestInit) => {
  return fetch(key, init).then((res) => res.json());
};

export default function Home() {
  const { data, error } = useSWR("/api/posts", fetcher);
  return <>{data ? <p>{JSON.stringify(data)}</p> : <p>no-data</p>}</>;
}
