import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useAuth } from "../../../src/domain/auth/AuthContext";

const Bg = require("../../../assets/backgrounds/signin-bg.png");

const HomeScreen = () => {
  const { removeAuthUser } = useAuth();

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
        source={Bg}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />

      <Pressable onPress={removeAuthUser}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
