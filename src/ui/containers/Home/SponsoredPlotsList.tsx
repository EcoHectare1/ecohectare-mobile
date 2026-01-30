import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import PlotItem, { PlotItemProps } from "./PlotItem";
import { useAppTheme } from "@theme";
import { Box, Text } from "@components";

interface SponsoredPlotsListProps {
  data: any;
}

const lotes = [
  {
    code: "1",
    title: "Amazônia",
    subtitle: "Região Norte",
    lat: -2.92,
    lng: -60.3,
    status: "Apadrinhado",
  },
  {
    code: "2",
    title: "Amazônia",
    subtitle: "Região Centro-Oeste",
    lat: -18.0,
    lng: -56.5,
    status: "Apadrinhado",
  },
  {
    code: "3",
    title: " Amazônia",
    subtitle: "Região Sudeste",
    lat: -23.53,
    lng: -46.63,
    status: "Apadrinhado",
  },
  {
    code: "4",
    title: "Amazônia",
    subtitle: "Região Centro-Oeste",
    lat: -15.77,
    lng: -47.92,
    status: "Em Apadrinhado",
  },
  {
    code: "5",
    title: "Amazônia",
    subtitle: "Região Nordeste",
    lat: -9.38,
    lng: -40.5,
    status: "Apadrinhado",
  },
];

export const SponsoredPlotsList = () => {
  const { spacing } = useAppTheme();
  function renderItem({ item }: ListRenderItemInfo<PlotItemProps>) {
    return <PlotItem {...item} />;
  }

  return (
    <Box flexDirection="column" gap="s14" mt="s32">
      <Text fontWeight={"800"} fontSize={20} color="primary">
        Lotes Apadrinhados
      </Text>
      <FlatList
        data={lotes}
        renderItem={renderItem}
        horizontal
        style={{
          marginHorizontal: -spacing.padding,
          overflow: "visible",
        }}
        contentContainerStyle={{
          gap: 10,
          paddingHorizontal: spacing.padding,
        }}
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
};
