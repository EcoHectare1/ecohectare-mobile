import { api } from "src/api/apiInstance";

import { UserUpdateData } from "./userTypes";

export const getUserById = async (id: string) => {
  const response = await api.get("/users", {
    params: {
      id: id,
    },
  });

  return response.data;
};

export const updateUser = async (id: string, data: UserUpdateData) => {
  const response = await api.patch(`/users/${id}`, {
    name: data.name,
    email: data.email,
    password: data.password,
  });

  return response.data;
};

export const userService = {
  getUserById,
  updateUser,
};
