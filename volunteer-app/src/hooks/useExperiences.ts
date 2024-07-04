import { useFilters } from "@/contexts/filters";
import { useNetwork } from "@/contexts/network";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useActivities() {
  const { client } = useNetwork();
  const { filters } = useFilters();

  const { data, fetchNextPage, refetch, isLoading } = useInfiniteQuery({
    queryKey: ["experiences"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await client.GET("/activities", {
        params: {
          query: {
            ...filters,
            page: pageParam,
          },
        },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => (lastPage?.page_info.page ? lastPage?.page_info.page + 1 : 1),
    initialPageParam: 1,
  });

  const activities = useMemo(() => {
    return data?.pages.flatMap((page) => page?.results || []) || [];
  }, [data]);

  return {
    activities,
    fetchNextPage,
    refetch,
    isLoading,
  };
}
