import { Box, Text, TouchableOpacityBox } from "@components";
import { IHectare } from "@domain";
import React from "react";
import { useCartStore } from "src/store/useCartStore";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const CartItem = ({
  _id,
  hectare_code,
  land_plot_id,
  value,
}: IHectare) => {
  const { removeItem } = useCartStore();

  return (
    <Box
      borderWidth={1}
      borderRadius={"default"}
      borderColor="mainGreen"
      padding="s16"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      gap="s14"
    >
      <Box flexDirection="column" gap="s14">
        <Text color="black" fontSize={24} fontWeight={"700"}>
          Lote {hectare_code}
        </Text>

        <Text color="primary" fontSize={14} fontWeight={"400"}>
          US$ {value}
        </Text>
      </Box>

      <TouchableOpacityBox onPress={() => removeItem(_id)}>
        <FontAwesome6 name="trash-can" size={20} color="red" />
      </TouchableOpacityBox>
    </Box>
  );
};
