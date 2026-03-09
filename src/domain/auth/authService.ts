import { api } from "../../api/apiInstance";
import { AuthSignUpParams } from "./authTypes";

export const register = async (signUpData: AuthSignUpParams): Promise<void> => {
  await api.post("/auth/register", {
    name: signUpData.name,
    email: signUpData.email,
    password: signUpData.password,
  });
};

export const verifyEmail = async (token: string) => {
  const response = await api.get(`/auth/verify-email?token=${token}`);
  return response.data;
};

export const login = async (email: string, password: string) => {
  const auth = await api.post("/auth/login", {
    email,
    password,
  });

  return auth.data;
};

export const authService = { login, register, verifyEmail };
