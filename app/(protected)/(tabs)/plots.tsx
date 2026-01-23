import React, { useRef } from "react";
import { View, Text, Image, Button } from "react-native";
import PlotsList from "../../../src/ui/containers/PlotsList";
import { Screen } from "../../../src/ui/components/Screen";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetCart } from "../../../src/ui/containers/BottomSheetCart/BottomSheetCart";
import MapView from "react-native-maps";
import { BottomSheetMap } from "src/ui/containers/BottomSheetMap";
const Bg = require("../../../assets/backgrounds/signin-bg.png");

const PlotsOfLandScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["100%"];
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  return (
    <>
      <Image
        source={Bg}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />

      <Screen>
        <Button title="Open" onPress={handleOpenPress} />
        <PlotsList />
      </Screen>

      {/* <BottomSheetCart
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose
      /> */}

      <BottomSheetMap
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
      />
    </>
  );
};

export default PlotsOfLandScreen;
