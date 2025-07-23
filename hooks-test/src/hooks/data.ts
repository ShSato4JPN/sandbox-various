import { useQuery } from "@tanstack/react-query";
import { getDataOptions } from "../libs/react-query";

export default function useData() {
  const { isLoading, data } = useQuery<{ user: string }>(getDataOptions);
  return { isLoading, data };
}
