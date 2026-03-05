import { Box, Text } from "@components";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { useTranslation } from "react-i18next";

export interface PlotItemProps {
  code: string;
  title: string;
  subtitle: string;
  lat: number;
  lng: number;
}

const PlotItem = ({ code, title, subtitle, lat, lng }: PlotItemProps) => {
  const { t } = useTranslation();
  return (
    <Box
      overflow="hidden"
      backgroundColor="pureWhite"
      width={150}
      height={150}
      borderRadius="default"
      flexDirection="column"
      gap="s14"
    >
      <Box padding="s14" flexDirection="column" gap="s8">
        <Box
          backgroundColor="secondaryGreen"
          width={40}
          height={40}
          justifyContent="center"
          alignItems="center"
          borderRadius="small"
        >
          <MaterialCommunityIcons name="map-plus" size={30} color="black" />
        </Box>
        <Box>
          <Text color="charcoalGrey" fontSize={14} fontWeight={"800"}>
            {t("plots.plot")} {code} - {title}
          </Text>
          <Text color="stoneGrey" fontSize={12} fontWeight={"800"}>
            {lat}, {lng}
          </Text>
        </Box>
      </Box>

      <Box backgroundColor="secondaryGreen" padding="s4">
        <Text
          textAlign="center"
          color="charcoalGrey"
          fontSize={14}
          fontWeight={"800"}
        >
          {t("home.sponsored")}
        </Text>
      </Box>
    </Box>
  );
};

export default PlotItem;
