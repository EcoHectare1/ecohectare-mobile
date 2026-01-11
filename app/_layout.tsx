import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { AppStack } from "../src/ui/navigation/AppStack";
import theme from "../src/ui/theme/theme";
import { AuthProvider } from "../src/domain/auth/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useKeepAwake } from "expo-keep-awake";

const queryClient = new QueryClient();

export default function RootLayout() {
  useKeepAwake();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <AppStack />
          <StatusBar style="dark" />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
