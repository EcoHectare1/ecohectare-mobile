import { useInfiniteQuery } from "@tanstack/react-query";
import { MetaDataPage, Page } from "src/types/Pages";

export interface UsePaginatedListResult<TData> {
  data: TData[];
  isError: boolean | null;
  isLoading: boolean;
  refresh: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  meta?: MetaDataPage;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}

export function usePaginatedList<Data>(
  queryKey: readonly unknown[],
  getList: (pageParam: number) => Promise<Page<Data>>
): UsePaginatedListResult<Data> {
  const query = useInfiniteQuery<Page<Data>>({
    queryKey,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getList(pageParam as number),
    getNextPageParam: (lastPage) => {
      const limit = Number(lastPage.limit) || 10;
      const totalPages = Math.ceil(lastPage.total / limit);

      if (Number(lastPage.page) < totalPages) {
        return Number(lastPage.page) + 1;
      }
      return null;
    },
  });

  const lastPage = query.data?.pages[query.data.pages.length - 1];

  return {
    data: query.data?.pages.flatMap((page) => page.data) ?? [],
    isError: query.isError,
    isLoading: query.isLoading,
    refresh: query.refetch,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: !!query.hasNextPage,
    meta: lastPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isRefetching: query.isRefetching,
  };
}
