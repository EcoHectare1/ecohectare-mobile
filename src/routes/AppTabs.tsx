import React from "react";
import SignInScreen from "../screens/Auth/SignIn/SignInScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/App/HomeScreen";
import { Image } from "react-native";
import { View, Text } from "react-native";
import PlotsOfLandScreen from "../screens/App/PlotsOfLand/PlotsOfLandScreen";
import { useAuth } from "../context/AuthContext";

const HeaderBG = require("../../assets/header-bg.png");

export type RootTabParamList = {
  HomeScreen: undefined;
  PlotOfLandScreen: undefined;
  ProfileScreen: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppTabs = () => {
  const { authData } = useAuth();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: "#18710D",

          borderTopWidth: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          overflow: "hidden",
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarActiveTintColor: "#55F041",
        tabBarInactiveTintColor: "#fff",
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "transparent",
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            height: 120,
          },

          headerBackground: () => (
            <View
              style={{
                backgroundColor: "#18710D",
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
                padding: 24,
              }}
            >
              <Image
                source={HeaderBG}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                resizeMode="cover"
              />
              <Text style={{ color: "#fff" }}>Olá, {authData?.name}</Text>
            </View>
          ),
          headerTitleStyle: {
            color: "#fff",
            fontSize: 18,
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          tabBarLabel: " Home",
        }}
      />
      <Tab.Screen
        name="PlotOfLandScreen"
        component={PlotsOfLandScreen}
        options={{
          tabBarLabel: "Lotes",
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "transparent",
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            height: 120,
          },

          headerBackground: () => (
            <View
              style={{
                backgroundColor: "#18710D",
                flex: 1,
                display: "flex",
                justifyContent: "center",
                padding: 24,
                paddingTop: 45,
              }}
            >
              <Image
                source={HeaderBG}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                resizeMode="cover"
              />
              <Text style={{ color: "#fff", fontSize: 20 }}>
                Lotes para apadrinhamento
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={SignInScreen}
        options={{ tabBarLabel: "Perfil" }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
