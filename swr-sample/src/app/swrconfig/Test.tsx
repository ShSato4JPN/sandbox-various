"use client";
import useSWR from "swr";

export default function Test() {
  const { data: data1 } = useSWR("/api/posts/1");
  const { data: data2 } = useSWR("/api/posts/2");
  const { data: data3 } = useSWR("/api/posts/3");
  return (
    <>
      <p>data1</p>
      <h1>{JSON.stringify(data1)}</h1>
      <p>data2</p>
      <h2>{JSON.stringify(data2)}</h2>
      <p>data3</p>
      <h3>{JSON.stringify(data3)}</h3>
    </>
  );
}
