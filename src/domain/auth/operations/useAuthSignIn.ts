import { useAuth } from "../AuthContext";
import { authService } from "../authService";
import { useAppMutation } from "../../../infra/operations/useAppMutation";
import { AuthCredentials, AuthUser } from "../authTypes";

export function useAuthSignIn() {
  const { saveAuthUser } = useAuth();

  const { mutate, isPending, error } = useAppMutation<
    AuthCredentials,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => authService.login(email, password),

    onSuccess: (auth) => {
      saveAuthUser(auth);
    },

    onError: (error) => console.error(error),
  });

  return {
    mutate,
    isPending,
    error,
  };
}
