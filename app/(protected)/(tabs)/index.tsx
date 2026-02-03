import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useAuth } from "../../../src/domain/auth/AuthContext";
import { Box, Screen } from "@components";
import { Header } from "src/ui/containers/Header";
import { SponsoredPlotsList } from "src/ui/containers/Home/SponsoredPlotsList";
import { Tabs } from "src/ui/containers/Tabs";

const Bg = require("../../../assets/backgrounds/signin-bg.png");

const HomeScreen = () => {
  return (
    <>
      <Image
        source={Bg}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />

      <Screen backgroundColor="transparent">
        <Header />
        <SponsoredPlotsList />
        <Tabs />
      </Screen>
    </>
  );
};

export default HomeScreen;
