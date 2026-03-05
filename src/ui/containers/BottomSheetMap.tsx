import { PolygonPoint } from "@domain";
import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { forwardRef, useEffect, useMemo, useRef } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Polygon, PROVIDER_GOOGLE } from "react-native-maps";

type BottomSheetMapProps = Omit<BottomSheetProps, "children"> & {
  latitude: number;
  longitude: number;
};

const getPolygonCenter = (coordinates: PolygonPoint[]) => {
  const pointsCount = coordinates.length;
  const latSum = coordinates.reduce((sum, coord) => sum + coord.latitude, 0);
  const lngSum = coordinates.reduce((sum, coord) => sum + coord.longitude, 0);

  return {
    latitude: latSum / pointsCount,
    longitude: lngSum / pointsCount,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
  };
};

const propertyBoundaries = [
  [
    { lng: -57.370777, lat: -2.148011 },
    { lng: -57.411119, lat: -2.104896 },
    { lng: -57.330265, lat: -2.059999 },
    { lng: -57.284572, lat: -2.115464 },
    { lng: -57.258621, lat: -2.143766 },
    { lng: -57.275516, lat: -2.166722 },
    { lng: -57.283508, lat: -2.171679 },
    { lng: -57.273878, lat: -2.186996 },
    { lng: -57.276093, lat: -2.191311 },
    { lng: -57.277906, lat: -2.202051 },
    { lng: -57.281996, lat: -2.202728 },
    { lng: -57.287708, lat: -2.208184 },
    { lng: -57.293561, lat: -2.206292 },
    { lng: -57.293584, lat: -2.204616 },
    { lng: -57.294822, lat: -2.203823 },
    { lng: -57.30147, lat: -2.204991 },
    { lng: -57.302183, lat: -2.206061 },
    { lng: -57.300414, lat: -2.209402 },
    { lng: -57.297918, lat: -2.217039 },
    { lng: -57.306912, lat: -2.217156 },
    { lng: -57.307888, lat: -2.218544 },
    { lng: -57.30846, lat: -2.225127 },
    { lng: -57.317264, lat: -2.223761 },
    { lng: -57.318124, lat: -2.220525 },
    { lng: -57.323665, lat: -2.22218 },
    { lng: -57.325735, lat: -2.222706 },
    { lng: -57.332024, lat: -2.212845 },
    { lng: -57.338839, lat: -2.197343 },
    { lng: -57.34992, lat: -2.180603 },
    { lng: -57.370777, lat: -2.148011 },
  ],
];

export const BottomSheetMap = forwardRef<BottomSheet, BottomSheetMapProps>(
  ({ latitude, longitude, ...props }, ref) => {
    const mapRef = useRef<MapView>(null);

    const hectareSizeInDegrees = 0.0009;

    const hectarePath = [
      {
        latitude: latitude - hectareSizeInDegrees / 2,
        longitude: longitude - hectareSizeInDegrees / 2,
      },
      {
        latitude: latitude + hectareSizeInDegrees / 2,
        longitude: longitude - hectareSizeInDegrees / 2,
      },
      {
        latitude: latitude + hectareSizeInDegrees / 2,
        longitude: longitude + hectareSizeInDegrees / 2,
      },
      {
        latitude: latitude - hectareSizeInDegrees / 2,
        longitude: longitude + hectareSizeInDegrees / 2,
      },
    ];

    const centerRegion = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    useEffect(() => {
      if (mapRef.current) {
        mapRef.current.animateToRegion(centerRegion, 1000);
      }
    }, [centerRegion]);

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
                coordinates={hectarePath}
                fillColor="rgba(144, 238, 144, 0.5)"
                strokeColor="#228B22"
                strokeWidth={3}
                tappable={true}
                onPress={() => console.log("Polygon pressed!")}
              />

              {propertyBoundaries.map((boundary, index) => (
                <Polygon
                  key={index}
                  coordinates={boundary.map((point) => ({
                    latitude: point.lat,
                    longitude: point.lng,
                  }))}
                  fillColor="rgba(255, 255, 255, 0.05)"
                  strokeColor="#FFFFFF"
                  strokeWidth={2}
                  zIndex={1}
                />
              ))}
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
