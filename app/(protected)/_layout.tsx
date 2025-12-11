import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../src/domain/auth/AuthContext";
import { View } from "react-native";

export default function ProtectedLayout() {
  const { authData, loading } = useAuth();

  if (loading) {
    return <View />;
  }

  if (!authData) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack
      screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
