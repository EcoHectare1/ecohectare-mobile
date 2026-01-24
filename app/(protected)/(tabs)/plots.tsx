import React, { useRef } from "react";
import { Image } from "react-native";
import PlotsList from "../../../src/ui/containers/PlotsList";
import { Screen } from "../../../src/ui/components/Screen";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetCart } from "../../../src/ui/containers/BottomSheetCart/BottomSheetCart";
import { BottomSheetMap } from "../../../src/ui/containers/BottomSheetMap";
import { Box, TouchableOpacityBox, Text } from "@components";
const Bg = require("../../../assets/backgrounds/signin-bg.png");
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useCartStore } from "src/store/useCartStore";
import { useMapStore } from "src/store/useMapStore";

const PlotsOfLandScreen = () => {
  const { totalItems, isCartOpen, openCart, closeCart } = useCartStore();
  const { selectedHectareId, deselectHectare } = useMapStore();

  const bottomSheetRefCart = useRef<BottomSheet>(null);
  const snapPoints = ["75%"];

  const handleMapSheetChanges = (index: number) => {
    if (index === -1) {
      deselectHectare();
    }
  };

  const handleCartSheetChanges = (index: number) => {
    if (index === -1) {
      closeCart();
    }
  };

  return (
    <>
      <Image
        source={Bg}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />

      <Screen>
        <Box
          flexDirection="row"
          paddingVertical="s12"
          justifyContent="flex-end"
        >
          <Box position="relative">
            <TouchableOpacityBox onPress={openCart}>
              <EvilIcons name="cart" size={30} color="black" />
              {totalItems > 0 && (
                <Box
                  position="absolute"
                  top={-8}
                  right={-8}
                  backgroundColor="fbErrorBg"
                  borderRadius="rounded"
                  minWidth={20}
                  height={20}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontSize={12} color="pureWhite" fontWeight="bold">
                    {totalItems}
                  </Text>
                </Box>
              )}
            </TouchableOpacityBox>
          </Box>
        </Box>
        <PlotsList />
      </Screen>

      <BottomSheetCart
        ref={bottomSheetRefCart}
        snapPoints={snapPoints}
        index={isCartOpen ? 0 : -1}
        onChange={handleCartSheetChanges}
        enablePanDownToClose
      />
      {selectedHectareId && (
        <BottomSheetMap
          index={0}
          onChange={handleMapSheetChanges}
          enablePanDownToClose
        />
      )}
    </>
  );
};

export default PlotsOfLandScreen;
