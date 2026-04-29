import React, { useRef, useMemo, useEffect, useState } from "react";
import { Image, Animated, TextInput as RNTextInput } from "react-native";
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import PlotsList from "../../../src/ui/containers/PlotsList";
import { Screen } from "../../../src/ui/components/Screen";
import { BottomSheetMap } from "../../../src/ui/containers/BottomSheetMap";
import { Box, TouchableOpacityBox, Text } from "@components";
const Bg = require("../../../assets/backgrounds/signin-bg.png");
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useCartStore } from "src/store/useCartStore";
import { useMapStore } from "src/store/useMapStore";
import { router } from "expo-router";
import { IHectareFull, hectaresService } from "@domain";
import { useAppQuery } from "@infra";
import { useAppTheme } from "@theme";

const SEARCH_BAR_HEIGHT = 52;

const PlotsOfLandScreen = () => {
  const { totalItems } = useCartStore();
  const { selectedHectareId, deselectHectare } = useMapStore();
  const { colors } = useAppTheme();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<RNTextInput>(null);
  const cartIconScale = useRef(new Animated.Value(1)).current;
  const searchHeight = useSharedValue(0);
  const searchOpacity = useSharedValue(0);

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

  const animatedSearchStyle = useAnimatedStyle(() => ({
    height: searchHeight.value,
    opacity: searchOpacity.value,
  }));

  function toggleSearch() {
    if (searchVisible) {
      searchHeight.value = withTiming(0, { duration: 200 });
      searchOpacity.value = withTiming(0, { duration: 150 });
      setSearchQuery("");
      setSearchVisible(false);
    } else {
      setSearchVisible(true);
      searchHeight.value = withSpring(SEARCH_BAR_HEIGHT, {});
      searchOpacity.value = withTiming(1, { duration: 250 });
      setTimeout(() => searchInputRef.current?.focus(), 300);
    }
  }

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
          justifyContent="space-between"
          alignItems="center"
        >
          <TouchableOpacityBox onPress={toggleSearch} padding="s4">
            <EvilIcons
              name={searchVisible ? "close" : "search"}
              size={28}
              color={colors.black}
            />
          </TouchableOpacityBox>

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

        <Reanimated.View style={[{ overflow: "hidden" }, animatedSearchStyle]}>
          <Box
            flexDirection="row"
            backgroundColor="pureWhite"
            borderRadius="small"
            paddingHorizontal="s12"
            alignItems="center"
            borderWidth={1}
            borderColor="gray1"
            marginBottom="s8"
          >
            <EvilIcons name="search" size={22} color={colors.gray2} />
            <RNTextInput
              ref={searchInputRef}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search plots..."
              placeholderTextColor={colors.gray2}
              style={{
                flex: 1,
                paddingHorizontal: 8,
                paddingVertical: 10,
                color: colors.black,
                fontSize: 14,
              }}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacityBox onPress={() => setSearchQuery("")}>
                <EvilIcons name="close" size={22} color={colors.gray2} />
              </TouchableOpacityBox>
            )}
          </Box>
        </Reanimated.View>

        <PlotsList searchQuery={searchQuery} />
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
