import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormData,
  registerSchema,
} from "../src/schemas/registerSchema";
import { useForm } from "react-hook-form";
import { useAuthSignUp } from "../src/domain/auth/operations/useAuthSignUp";
import { useRouter } from "expo-router";
import { FormInput } from "../src/ui/components/FormInput";
import { LogoLight } from "../src/ui/containers/LogoLight";
import { TextLink } from "../src/ui/containers/TextLink";

const SignUpBg = require("../assets/backgrounds/signup-bg.png");

const SignUpScreen = () => {
  const { mutate: signUp } = useAuthSignUp();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (signUpValues: RegisterFormData) => {
    signUp({
      name: signUpValues.name,
      email: signUpValues.email,
      password: signUpValues.password,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 52,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={SignUpBg}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />

      <View style={{ width: 260 }}>
        <LogoLight />

        <FormInput
          control={control}
          name="name"
          placeholder="Nome"
          backgroundColor="#253A22"
          borderColor="#1CFF00"
          placeholderColor="#ffff"
          textColor="#ffff"
        />
        <FormInput
          control={control}
          name="email"
          placeholder="E-mail"
          backgroundColor="#253A22"
          borderColor="#1CFF00"
          placeholderColor="#ffff"
          textColor="#ffff"
        />
        <FormInput
          control={control}
          name="password"
          placeholder="Senha"
          secureTextEntry
          backgroundColor="#253A22"
          borderColor="#1CFF00"
          placeholderColor="#ffff"
          textColor="#ffff"
        />
        <FormInput
          control={control}
          name="confirmPassword"
          placeholder="Confirmar senha"
          secureTextEntry
          backgroundColor="#253A22"
          borderColor="#1CFF00"
          placeholderColor="#ffff"
          textColor="#ffff"
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? "rgba(255,255,255,0.2)" : "#55F041",
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 6,
          }}
        >
          <Text
            style={{
              color: isSubmitting ? "#666" : "#0a0a0a",
              fontWeight: "700",
            }}
          >
            {isSubmitting ? "Cadastrando..." : "Cadastre-se"}
          </Text>
        </TouchableOpacity>

        <TextLink
          colorText="pureWhite"
          href={"/sign-in"}
          text="Já possui uma conta?"
          ctaText="Entrar"
        />
      </View>
    </View>
  );
};

export default SignUpScreen;
