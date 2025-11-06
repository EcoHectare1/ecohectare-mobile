import { email } from "zod/v4-mini";
import { api } from "../api/apiInstance";
import { RegisterFormData } from "../schemas/registerSchema";

export const register = async (data: RegisterFormData) => {
  try {
    const response = await api.post("/auth/register", {
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (response.status === 201) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const auth = await api.post("/auth/login", {
      email,
      password,
    });

    return auth.data;
  } catch (error) {
    return error;
  }
};

export const authService = { login, register };
