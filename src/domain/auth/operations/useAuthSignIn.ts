import { useAuth } from "../AuthContext";
import { authService } from "../authService";
import { useAppMutation } from "@infra";
import { AuthCredentials } from "../authTypes";
import { useToastStore } from "src/store/useToastStore";

export function useAuthSignIn() {
  const { saveAuthUser } = useAuth();
  const { show } = useToastStore();

  const { mutate, isPending, error } = useAppMutation<
    AuthCredentials,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => authService.login(email, password),

    onSuccess: (auth) => {
      saveAuthUser(auth);
    },

    onError: () => {
      show("Wrong credentials", "error");
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
}
