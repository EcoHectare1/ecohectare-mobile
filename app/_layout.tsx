import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { AppStack } from "../src/ui/navigation/AppStack";
import theme from "../src/ui/theme/theme";
import { AuthProvider } from "../src/domain/auth/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useKeepAwake } from "expo-keep-awake";
import { StyleSheet } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  useKeepAwake();

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <AppStack />
            <StatusBar style="dark" />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
