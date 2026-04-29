import React, { ComponentProps, useRef } from "react";
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from "react-native";

import { useAppTheme } from "@theme";
import { Box, BoxProps } from "./Box";
import { Text } from "./Text";

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  errorMessage?: string;
  RightComponent?: React.ReactElement;
  LeftComponent?: React.ReactElement;
  boxProps?: BoxProps;
  containerProps?: BoxProps;
  backgroundColor?: BoxProps["backgroundColor"];
  borderColor?: BoxProps["borderColor"];
  placeholderColor?: string;
  labelColor?: ComponentProps<typeof Text>["color"];
  inputColor?: string;
  disabled?: boolean;
}
export function TextInput({
  label,
  errorMessage,
  RightComponent,
  LeftComponent,
  boxProps,
  containerProps,
  backgroundColor = "gray3",
  borderColor = "gray3",
  placeholderColor,
  labelColor,
  inputColor,
  disabled = false,
  ...rnTextInputProps
}: TextInputProps) {
  const { colors } = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  const $textInputContainer: BoxProps = {
    flexDirection: "row",
    borderWidth: errorMessage ? 2 : 1,
    borderColor: errorMessage ? "fbErrorSurface" : borderColor,
    padding: "s12",
    borderRadius: "small",
    opacity: disabled ? 0.5 : 1,
  };

  function focusInput() {
    if (!disabled) inputRef.current?.focus();
  }
  return (
    <Box flexGrow={1} flexShrink={1} {...boxProps}>
      <Pressable onPress={focusInput}>
        {label && (
          <Text color={labelColor} fontWeight={"800"} marginBottom="s4">
            {label}
          </Text>
        )}
        <Box
          {...$textInputContainer}
          {...containerProps}
          backgroundColor={backgroundColor}
        >
          {LeftComponent && (
            <Box justifyContent="center" mr="s16">
              {LeftComponent}
            </Box>
          )}
          <RNTextInput
            autoCapitalize="none"
            ref={inputRef}
            editable={!disabled}
            placeholderTextColor={placeholderColor ?? colors.gray2}
            style={[
              $textInputStyle,
              inputColor ? { color: inputColor } : undefined,
            ]}
            {...rnTextInputProps}
          />
          {RightComponent && (
            <Box justifyContent="center" ml="s16">
              {RightComponent}
            </Box>
          )}
        </Box>
        {errorMessage && <Text color="fbErrorSurface">{errorMessage}</Text>}
      </Pressable>
    </Box>
  );
}

export const $textInputStyle: TextStyle = {
  padding: 0,
  flexGrow: 1,
  flexShrink: 1,
};
