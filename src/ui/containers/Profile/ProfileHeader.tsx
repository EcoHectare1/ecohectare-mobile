import React from "react";
import { AuthUser } from "../../../domain/auth/authTypes";
import { Box } from "../../components/Box";
import { Text } from "../../components/Text";
import { Icon } from "../../components/Icon";

type ProfileHeaderProps = {
  authUser: AuthUser;
};

const ProfileHeader = ({ authUser }: ProfileHeaderProps) => {
  return (
    <>
      <Box gap="s20" mt="s56" flexDirection="row" alignItems="center">
        <Box mb="s16">
          <Box
            width={80}
            height={80}
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
            borderRadius="rounded"
            backgroundColor="gray2"
          >
            <Text variant="title28" color="pureWhite">
              {authUser.name.charAt(0).toUpperCase()}
              {authUser.name.split(" ").length > 1
                ? authUser.name.split(" ").pop()?.charAt(0).toUpperCase()
                : ""}
            </Text>
          </Box>
        </Box>
        <LineItem label="Nome" value={authUser.name} />
      </Box>
    </>
  );
};

export default ProfileHeader;

function LineItem({ label, value }: { label: string; value: string }) {
  return (
    <Box flexDirection="row" alignItems="center" justifyContent="space-between">
      <Text variant="title22" color="gray2" fontWeight={"bold"} lineHeight={28}>
        {value}
      </Text>
    </Box>
  );
}
