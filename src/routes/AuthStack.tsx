import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MenuAuthScreen from "../screens/Auth/MenuAuth/MenuAuthScreen";
import SignUpScreen from "../screens/Auth/SignUp/SignUpScreen";
import SignInScreen from "../screens/Auth/SignIn/SignInScreen";

export type RootStackParamList = {
  MenuAuthScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MenuAuthScreen" component={MenuAuthScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
