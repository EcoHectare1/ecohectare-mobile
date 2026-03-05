import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "../../../src/ui/theme/useAppTheme";
import { Icon } from "../../../src/ui/components/Icon";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSafeArea } from "src/hooks/useAppSafeArea";

export default function TabLayout() {
  const { colors } = useAppTheme();
  const { bottom } = useAppSafeArea();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.pureWhite,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "rgb(26, 92, 30) ",
          paddingTop: 10,
          height: 80 + bottom,
          borderTopWidth: 0,
          elevation: 10,
          zIndex: 10,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingBottom: bottom,
        },
        tabBarLabelStyle: {
          fontFamily: "PoppinsRegular",
          fontSize: 12,
          color: colors.pureWhite,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={["rgb(50, 145, 42)", "rgb(24, 88, 21)"]}
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
          title: t("tabs.home"),
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
          title: t("tabs.plots"),
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
          title: t("tabs.profile"),
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
