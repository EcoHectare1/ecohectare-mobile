import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Box, BoxProps } from "./Box";
import { useAppSafeArea } from "src/hooks/useAppSafeArea";

export function Screen({
  children,
  scrollable = false,
  ...boxProps
}: PropsWithChildren & BoxProps & { scrollable?: boolean }) {
  const { bottom, top } = useAppSafeArea();
  const Container = scrollable ? ScrollView : View;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <Box
        flex={1}
        paddingHorizontal={"padding"}
        {...boxProps}
        backgroundColor="transparent"
        style={[{ paddingTop: top }]}
      >
        <Container showsVerticalScrollIndicator={false}>{children}</Container>
      </Box>
    </KeyboardAvoidingView>
  );
}
