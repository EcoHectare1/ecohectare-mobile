import { Tabs } from "expo-router";
import React from "react";
import { useAppTheme } from "../../../src/ui/theme/useAppTheme";
import { Icon } from "../../../src/ui/components/Icon";
import { LinearGradient } from "expo-linear-gradient";

export default function TabLayout() {
  const { colors } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.pureWhite,
        tabBarStyle: {
          backgroundColor: "rgb(26, 92, 30) ",
          paddingTop: 10,
          height: 90,
          borderTopWidth: 0,
          elevation: 0,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
        tabBarLabelStyle: {
          fontFamily: "PoppinsRegular",
          fontSize: 12,
          color: colors.pureWhite,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={[
              "rgb(158, 253, 150)",
              "rgb(50, 145, 42)",
              "rgb(24, 88, 21)",
              "rgb(11, 49, 18) ",
              "rgb(26, 92, 30) ",
            ]}
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              flex: 1,
            }}
          />
        ),
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
