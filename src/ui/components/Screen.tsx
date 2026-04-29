import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Box, BoxProps } from "./Box";
import { useAppSafeArea } from "src/hooks/useAppSafeArea";

export function Screen({
  children,
  scrollable = false,
  ...boxProps
}: PropsWithChildren & BoxProps & { scrollable?: boolean }) {
  const Container = scrollable ? ScrollView : View;
  const { bottom, top } = useAppSafeArea();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Box
        flex={1}
        backgroundColor="background"
        paddingHorizontal="padding"
        style={{ paddingBottom: bottom, paddingTop: bottom + 10 }}
        {...boxProps}
      >
        <Container showsVerticalScrollIndicator={false}>{children}</Container>
      </Box>
    </KeyboardAvoidingView>
  );
}
