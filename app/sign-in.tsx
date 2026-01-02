import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { useAuthSignIn } from "../src/domain/auth/operations/useAuthSignIn";
import { LoginFormData, loginSchema } from "../src/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo } from "../src/ui/containers/Logo";
import { TextLink } from "../src/ui/containers/TextLink";
import { useAppTheme } from "@theme";
import { FormInput } from "@components";
import { useAuthGoogleSignIn } from "../src/domain/auth/operations/useAuthGoogleSignIn";

const SignInBg = require("../assets/backgrounds/signin-bg.png");

const SignInScreen = () => {
  const { mutate: signIn } = useAuthSignIn();
  const { signIn: googleSignIn } = useAuthGoogleSignIn();
  const { colors } = useAppTheme();

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
        source={SignInBg}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />

      <View style={{ width: 260 }}>
        <Logo />

        <FormInput
          control={control}
          name="email"
          placeholder="E-mail"
          borderColor={colors.primary}
          backgroundColor="#E8FDE6"
          placeholderColor={colors.gray1}
          textColor={colors.gray1}
        />

        <FormInput
          control={control}
          name="password"
          placeholder="Senha"
          secureTextEntry
          borderColor={colors.primary}
          backgroundColor="#E8FDE6"
          placeholderColor={colors.gray1}
          textColor={colors.gray1}
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
            {isSubmitting ? "Entrando..." : "Login"}
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
            Entrar com Google
          </Text>
        </TouchableOpacity>

        <TextLink
          href={"sign-up"}
          text="Ainda não tem uma conta?"
          ctaText="Criar"
          colorText="gray2"
        />
      </View>
    </View>
  );
};

export default SignInScreen;
