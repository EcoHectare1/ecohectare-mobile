import { authService } from "../authService";
import { useAppMutation } from "@infra";
import { AuthSignUpParams } from "../authTypes";
import { router } from "expo-router";

export function useAuthSignUp() {
  return useAppMutation<void, AuthSignUpParams>({
    mutationFn: (signUpData) => authService.register(signUpData),
    onSuccess: (_data, variables) => {
      router.push({
        pathname: "verify-email",
        params: { email: variables.email, password: variables.password },
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
