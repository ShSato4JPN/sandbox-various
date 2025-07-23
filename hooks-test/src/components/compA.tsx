import useData from "../hooks/data";

export default function CompA() {
  const { isLoading, data } = useData();

  return <div>{isLoading ? "loading" : data?.user}</div>;
}
