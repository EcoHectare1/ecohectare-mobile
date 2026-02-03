import { Box, TouchableOpacityBox, Text } from "@components";
import { useAppTheme } from "@theme";
import React, { useState } from "react";
import { StyleSheet, Dimensions, Image } from "react-native";

const { width } = Dimensions.get("window");
const TABS = ["EVI", "NDVI", "SAVI"];

export const Tabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { colors } = useAppTheme();

  const EOS = require("../../../assets/images/eos-mock.jpeg");

  return (
    <Box mt="s32" flexDirection="column" gap="s16">
      <Box
        width={"100%"}
        height={200}
        borderWidth={1}
        borderColor="primary"
        borderRadius="default"
        overflow="hidden"
      >
        <Image
          source={EOS}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {TABS.map((tab, index) => {
          const isActive = activeIndex === index;

          return (
            <TouchableOpacityBox
              key={tab}
              activeOpacity={1}
              onPress={() => setActiveIndex(index)}
              flex={1}
              height={40}
              justifyContent="center"
              alignItems="center"
              borderRadius="small"
              marginHorizontal="s4"
              style={[isActive ? styles.tabItemActive : styles.tabItemInactive]}
            >
              <Text
                fontSize={16}
                fontWeight={"800"}
                letterSpacing={1}
                style={[isActive ? styles.textActive : styles.textInactive]}
              >
                {tab}
              </Text>
            </TouchableOpacityBox>
          );
        })}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  tabItemActive: {
    backgroundColor: "#5df23d",
  },
  tabItemInactive: {
    borderWidth: 1,
    borderColor: "#050a05",
  },

  textActive: {
    color: "#050a05",
  },
  textInactive: {
    color: "#050a05",
  },
});
