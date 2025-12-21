import { Box, Text, TouchableOpacityBox } from "@components";
import { useAuthSignIn } from "@domain";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, TextInput } from "react-native";
import { useVerifyEmail } from "src/domain/auth/operations/useVerifyEmail";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);
  const { mutate: signIn } = useAuthSignIn();
  const { email, password } = useLocalSearchParams<{
    email: string;
    password: string;
  }>();
  const { data, isLoading, isError, error } = useVerifyEmail(code);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (data) {
      if (email && password) {
        signIn({ email, password });
      } else {
        router.push("sign-in");
      }
    }
  }, [data, router, email, password, signIn]);

  const handleTextChange = (text: string) => {
    const newCode = text.slice(0, 6);
    setCode(newCode);
  };

  const boxArray = new Array(6).fill(0);
  return (
    <Box flex={1} justifyContent="center" paddingHorizontal="s24" gap="s4">
      <Text textAlign="center" color="gray1" fontWeight={"600"} fontSize={16}>
        Verifique seu email
      </Text>
      <Text textAlign="center" color="gray2" fontWeight={"600"} fontSize={14}>
        Foi enviado um código de verificação ao seu email
      </Text>
      <Box justifyContent="center" alignContent="center" marginVertical="s20">
        <Box flexDirection={"row"} justifyContent="center" gap="s12">
          {boxArray.map((_, index) => {
            const digit = code[index] || "";
            const isFocused = index === code.length;
            const isFilled = index < code.length;

            return (
              <TouchableOpacityBox
                key={index}
                style={[
                  styles.box,
                  isFocused && styles.boxFocused,
                  isFilled && styles.boxFilled,
                  isError && styles.boxError,
                ]}
                onPress={() => inputRef.current?.focus()}
              >
                <Text style={styles.text}>{digit}</Text>
              </TouchableOpacityBox>
            );
          })}
        </Box>

        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={handleTextChange}
          maxLength={6}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          style={styles.hiddenInput}
          caretHidden={true}
          editable={!isLoading}
        />

        {isError && (
          <Text style={styles.errorText}>
            {(error as any)?.message || "Invalid code"}
          </Text>
        )}

        {isLoading && <ActivityIndicator style={{ marginTop: 20 }} />}
      </Box>
    </Box>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  box: {
    width: 45,
    height: 55,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  boxFocused: {
    borderColor: "#007AFF",
    backgroundColor: "#f0f8ff",
    transform: [{ scale: 1.05 }],
  },
  boxFilled: {
    borderColor: "#333",
    backgroundColor: "#fff",
  },
  boxError: {
    borderColor: "#ff4d4f",
    backgroundColor: "#fff0f0",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  hiddenInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
  },
  errorText: {
    textAlign: "center",
    color: "#ff4d4f",
    marginTop: 12,
    fontSize: 14,
  },
});
