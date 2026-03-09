import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useAuthSignIn } from "../src/domain/auth/operations/useAuthSignIn";
import { LoginFormData, loginSchema } from "../src/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo } from "../src/ui/containers/Logo";
import { TextLink } from "../src/ui/containers/TextLink";
import { useAppTheme } from "@theme";
import { Box, FormInput, Screen } from "@components";
import { useAuthGoogleSignIn } from "../src/domain/auth/operations/useAuthGoogleSignIn";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormPasswordInput } from "src/ui/components/FormPasswordInput";
import { FormTextInput } from "src/ui/components/FormTextInput";

const SignInBg = require("../assets/backgrounds/signin-bg.png");

const SignInScreen = () => {
  const { mutate: signIn } = useAuthSignIn();
  const { signIn: googleSignIn } = useAuthGoogleSignIn();
  const { colors } = useAppTheme();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    signIn({ email: data.email, password: data.password });
  };

  return (
    <>
      <Image
        source={SignInBg}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />
      <Screen scrollable>
        <SafeAreaView style={{ paddingTop: 100 }}>
          <Logo />

          <FormTextInput
            control={control}
            name="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
            backgroundColor="lightGreen"
            borderColor="primary"
            labelColor="primary"
            boxProps={{ mb: "s20" }}
          />

          <FormPasswordInput
            control={control}
            label="Password"
            name="password"
            placeholder={t("common.password")}
            borderColor="primary"
            backgroundColor="lightGreen"
            labelColor="primary"
          />

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            style={{
              backgroundColor: isSubmitting
                ? "rgba(255,255,255,0.2)"
                : colors.secondary,
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
              {isSubmitting ? t("sign_in.submitting") : t("sign_in.submit")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => googleSignIn()}
            style={{
              backgroundColor: colors.primary,
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>
              {t("sign_in.google_sign_in")}
            </Text>
          </TouchableOpacity>

          <TextLink
            href={"sign-up"}
            text={t("sign_in.no_account")}
            ctaText={t("sign_in.create")}
            colorText="gray2"
          />
        </SafeAreaView>
      </Screen>
    </>
  );
};

export default SignInScreen;
