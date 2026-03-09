import { createContext, useContext, useEffect, useRef, useState } from "react";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState, AppStateStatus } from "react-native";
import { AuthCredentials, AuthUser } from "./authTypes";
import { router, SplashScreen } from "expo-router";
import { isTokenExpired } from "src/utils/jwtUtils";

export interface AuthContextData {
  authData: AuthCredentials | null;
  saveAuthUser: (authUser: AuthCredentials) => Promise<void>;
  updateAuthUser: (updatedUser: AuthUser) => Promise<void>;
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
  const appState = useRef(AppState.currentState);

  async function saveAuthUser(user: AuthCredentials) {
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(user));
    setAuth(user);
    router.replace("/");
  }

  async function updateAuthUser(updatedUser: AuthUser) {
    if (!authData) return;
    const updated: AuthCredentials = { ...authData, user: updatedUser };
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(updated));
    setAuth(updated);
  }

  async function removeAuthUser() {
    await AsyncStorage.removeItem(AUTH_KEY);
    setAuth(null);
  }

  async function checkTokenExpiry() {
    try {
      const raw = await AsyncStorage.getItem(AUTH_KEY);
      if (raw) {
        const credentials = JSON.parse(raw) as AuthCredentials;
        if (isTokenExpired(credentials.accessToken)) {
          await removeAuthUser();
          router.replace("/sign-in");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function loadStorage() {
    try {
      const raw = await AsyncStorage.getItem(AUTH_KEY);

      if (raw) {
        const credentials = JSON.parse(raw) as AuthCredentials;
        if (isTokenExpired(credentials.accessToken)) {
          await AsyncStorage.removeItem(AUTH_KEY);
        } else {
          setAuth(credentials);
        }
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
    const subscription = AppState.addEventListener(
      "change",
      (nextState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextState === "active"
        ) {
          checkTokenExpiry();
        }
        appState.current = nextState;
      }
    );

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (loading) {
      SplashScreen.hide();
    }
  }, [loading]);

  return (
    <AuthContext.Provider
      value={{ authData, loading, saveAuthUser, updateAuthUser, removeAuthUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
