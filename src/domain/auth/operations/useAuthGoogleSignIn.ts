import { useAuth } from "src/domain/auth/AuthContext";
import * as WebBrowser from "expo-web-browser";
import { useMemo } from "react";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { api } from "src/api/apiInstance";
import { AuthUser } from "..";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: `${api.defaults.baseURL}/auth/google`,
};

export function useAuthGoogleSignIn() {
  const { saveAuthUser } = useAuth();

  const redirectUri = makeRedirectUri({
    scheme: "ecohectaremobile",
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "google", // Not really used, but required
      redirectUri,
    },
    discovery
  );

  async function handleSignIn() {
    const result = await promptAsync();

    if (result.type === "success" && result.url) {
      const url = new URL(result.url);
      const accessToken = url.searchParams.get("token");
      const userParam = url.searchParams.get("user");

      if (accessToken && userParam) {
        const user = JSON.parse(decodeURIComponent(userParam)) as AuthUser;
        await saveAuthUser({
          accessToken,
          user,
        });
      }
    }
  }

  return {
    isLoading: !request,
    signIn: handleSignIn,
  };
}
