import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useAuth } from "../../../src/domain/auth/AuthContext";

// const Bg = require("../../../assets/signin-bg.png");

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
      {/* <Image
        source={Bg}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      /> */}

      <Pressable onPress={removeAuthUser}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
