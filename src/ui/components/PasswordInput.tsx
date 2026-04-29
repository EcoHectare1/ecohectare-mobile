import React, { useState } from "react";
import { TextInput, TextInputProps } from "./TextInput";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAppTheme } from "@theme";

export type PasswordInputProps = Omit<TextInputProps, "RightComponent"> & {
  iconColor?: string;
};
export function PasswordInput({ iconColor, label, ...props }: PasswordInputProps) {
  const { colors } = useAppTheme();
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  function toggleSecureTextEntry() {
    setIsSecureTextEntry((prev) => !prev);
  }
  return (
    <TextInput
      label={label}
      secureTextEntry={isSecureTextEntry}
      {...props}
      RightComponent={
        <AntDesign
          onPress={toggleSecureTextEntry}
          color={iconColor ?? colors.gray2}
          name={isSecureTextEntry ? "eye" : "eye-invisible"}
        />
      }
    />
  );
}
