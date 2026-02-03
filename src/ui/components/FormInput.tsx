import React from "react";
import { View, TextInput } from "react-native";
import { Text } from "./Text";
import { Controller } from "react-hook-form";

type Props = {
  disabled?: boolean;
  control: any;
  label?: string;
  name: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  rules?: object;
  borderColor: string;
  backgroundColor: string;
  placeholderColor: string;
  textColor: string;
};

export function FormInput({
  control,
  label,
  name,
  placeholder,
  secureTextEntry,
  borderColor,
  backgroundColor,
  placeholderColor,
  textColor,
}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={{ marginBottom: 12 }}>
          {label && (
            <Text fontWeight={"800"} padding="s4" style={{ color: textColor }}>
              {label}
            </Text>
          )}
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: error ? "red" : borderColor,
              backgroundColor,
              borderRadius: 8,
              padding: 10,
              color: textColor,
            }}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
          />
          {error && (
            <Text style={{ color: "red", marginTop: 4 }}>{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
