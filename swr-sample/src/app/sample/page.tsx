"use client";
import { useState, useEffect } from "react";

//const fetcher = (url: any) => fetch(url).then((res) => res.json());

const cache = new Map<string, string>();

export default function Home() {
  const [value, setValue] = useState<string>(
    cache.has("key") ? cache.get("key") || "key" : "no data"
  );

  useEffect(() => {
    fetch("/api/post")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          cache.set("kye", JSON.stringify(data));
          setValue(JSON.stringify(data));
        }, 5000);
      })
      .catch((e) => setValue(e.message));
  }, []);

  return (
    <>
      <p>{value}</p>
    </>
  );
}
