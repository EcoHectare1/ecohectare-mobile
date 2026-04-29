import { useQueryClient } from "@tanstack/react-query";
import { useAppMutation } from "@infra";
import { userService } from "../userService";
import { UserUpdateData } from "../userTypes";
import { useToastStore } from "src/store/useToastStore";
import { useAuth } from "src/domain/auth/AuthContext";

export function useUpdateUser() {
  const { show } = useToastStore();
  const { authData, updateAuthUser } = useAuth();

  return useAppMutation({
    mutationFn: ({ id, data }: { id: string; data: UserUpdateData }) =>
      userService.updateUser(id, data),

    onSuccess: (updatedUser) => {
      if (authData) {
        updateAuthUser({
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isEmailVerified: updatedUser.isEmailVerified,
          role: updatedUser.role,
        });
      }

      show("User has been updated", "info");
    },

    onError: () => {
      show("Something went wrong", "error");
    },
  });
}
