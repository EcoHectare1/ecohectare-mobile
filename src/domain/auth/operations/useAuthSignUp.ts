import { authService } from "../authService";
import { useAppMutation, UseAppMutationOptions } from "@infra";
import { AuthSignUpParams } from "../authTypes";
import { router } from "expo-router";

export function useAuthSignUp(options?: UseAppMutationOptions<void>) {
  return useAppMutation<void, AuthSignUpParams>({
    mutationFn: (signUpData) => authService.register(signUpData),
    onSuccess: () => {
      router.push("verify-email");
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
