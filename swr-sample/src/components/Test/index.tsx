import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

const getKey: SWRInfiniteKeyLoader = () => {};

function Test(): JSX.Element {
  const { data } = useSWRInfinite;
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default Test;
