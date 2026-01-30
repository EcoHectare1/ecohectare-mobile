import { Box, Text } from "@components";
import React from "react";
import { useAuth } from "src/domain/auth/AuthContext";

export const Header = () => {
  const { authData } = useAuth();

  return (
    <Box paddingTop="s24" flexDirection="column" gap="s4">
      <Text color="primary" fontSize={22} fontWeight={"800"}>
        Olá, {authData?.user.name}
      </Text>
      <Text color="primary" fontSize={14} fontWeight={"900"}>
        <Text color="fbSuccessSurface">2 Lotes</Text> Preservados
      </Text>
    </Box>
  );
};
