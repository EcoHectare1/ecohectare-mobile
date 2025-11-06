import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../../../routes/AuthStack";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "../../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../../../components/FormInput";
import { useAuthSignIn } from "../../../hooks/useAuthSignIn";

const SignInBg = require("../../../../assets/signin-bg.png");
const Logo = require("../../../../assets/logo.png");

const SignInScreen = () => {
  const { signIn, loading, error } = useAuthSignIn();

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "SignInScreen">>();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data.email, data.password);
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
        source={SignInBg}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />

      <View style={{ width: 260 }}>
        <Image
          source={Logo}
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
          name="email"
          placeholder="E-mail"
          borderColor="#18710D"
          backgroundColor="#E8FDE6"
          placeholderColor="#2D3D2B"
          textColor="#2D3D2B"
        />
        <FormInput
          control={control}
          name="password"
          placeholder="Senha"
          secureTextEntry
          borderColor="#18710D"
          backgroundColor="#E8FDE6"
          placeholderColor="#2D3D2B"
          textColor="#2D3D2B"
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
            {isSubmitting ? "Entrando..." : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;
