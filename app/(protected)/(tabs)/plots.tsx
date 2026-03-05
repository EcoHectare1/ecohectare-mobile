import React, { useRef, useMemo, useEffect } from "react";
import { Image, Animated } from "react-native";
import PlotsList from "../../../src/ui/containers/PlotsList";
import { Screen } from "../../../src/ui/components/Screen";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetMap } from "../../../src/ui/containers/BottomSheetMap";
import { Box, TouchableOpacityBox, Text } from "@components";
const Bg = require("../../../assets/backgrounds/signin-bg.png");
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useCartStore } from "src/store/useCartStore";
import { useMapStore } from "src/store/useMapStore";
import { router } from "expo-router";
import { IHectareFull, hectaresService } from "@domain";
import { useAppQuery } from "@infra";

const PlotsOfLandScreen = () => {
  const { totalItems } = useCartStore();
  const { selectedHectareId, deselectHectare } = useMapStore();

  const cartIconScale = useRef(new Animated.Value(1)).current;

  const { data: selectedHectare } = useAppQuery<IHectareFull>({
    queryKey: ["hectareById", selectedHectareId],
    fetchData: () => hectaresService.getHectareById(selectedHectareId!),
    enabled: !!selectedHectareId,
  });

  useEffect(() => {
    if (totalItems > 0) {
      Animated.sequence([
        Animated.spring(cartIconScale, {
          toValue: 1.2,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.spring(cartIconScale, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [totalItems]);

  const handleMapSheetChanges = (index: number) => {
    if (index === -1) {
      deselectHectare();
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
            <TouchableOpacityBox onPress={() => router.push("/cart")}>
              <EvilIcons name="cart" size={30} color="black" />

              {totalItems > 0 && (
                <Animated.View
                  style={{
                    transform: [{ scale: cartIconScale }],
                    position: "absolute",
                    top: -8,
                    right: -8,
                  }}
                >
                  <Box
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
                </Animated.View>
              )}
            </TouchableOpacityBox>
          </Box>
        </Box>
        <PlotsList />
      </Screen>

      {selectedHectareId && selectedHectare?.coordinates && (
        <BottomSheetMap
          index={0}
          onChange={handleMapSheetChanges}
          enablePanDownToClose
          latitude={selectedHectare?.coordinates.lat}
          longitude={selectedHectare?.coordinates.lng}
        />
      )}
    </>
  );
};

export default PlotsOfLandScreen;
