import { useAppQuery } from "@infra";
import { userService } from "../userService";
import { useQuery } from "@tanstack/react-query";

export function useGetUserById(id: string) {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["UserId", id],
    queryFn: () => userService.getUserById(id),
  });

  return {
    user: data,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
}
