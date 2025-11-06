import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export interface PlotsCardProps {
  code: string;
  title: string;
  subtitle: string;
  lat: number;
  lng: number;
  price: number;
  onPress?: () => void;
}

export function PlotsCard({
  code,
  title,
  subtitle,
  lat,
  lng,
  price,
  onPress,
}: PlotsCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.code}>{code}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.coordinates}>
            Lat: {lat.toFixed(4)}, Lng: {lng.toFixed(4)}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <TouchableOpacity style={styles.footer} onPress={onPress}>
        <Text style={styles.footerText}>
          Locar por R$ {price.toFixed(2)}/mês
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 360,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: "hidden",
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  code: {
    fontSize: 18,
    fontWeight: "700",
    color: "#15803d", // verde escuro
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  coordinates: {
    fontSize: 11,
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
    backgroundColor: "#166534", // verde escuro do rodapé
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
