import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthData {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isEmailVerified: boolean;
}

export interface AuthContextData {
  authData: AuthData | null;
  saveAuthUser: (authUser: AuthData) => Promise<void>;
  removeAuthUser: () => void;
  loading: boolean;
}

const AUTH_KEY = "@AuthData";

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [authData, setAuth] = useState<AuthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorage();
  }, []);

  async function saveAuthUser(user: AuthData) {
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(user));
    setAuth(user);
  }

  async function removeAuthUser() {
    await AsyncStorage.removeItem(AUTH_KEY);
    setAuth(null);
  }

  async function loadStorage() {
    try {
      const auth = await AsyncStorage.getItem(AUTH_KEY);

      if (auth) {
        setAuth(JSON.parse(auth) as AuthData);
      }
    } catch (error) {
      console.error("Failed to load auth data from storage", error);
    } finally {
      setLoading(false);
    }
  }

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
