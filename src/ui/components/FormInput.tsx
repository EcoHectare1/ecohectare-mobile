import React from "react";
import { View, TextInput, Text } from "react-native";
import { Controller } from "react-hook-form";

type Props = {
  control: any;
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
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: error ? "red" : borderColor,
              backgroundColor,
              borderRadius: 8,
              padding: 14,
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
