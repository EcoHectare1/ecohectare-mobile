import React, { useEffect, useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import ProfileHeader from "../../../src/ui/containers/Profile/ProfileHeader";
import { useAuth } from "../../../src/domain/auth/AuthContext";
import { Button } from "../../../src/ui/components/Button";
import { router } from "expo-router";
import OptionsList from "../../../src/ui/containers/Profile/OptionsList";
import { Box } from "../../../src/ui/components/Box";
import { Screen } from "../../../src/ui/components/Screen";

const Bg = require("../../../assets/backgrounds/signin-bg.png");

const ProfileScreen = () => {
  const { authData } = useAuth();

  return (
    <>
      <Image
        source={Bg}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        resizeMode="cover"
      />

      <Screen>
        <Box>
          {authData?.user && <ProfileHeader authUser={authData.user} />}

          <OptionsList />
        </Box>
      </Screen>
    </>
  );
};

export default ProfileScreen;
