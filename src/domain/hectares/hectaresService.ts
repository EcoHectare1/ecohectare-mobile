import { api } from "src/api/apiInstance";
import { PageParams } from "src/api/apiType";

export const getAllHectares = async (params: PageParams) => {
  const response = await api.get("/hectares", {
    params: {
      page: params.page,
      limit: params.limit,
    },
  });

  return response.data;
};

export const getHectareById = async (id: string) => {
  const response = await api.get(`/hectares/${id}`);
  return response.data;
};

export const hectaresService = {
  getAllHectares,
  getHectareById,
};
