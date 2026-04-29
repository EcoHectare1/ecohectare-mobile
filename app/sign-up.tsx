import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

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
import { Screen } from "@components";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpBg = require("../assets/backgrounds/signup-bg.png");

const SignUpScreen = () => {
  const { mutate: signUp } = useAuthSignUp();
  const router = useRouter();
  const { t } = useTranslation();

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
    <>
      <Image
        source={SignUpBg}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />

      <Screen>
        <SafeAreaView style={{ paddingTop: 100 }}>
          <LogoLight />

          <FormInput
            control={control}
            name="name"
            placeholder={t("common.name")}
            backgroundColor="#253A22"
            borderColor="#1CFF00"
            placeholderColor="#ffff"
            textColor="#ffff"
          />
          <FormInput
            control={control}
            name="email"
            placeholder={t("common.email")}
            backgroundColor="#253A22"
            borderColor="#1CFF00"
            placeholderColor="#ffff"
            textColor="#ffff"
          />
          <FormInput
            control={control}
            name="password"
            placeholder={t("common.password")}
            secureTextEntry
            backgroundColor="#253A22"
            borderColor="#1CFF00"
            placeholderColor="#ffff"
            textColor="#ffff"
          />
          <FormInput
            control={control}
            name="confirmPassword"
            placeholder={t("common.confirm_password")}
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
              backgroundColor: isSubmitting
                ? "rgba(255,255,255,0.2)"
                : "#55F041",
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
              {isSubmitting ? t("sign_up.submitting") : t("sign_up.submit")}
            </Text>
          </TouchableOpacity>

          <TextLink
            colorText="pureWhite"
            href={"/sign-in"}
            text={t("sign_up.has_account")}
            ctaText={t("sign_up.sign_in")}
          />
        </SafeAreaView>
      </Screen>
    </>
  );
};

export default SignUpScreen;
