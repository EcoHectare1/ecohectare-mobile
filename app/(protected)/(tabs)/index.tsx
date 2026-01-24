import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useAuth } from "../../../src/domain/auth/AuthContext";
import { Box, Screen } from "@components";
import { Header } from "src/ui/containers/Header";
import { SponsoredPlotsList } from "src/ui/containers/Home/SponsoredPlotsList";
import { Tabs } from "src/ui/containers/Tabs";

const Bg = require("../../../assets/backgrounds/signin-bg.png");

const HomeScreen = () => {
  const { removeAuthUser } = useAuth();

  const lotes = [
    {
      code: "1",
      title: "Amazônia",
      subtitle: "Região Norte",
      lat: "-2.92",
      lng: "-60.3",
      status: "Apadrinhado",
    },
    {
      code: "2",
      title: "Amazônia",
      subtitle: "Região Centro-Oeste",
      lat: "-18.0",
      lng: "-56.5",
      status: "Apadrinhado",
    },
    {
      code: "3",
      title: " Amazônia",
      subtitle: "Região Sudeste",
      lat: "-23.53",
      lng: "-46.63",
      status: "Apadrinhado",
    },
    {
      code: "4",
      title: "Amazônia",
      subtitle: "Região Centro-Oeste",
      lat: "-15.77",
      lng: "-47.92",
      status: "Em Apadrinhado",
    },
    {
      code: "5",
      title: "Amazônia",
      subtitle: "Região Nordeste",
      lat: "-9.38",
      lng: "-40.5",
      status: "Apadrinhado",
    },
  ];

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
