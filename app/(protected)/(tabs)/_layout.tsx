import { Tabs } from "expo-router";
import React from "react";
import { useAppTheme } from "../../../src/ui/theme/useAppTheme";
import { Icon } from "../../../src/ui/components/Icon";

export default function TabLayout() {
  const { colors } = useAppTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.pureWhite,
        tabBarStyle: {
          backgroundColor: colors.primary,
          paddingTop: 10,
          height: 90,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontFamily: "PoppinsRegular",
          fontSize: 12,
          color: colors.pureWhite,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ focused }) => {
            return (
              <Icon name={"home"} color={focused ? "secondary" : "pureWhite"} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="plots"
        options={{
          title: "Lotes",
          tabBarIcon: ({ focused }) => {
            return (
              <Icon name={"tree"} color={focused ? "secondary" : "pureWhite"} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => {
            return (
              <Icon name={"user"} color={focused ? "secondary" : "pureWhite"} />
            );
          },
        }}
      />
    </Tabs>
  );
}
