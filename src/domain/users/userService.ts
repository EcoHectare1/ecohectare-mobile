import { api } from "src/api/apiInstance";
import { PageParams } from "src/api/apiType";

export const getUserById = async (id: string) => {
  const response = await api.get("/users", {
    params: {
      _id: id,
    },
  });

  return response.data;
};

export const userService = {
  getUserById,
};
