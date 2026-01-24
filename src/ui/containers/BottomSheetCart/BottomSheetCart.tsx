import { IHectare } from "@domain";
import { Text } from "../../components/Text";

import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { useCartStore } from "src/store/useCartStore";
import { CartItem } from "./CartItem";
import { useAppTheme } from "@theme";
import { Box } from "@components";

type BottomSheetCartProps = Omit<BottomSheetProps, "children">;

export const BottomSheetCart = forwardRef<BottomSheet, BottomSheetCartProps>(
  (props, ref) => {
    const { items, totalPrice } = useCartStore();
    const { spacing } = useAppTheme();

    function renderItem({ item }: ListRenderItemInfo<IHectare>) {
      return <CartItem {...item} />;
    }

    return (
      <BottomSheet ref={ref} {...props}>
        <BottomSheetView style={{ padding: 16 }}>
          {items.length === 0 ? (
            <Box style={{ alignItems: "center", paddingVertical: spacing.s32 }}>
              <Text color="primary" fontSize={16}>
                Seu carrinho está vazio
              </Text>
            </Box>
          ) : (
            <>
              <FlatList
                data={items}
                renderItem={renderItem}
                contentContainerStyle={{ gap: spacing.s16 }}
              />

              <Box
                style={{
                  marginTop: spacing.s24,
                  paddingTop: spacing.s16,
                  borderTopWidth: 1,
                  borderTopColor: "#E5E5E5",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text color="black" fontSize={20}>
                  Total:
                </Text>
                <Text color="primary" fontWeight={"700"} fontSize={20}>
                  ${totalPrice.toFixed(2)}
                </Text>
              </Box>
            </>
          )}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);
