import { Box, Icon, TouchableOpacityBox, Text } from "@components";
import { IHectare } from "@domain";
import { useCartStore } from "src/store/useCartStore";
import { useMapStore } from "src/store/useMapStore";

export interface PlotsCardProps {
  code: string;
  title: string;
  subtitle: string;
  lat: number;
  lng: number;
  price: number;
  onPress?: () => void;
}

export function PlotsCard({ item }: { item: IHectare }) {
  const { addItem, items } = useCartStore();
  const { selectHectare } = useMapStore();

  const isInCart = items.find((cartItem) => cartItem._id === item._id);

  const handleOpenPressMap = () => {
    selectHectare(item._id);
  };

  return (
    <Box
      backgroundColor="pureWhite"
      borderWidth={2}
      borderRadius="default"
      shadowColor="black"
      shadowOpacity={0.1}
      shadowRadius={4}
      shadowOffset={{ width: 0, height: 2 }}
      overflow="hidden"
      mb="s12"
      borderColor="primary"
    >
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box p="s14" gap="s10">
          <Text fontSize={24} fontWeight={"800"} color="primary">
            {item.hectare_code}
          </Text>
          <Text fontSize={16} fontWeight={"600"} color="primary">
            <Icon name={"tree"} size={14} color="secondary" />
            {"   "}
            {item.land_plot_id.name.split(" - ")[1].trim()}
          </Text>

          <Text fontSize={14} fontWeight={"700"} color={"charcoalGrey"} mt="s4">
            <Icon name={"map-marker-alt"} size={14} color="secondary" /> {"  "}
            Lat: {item.coordinates.lat.toFixed(4)}
          </Text>

          <Text fontSize={14} fontWeight={"700"} color={"charcoalGrey"} mt="s4">
            <Icon name={"map-marker-alt"} size={14} color="secondary" /> {"  "}
            Lng: {item.coordinates.lng.toFixed(4)}
          </Text>
        </Box>

        <TouchableOpacityBox
          onPress={handleOpenPressMap}
          width={90}
          height={90}
          backgroundColor="lightGray"
          m="s14"
          justifyContent="center"
          alignItems="center"
        >
          <Icon name="map" size={40} color="primary" />
        </TouchableOpacityBox>
      </Box>

      <TouchableOpacityBox
        paddingVertical="s8"
        alignItems="center"
        justifyContent="center"
        backgroundColor={isInCart ? "fbInfoSurface" : "primary"}
        onPress={() => addItem(item)}
      >
        <Text color="pureWhite" fontWeight="600" fontSize={14}>
          {isInCart
            ? "No Carrinho"
            : `Locar por R$ ${item.value.toFixed(2)}/mês`}
        </Text>
      </TouchableOpacityBox>
    </Box>
  );
}
