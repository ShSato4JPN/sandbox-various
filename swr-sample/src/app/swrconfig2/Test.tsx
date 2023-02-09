"use client";
import useSWR from "swr";

async function fetcher() {
  const res = await fetch(`http://localhost:3000/api/slowposts`, {
    next: { revalidate: 60 * 60 },
  });

  return res.json();
}

export default function Test() {
  const { data: data1 } = useSWR("/api/posts/1", fetcher);
  //const { data: data2 } = useSWR("/api/posts/2");
  //const { data: data3 } = useSWR("/api/posts/3");
  return (
    <>
      <p>data1</p>
      <h1>{JSON.stringify(data1)}</h1>
    </>
  );
}
