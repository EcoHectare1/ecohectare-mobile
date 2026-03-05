import {
  Box,
  Button,
  Icon,
  Screen,
  Text,
  TouchableOpacityBox,
} from "@components";
import { IHectare } from "@domain";
import { useAppTheme } from "@theme";
import { router } from "expo-router";
import React from "react";
import { FlatList, ListRenderItemInfo, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useCartStore } from "src/store/useCartStore";
import { CartItem } from "src/ui/containers/CartItem";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAppSafeArea } from "src/hooks/useAppSafeArea";

const Cart = () => {
  const { spacing } = useAppTheme();
  const { bottom } = useAppSafeArea();
  const { items, totalPrice } = useCartStore();
  const { t } = useTranslation();

  function renderItem({ item }: ListRenderItemInfo<IHectare>) {
    return <CartItem {...item} />;
  }

  return (
    <>
      <Screen>
        <TouchableOpacityBox
          onPress={() => router.back()}
          flexDirection="row"
          gap="s10"
          paddingBottom="s14"
        >
          <Icon name={"chevron-left"} size={20} />
          <Text color="black" fontSize={20}>
            {t("cart.title")}
          </Text>
        </TouchableOpacityBox>

        {items.length === 0 ? (
          <Box
            height={500}
            gap="s10"
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: spacing.s32,
            }}
          >
            <MaterialCommunityIcons name="cart-plus" size={60} color="black" />
            <Text color="primary" fontSize={16}>
              {t("cart.empty")}
            </Text>
          </Box>
        ) : (
          <Box>
            <FlatList
              data={items}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                gap: spacing.s16,
                marginTop: spacing.s24,
                paddingBottom: spacing.s24 * 5,
              }}
            />
          </Box>
        )}
      </Screen>
      <Box
        paddingHorizontal="s24"
        paddingVertical="s14"
        height={80 + bottom}
        borderTopWidth={1}
        borderColor="stoneGrey"
        flexDirection="row"
        justifyContent="space-between"
        backgroundColor="pureWhite"
      >
        <Box flexDirection="column" gap="s4">
          <Text color="gray2" fontSize={15}>
            {t("cart.total")}
          </Text>
          <Text color="primary" fontWeight={"700"} fontSize={20}>
            ${totalPrice.toFixed(2)}{" "}
            <Text color="gray2">/ {items.length > 1 ? t("cart.items") : t("cart.item")}</Text>
          </Text>
        </Box>

        <Button
          textColor="pureWhite"
          title={t("cart.continue")}
          backgroundColor="primary"
          width={"40%"}
          height={50}
          justifyContent="center"
        />
      </Box>
    </>
  );
};

export default Cart;
