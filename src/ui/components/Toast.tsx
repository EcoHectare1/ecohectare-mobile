import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { Box } from "./Box";
import { Text } from "./Text";
import { useToastStore, ToastType } from "../../store/useToastStore";
import { useAppTheme } from "@theme";
import { ThemeColors } from "../theme/theme";

const ANIMATION_DURATION = 350;

type ToastConfig = {
  bg: ThemeColors;
  surface: ThemeColors;
  icon: string;
};

const toastConfigs: Record<ToastType, ToastConfig> = {
  success: {
    bg: "fbSuccessBg",
    surface: "fbSuccessSurface",
    icon: "check-circle",
  },
  error: { bg: "fbErrorBg", surface: "fbErrorSurface", icon: "times-circle" },
  warning: {
    bg: "fbWarningBg",
    surface: "fbWarningSurface",
    icon: "exclamation-triangle",
  },
  info: { bg: "fbInfoBg", surface: "fbInfoSurface", icon: "info-circle" },
};

export function Toast() {
  const { visible, message, type, duration, toastId, hide } = useToastStore();
  const { top } = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const translateY = useSharedValue(-200);
  const config = toastConfigs[type];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    if (!visible) return;

    translateY.value = withTiming(0, { duration: ANIMATION_DURATION });

    const dismissTimer = setTimeout(() => {
      translateY.value = withTiming(-200, { duration: ANIMATION_DURATION });
      setTimeout(hide, ANIMATION_DURATION);
    }, duration);

    return () => clearTimeout(dismissTimer);
  }, [toastId]);

  return (
    <Animated.View
      style={[styles.container, { top: top + 8 }, animatedStyle]}
      pointerEvents="none"
    >
      <Box
        backgroundColor={config.bg}
        borderRadius="small"
        borderWidth={1}
        borderColor={config.surface}
        paddingHorizontal="s16"
        paddingVertical="s12"
        flexDirection="row"
        alignItems="center"
        gap="s12"
      >
        <FontAwesome5
          name={config.icon as any}
          size={18}
          color={colors[config.surface]}
        />
        <Text variant="text14" style={{ flex: 1 }}>
          {message}
        </Text>
      </Box>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 9999,
  },
});
