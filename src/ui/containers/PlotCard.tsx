import { Icon } from "@components";
import { useAppTheme } from "@theme";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IHectare } from "@domain";

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
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { borderColor: colors.primary }]}>
      <View style={styles.header}>
        <View style={{ flex: 1, padding: 14 }}>
          <Text style={styles.code}>{item.hectare_code}</Text>
          <Text
            style={[styles.title, { color: colors.primary, fontWeight: "600" }]}
          >
            <Icon name={"tree"} size={14} color="secondary" />
            {"   "}
            {item.land_plot_id.name.split(" - ")[1].trim()}
          </Text>

          <Text style={styles.coordinates}>
            <Icon name={"map-marker-alt"} size={14} color="secondary" /> {"  "}
            Lat: {item.coordinates.lat.toFixed(4)}, Lng:{" "}
            {item.coordinates.lng.toFixed(4)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.footer, { backgroundColor: colors.primary }]}
      >
        <Text style={styles.footerText}>
          Locar por R$ {item.value.toFixed(2)}/mês
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },

    overflow: "hidden",
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  code: {
    fontSize: 32,
    fontWeight: "700",
    color: "#15803d", // verde escuro
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  coordinates: {
    fontSize: 16,
    color: "#9ca3af",
    marginTop: 4,
  },
  iconContainer: {
    width: 44,
    height: 44,
    backgroundColor: "#22c55e", // verde claro
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
