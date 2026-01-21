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
          <FlatList
            data={items}
            renderItem={renderItem}
            contentContainerStyle={{ gap: spacing.s16 }}
          />

          <Text color="black">{totalPrice}</Text>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);
