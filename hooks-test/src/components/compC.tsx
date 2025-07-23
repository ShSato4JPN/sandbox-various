import { useQuery } from "@tanstack/react-query";
import { getDataOptions } from "../libs/react-query";

export default function CompC() {
  const { isLoading, data } = useQuery<{ user: string }>(getDataOptions);

  return <div>{isLoading ? "loading" : data?.user}</div>;
}
