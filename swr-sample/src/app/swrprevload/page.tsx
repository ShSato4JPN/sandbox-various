"use client";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (key: string, init?: RequestInit) => {
  return fetch(key, init).then((res) => res.json());
};

const Page = (props: { index: number }) => {
  const { data } = useSWR(`/api/slowposts/${props.index}`, fetcher);
  return <li>{JSON.stringify(data)}</li>;
};

export default function Home() {
  const [value, setValue] = useState<number>(0);
  const handleOnClick = () => {
    setValue(value + 1);
  };

  return (
    <>
      <button onClick={handleOnClick}>click</button>
      <ul>
        <Page index={value} />
        <div style={{ display: "none" }}>
          <Page index={value + 1} />
        </div>
      </ul>
    </>
  );
}
