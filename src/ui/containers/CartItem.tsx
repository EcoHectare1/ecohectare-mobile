import { Box, Icon, Text, TouchableOpacityBox } from "@components";
import { IHectare } from "@domain";
import React from "react";
import { useCartStore } from "src/store/useCartStore";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const CartItem = ({
  _id,
  hectare_code,
  land_plot_id,
  coordinates,
  value,
}: IHectare) => {
  const { removeItem } = useCartStore();

  return (
    <Box
      backgroundColor="pureWhite"
      borderRadius={"default"}
      padding="s16"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      gap="s16"
    >
      <Box flexDirection="row" alignItems="center" gap="s16">
        <Box
          width={90}
          height={90}
          backgroundColor="lightGray"
          m="s14"
          justifyContent="center"
          alignItems="center"
        >
          <Icon name="map" size={40} color="primary" />
        </Box>
        <Box flexDirection="column" gap="s14">
          <Text color="black" fontSize={20} fontWeight={"700"}>
            Lote {hectare_code}
          </Text>

          <Text color="primary" fontSize={14} fontWeight={"400"}>
            US$ {value}
          </Text>

          <Text fontSize={16} fontWeight={"600"} color="primary">
            <Icon name={"tree"} size={14} color="secondary" />
            {"  "}
            {land_plot_id.name.split(" - ")[1].trim()}
          </Text>

          <Text fontSize={14} fontWeight={"700"} color={"charcoalGrey"} mt="s4">
            <Icon name={"map-marker-alt"} size={14} color="secondary" /> {"  "}
            Lat: {coordinates.lat.toFixed(4)}
          </Text>

          <Text fontSize={14} fontWeight={"700"} color={"charcoalGrey"} mt="s4">
            <Icon name={"map-marker-alt"} size={14} color="secondary" /> {"  "}
            Lng: {coordinates.lng.toFixed(4)}
          </Text>
        </Box>
      </Box>

      <TouchableOpacityBox onPress={() => removeItem(_id)}>
        <FontAwesome6 name="trash-can" size={20} color="red" />
      </TouchableOpacityBox>
    </Box>
  );
};
