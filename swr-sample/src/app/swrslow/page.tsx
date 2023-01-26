"use client";
import { calculateSizeAdjustValues } from "next/dist/server/font-utils";
import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (key: string, init?: RequestInit) => {
  return fetch(key, init).then((res) => res.json());
};

const fetcher2 = (url: string) => {
  return fetch(url).then((res) => res.json());
};

export default function Home() {
  const { data, error } = useSWR("/api/slowposts", fetcher);
  const [value, setValue] = useState("no-data");
  const [value2, setValue2] = useState("no-data2");
  const handleOnClick = () => {
    console.dir(data);
    setValue(JSON.stringify(data));
  };

  useEffect(() => {
    fetcher2("/api/posts").then((data) => {
      setValue2(JSON.stringify(data));
    });
  }, []);

  const handleOnClick2 = () => {
    console.dir(data);
    console.dir(value2);
  };

  return (
    <>
      <button onClick={handleOnClick}>click</button>
      <button onClick={handleOnClick2}>show</button>
      <p>{value}</p>
    </>
  );
}
