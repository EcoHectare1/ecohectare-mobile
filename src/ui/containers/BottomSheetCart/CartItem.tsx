import { Box, Text } from "@components";
import { IHectare } from "@domain";
import React from "react";

export const CartItem = ({ hectare_code, land_plot_id, value }: IHectare) => {
  return (
    <Box
      borderWidth={1}
      borderRadius={"default"}
      borderColor="mainGreen"
      padding="s16"
      flexDirection="column"
      gap="s14"
    >
      <Text color="black" fontSize={24} fontWeight={"700"}>
        Lote {hectare_code}
      </Text>

      <Text color="primary" fontSize={14} fontWeight={"400"}>
        US$ {value}
      </Text>
    </Box>
  );
};
