import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/AuthStack";

const MenuAuthBg = require("../../../../assets/auth-main-image.png");
const WhiteLogo = require("../../../../assets/logo-white.png");

const MenuAuthScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "MenuAuthScreen">>();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 52,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Image
        source={MenuAuthBg}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />

      <LinearGradient
        colors={["rgba(0,0,0,1)", "rgba(0,0,0,0)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 500,
        }}
      />

      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          marginTop: 100,
          fontSize: 32,
          fontWeight: "300",
          lineHeight: 40,
        }}
      >
        <Text style={{ fontWeight: "600" }}>Você</Text> pode fazer a{" "}
        <Text style={{ fontWeight: "600" }}>diferença!</Text>
      </Text>

      <Image source={WhiteLogo} resizeMode="cover" width={100} />

      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          marginBottom: 52,
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            paddingVertical: 14,
            borderRadius: 14,
          }}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          <Text style={{ fontSize: 16, fontWeight: 600 }}>Cadastre-se</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignInScreen")}
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: "#fff",
            display: "flex",
            alignItems: "center",
            paddingVertical: 14,
            borderRadius: 14,
          }}
        >
          <Text style={{ color: "#55F041", fontSize: 16, fontWeight: 600 }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuAuthScreen;
