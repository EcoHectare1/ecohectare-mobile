import { authService } from "../services/authService";
import { useState } from "react";
import { RegisterFormData } from "../schemas/registerSchema";

export function useAuthSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function signUp(data: RegisterFormData) {
    setError(null);
    setLoading(true);
    try {
      await authService.register(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    signUp,
    loading,
    error,
  };
}
