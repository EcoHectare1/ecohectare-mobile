import React from "react";
import AuthStack from "./AuthStack";
import AppTabs from "./AppTabs";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

const Router = () => {
  const { authData } = useAuth();

  return (
    <NavigationContainer>
      {authData ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
