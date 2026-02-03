import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../src/domain/auth/AuthContext";
import { ImageBackground, StyleSheet, View } from "react-native";

const bg = require("../../assets/backgrounds/signin-bg.png");

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
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
        animation: "slide_from_bottom",
        contentStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
