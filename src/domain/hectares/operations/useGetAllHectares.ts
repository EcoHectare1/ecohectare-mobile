import { usePaginatedList } from "@infra";
import { hectaresService } from "../hectaresService";

export function useGetAllHectares(page: number) {
  return usePaginatedList(["PlotList"], (pageParam) =>
    hectaresService.getAllHectares({ page: pageParam })
  );
}
