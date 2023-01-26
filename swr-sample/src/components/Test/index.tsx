"use client";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

const getKey: SWRInfiniteKeyLoader = (key) => "/api/post";
function Test(): JSX.Element {
  //const { data } = useSWRInfinite(getKey, null);
  return <div>{/* <h1>{data}</h1> */}</div>;
}

export default Test;
