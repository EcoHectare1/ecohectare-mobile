import React from "react";
import { View } from "react-native";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        padding: 16,
      }}
    >
      {children}
    </View>
  );
};

export default Container;
