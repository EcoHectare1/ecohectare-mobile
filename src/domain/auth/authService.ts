import { email } from "zod/v4-mini";
import { RegisterFormData } from "../../schemas/registerSchema";
import { api } from "../../api/apiInstance";
import { AuthSignUpParams } from "./authTypes";

export const register = async (signUpData: AuthSignUpParams): Promise<void> => {
  try {
    const response = await api.post("/auth/register", {
      name: signUpData.name,
      email: signUpData.email,
      password: signUpData.password,
    });
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
    throw error;
  }
};

export const authService = { login, register };
