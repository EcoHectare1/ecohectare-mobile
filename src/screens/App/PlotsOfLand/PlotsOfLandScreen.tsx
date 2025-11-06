import React from "react";
import { View, Text, Image } from "react-native";
import PlotsList from "./_components/PlotsList";

const Bg = require("../../../../assets/signin-bg.png");

const PlotsOfLandScreen = () => {
  return (
    <View
      style={{
        flex: 1,
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

      <PlotsList />
    </View>
  );
};

export default PlotsOfLandScreen;
