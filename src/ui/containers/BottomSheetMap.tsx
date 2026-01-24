import { IHectare } from "@domain";
import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { forwardRef, useEffect, useMemo, useRef } from "react"; // Added useMemo
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useCartStore } from "src/store/useCartStore";
import MapView, { Polygon, PROVIDER_GOOGLE } from "react-native-maps";
import { useAppTheme } from "@theme";

// Get screen height to ensure the map fills the sheet properly
const SCREEN_HEIGHT = Dimensions.get("window").height;

type BottomSheetMapProps = Omit<BottomSheetProps, "children">;

const getPolygonCenter = (
  coordinates: { latitude: number; longitude: number }[],
) => {
  const pointsCount = coordinates.length;
  const latSum = coordinates.reduce((sum, coord) => sum + coord.latitude, 0);
  const lngSum = coordinates.reduce((sum, coord) => sum + coord.longitude, 0);

  return {
    latitude: latSum / pointsCount,
    longitude: lngSum / pointsCount,
    latitudeDelta: 0.3, // Adjust for zoom level (0.005 is quite close)
    longitudeDelta: 0.3,
  };
};

export const BottomSheetMap = forwardRef<BottomSheet, BottomSheetMapProps>(
  (props, ref) => {
    const { spacing, colors } = useAppTheme();

    // Inside your BottomSheetMap component
    const mapRef = useRef<MapView>(null);

    // Example Polygon data (The coordinates you said weren't showing)
    const farmCoordinates = [
      { longitude: -57.17175, latitude: -2.08825 },
      { longitude: -57.202377, latitude: -2.120208 },
      { longitude: -57.215164, latitude: -2.108426 },
      { longitude: -57.258621, latitude: -2.143766 },
      { longitude: -57.284572, latitude: -2.115464 },
      { longitude: -57.205248, latitude: -2.039757 },
      { longitude: -57.178604, latitude: -2.060714 },
      { longitude: -57.182259, latitude: -2.063346 },
      { longitude: -57.193018, latitude: -2.071521 },
    ];

    const centerRegion = useMemo(
      () => getPolygonCenter(farmCoordinates),
      [farmCoordinates],
    );

    useEffect(() => {
      // When the component mounts or coordinates change, move the camera
      if (mapRef.current) {
        mapRef.current.animateToRegion(centerRegion, 1000);
      }
    }, [centerRegion]);

    const handleClose = () => {
      // Logic to trigger the close via the forwarded ref
      if (ref && "current" in ref) {
        ref.current?.close();
      }
    };

    return (
      <BottomSheet
        ref={ref}
        snapPoints={["94%"]}
        {...props}
        enableContentPanningGesture={false}
      >
        <BottomSheetView>
          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              mapType="satellite"
              provider={PROVIDER_GOOGLE}
              style={{ width: "100%", height: 900 }}
              initialRegion={centerRegion}
            >
              <Polygon
                coordinates={farmCoordinates}
                fillColor="rgba(144, 238, 144, 0.5)" // Light Green
                strokeColor="#228B22" // Forest Green
                strokeWidth={3}
                tappable={true}
                onPress={() => console.log("Polygon pressed!")}
              />
            </MapView>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 99,
  },
});
