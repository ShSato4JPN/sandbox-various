import type { UseQueryOptions } from "@tanstack/react-query";

export const getData = async () => {
  return new Promise<{ user: string }>((resolve) =>
    setTimeout(() => resolve({ user: "satoshi" }), 5000)
  );
};

export const getDataOptions: UseQueryOptions<{ user: string }> = {
  queryKey: ["data"],
  queryFn: getData,
};
