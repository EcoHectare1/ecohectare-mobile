import { useQuery } from "@tanstack/react-query";

type UseFetchDataReturn<DataT> = {
  data?: DataT;
  isLoading: boolean;
  isPending: boolean;
  error: unknown;
  isError: boolean;
};

type UseAppQueryParams<DataT> = {
  queryKey: (string | null | undefined | number)[];
  fetchData: () => Promise<DataT>;
  enabled: boolean;
};

export function useAppQuery<DataT>({
  fetchData,
  queryKey,
  enabled,
}: UseAppQueryParams<DataT>): UseFetchDataReturn<DataT> {
  const { data, isLoading, error, isPending, isError } = useQuery({
    queryKey,
    queryFn: fetchData,
    enabled,
  });

  return {
    data,
    isLoading,
    isPending,
    error,
    isError,
  };
}
