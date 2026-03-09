import { Box, Text } from "@components";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "src/domain/auth/AuthContext";

export const Header = () => {
  const { authData } = useAuth();

  const { t } = useTranslation();

  return (
    <Box paddingTop="s24" flexDirection="column" gap="s4">
      <Text color="primary" fontSize={22} fontWeight={"800"}>
        {t("home.greeting", { name: authData?.user.name?.split(" ")[0] })}
      </Text>
      <Text color="primary" fontSize={14} fontWeight={"900"}>
        <Text color="fbSuccessSurface">2 Lotes</Text> {t("home.preserved")}
      </Text>
    </Box>
  );
};
