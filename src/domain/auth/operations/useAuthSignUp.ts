import { authService } from "../authService";
import {
  useAppMutation,
  UseAppMutationOptions,
} from "../../../infra/operations/useAppMutation";
import { AuthSignUpParams } from "../authTypes";
import { router } from "expo-router";

export function useAuthSignUp(options?: UseAppMutationOptions<void>) {
  return useAppMutation<void, AuthSignUpParams>({
    mutationFn: (signUpData) => authService.register(signUpData),
    onSuccess: () => {
      console.log("User has been created");
      router.replace("/sign-in");
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
