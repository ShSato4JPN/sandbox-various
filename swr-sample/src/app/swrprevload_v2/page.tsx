"use client";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (key: string, init?: RequestInit) => {
  return fetch(key, init).then((res) => res.json());
};

const Page = (props: { index: number }) => {
  const { data } = useSWR(`/api/slowposts/${props.index}`, fetcher);
  return (
    <ul>
      <li>{JSON.stringify(data)}</li>
    </ul>
  );
};

export default function Home() {
  const [count, setCount] = useState<number>(0);
  const [pages, setPages] = useState<any>([]);
  const handleOnClick = () => {
    const countUp = count + 1;
    const temp = [];
    for (let i = 0; i < countUp; i++) {
      temp.push(<Page index={i + 1} />);
    }
    setCount(count + 1);
    setPages([...temp]);
  };

  return (
    <>
      <button onClick={handleOnClick}>click</button>
      {pages}
    </>
  );
}
