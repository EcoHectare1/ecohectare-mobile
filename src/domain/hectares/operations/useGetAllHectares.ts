import { usePaginatedList } from "@infra";
import { hectaresService } from "../hectaresService";

export function useGetAllHectares(search?: string) {
  return usePaginatedList(
    ["PlotList", search],
    (pageParam) => hectaresService.getAllHectares({ page: pageParam }, search),
    {
      enabled: search?.length! > 0,
      staleTime: 30000,
    },
  );
}
