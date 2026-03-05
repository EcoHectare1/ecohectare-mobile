import { PolygonPoint } from "@domain";
import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { forwardRef } from "react";
import { StyleSheet } from "react-native";
import { Box } from "./Box";

type BottomSheetMapProps = BottomSheetProps;

export const ConfirmBottomSheet = forwardRef<BottomSheet, BottomSheetMapProps>(
  ({ children, ...props }, ref) => {
    return (
      <BottomSheet
        ref={ref}
        index={0}
        {...props}
        enableContentPanningGesture={false}
      >
        <BottomSheetView>
          <Box flexDirection="column" padding="s16">
            {children}
          </Box>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);
