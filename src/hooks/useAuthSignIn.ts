import { Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import { useState } from "react";

export function useAuthSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { saveAuthUser } = useAuth();

  async function signIn(email: string, password: string) {
    setError(null);
    setLoading(true);
    try {
      const auth = await authService.login(email, password);
      saveAuthUser(auth.user);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    signIn,
    loading,
    error,
  };
}
