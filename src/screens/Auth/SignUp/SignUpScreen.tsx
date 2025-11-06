import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { RootStackParamList } from "../../../routes/AuthStack";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormData,
  registerSchema,
} from "../../../schemas/registerSchema";
import { useForm } from "react-hook-form";
import { FormInput } from "../../../../components/FormInput";
import { useAuthSignUp } from "../../../hooks/useAuthSignUp";

const SignUpBg = require("../../../../assets/signup-bg.png");
const WhiteLogo = require("../../../../assets/logo-white.png");

const SignUpScreen = () => {
  const { signUp } = useAuthSignUp();

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "SignUpScreen">>();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await signUp(data);
      navigation.navigate("SignInScreen");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
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
        <Image
          source={WhiteLogo}
          resizeMode="contain"
          style={{
            width: 400,
            height: 70,
            alignSelf: "center",
            marginBottom: 32,
          }}
        />

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
      </View>
    </View>
  );
};

export default SignUpScreen;
