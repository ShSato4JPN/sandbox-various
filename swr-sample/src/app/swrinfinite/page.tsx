"use client";
import useSWRInfinite from "swr/infinite";

const getKey = (pageIndex, previousPageData) => {
  //if (previousPageData && !previousPageData.length) return null; // 最後に到達した
  console.log(previousPageData);

  return `/api/pages?page=${pageIndex + 1}`;
};
const fetcher = (key: string, init?: RequestInit) => {
  return fetch(key, init).then((res) => res.json());
};

export default function Home() {
  const { data } = useSWRInfinite(getKey, fetcher);

  console.dir(data);
  return (
    <>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}
