import { useAppQuery } from "@infra";
import { authService } from "../authService";

export function useVerifyEmail(token: string) {
  return useAppQuery({
    queryKey: ["verify-email", token],
    fetchData: () => authService.verifyEmail(token),
    enabled: token.length === 6,
  });
}
