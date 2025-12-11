import React from "react";
import { View, Text, Image } from "react-native";
import PlotsList from "../../../src/ui/containers/PlotsList";
import { Screen } from "../../../src/ui/components/Screen";

const Bg = require("../../../assets/backgrounds/signin-bg.png");

const PlotsOfLandScreen = () => {
  return (
    <>
      <Image
        source={Bg}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />

      <Screen>
        <PlotsList />
      </Screen>
    </>
  );
};

export default PlotsOfLandScreen;
