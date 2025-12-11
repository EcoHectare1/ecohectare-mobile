import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthCredentials, AuthUser } from "./authTypes";
import { router, SplashScreen } from "expo-router";

export interface AuthContextData {
  authData: AuthCredentials | null;
  saveAuthUser: (authUser: AuthCredentials) => Promise<void>;
  removeAuthUser: () => void;
  loading: boolean;
}

const AUTH_KEY = "@Auth";

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [authData, setAuth] = useState<AuthCredentials | null>(null);
  const [loading, setLoading] = useState(true);

  async function saveAuthUser(user: AuthCredentials) {
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(user));
    setAuth(user);
    router.replace("/");
  }

  async function removeAuthUser() {
    await AsyncStorage.removeItem(AUTH_KEY);
    setAuth(null);
  }

  async function loadStorage() {
    try {
      const auth = await AsyncStorage.getItem(AUTH_KEY);

      if (auth) {
        setAuth(JSON.parse(auth) as AuthCredentials);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStorage();
  }, []);

  useEffect(() => {
    if (loading) {
      SplashScreen.hide();
    }
  }, [loading]);

  return (
    <AuthContext.Provider
      value={{ authData, loading, saveAuthUser, removeAuthUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
