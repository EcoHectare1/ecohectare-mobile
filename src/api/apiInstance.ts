import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { AuthCredentials } from "src/domain/auth/authTypes";
import { isTokenExpired } from "src/utils/jwtUtils";

const AUTH_KEY = "@Auth";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

async function logout() {
  await AsyncStorage.removeItem(AUTH_KEY);
  router.replace("/sign-in");
}

api.interceptors.request.use(async (config) => {
  try {
    const raw = await AsyncStorage.getItem(AUTH_KEY);
    if (raw) {
      const { accessToken } = JSON.parse(raw) as AuthCredentials;
      if (accessToken) {
        if (isTokenExpired(accessToken)) {
          await logout();
          return Promise.reject(new axios.Cancel("Token expired"));
        }
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
  } catch (error) {
    if (!axios.isCancel(error)) throw error;
  }
  return config;
});
