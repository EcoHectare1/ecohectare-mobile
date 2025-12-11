import React from "react";
import { Box } from "../../components/Box";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Button } from "../../components/Button";
import { router } from "expo-router";
import { useAppTheme } from "../../theme/useAppTheme";

type MenuItem = {
  id: string;
  iconName: string;
  title: string;
  link: string;
  value?: string;
};

const settingsMenuItems: MenuItem[] = [
  {
    id: "1",
    iconName: "award",
    title: "My Certificates",
    link: "CertificatesScreen",
  },
  {
    id: "2",
    iconName: "user-cog",
    title: "Account Management",
    link: "AccountManagementScreen",
  },
  {
    id: "3",
    iconName: "globe",
    title: "Language",
    link: "LanguageSettingsScreen",
    value: "Português",
  },
  {
    id: "4",
    iconName: "align-justify",
    title: "App Settings",
    link: "AppSettingsScreen",
  },
];

const OptionsList = ({}) => {
  const { spacing } = useAppTheme();

  function renderItem(item: ListRenderItemInfo<MenuItem>) {
    return (
      <OptionItem
        title={item.item.title}
        icon={item.item.iconName}
        key={item.index}
      />
    );
  }

  return (
    <FlatList
      data={settingsMenuItems}
      renderItem={renderItem}
      contentContainerStyle={{
        gap: spacing.s24,
        paddingTop: 24,
        paddingBottom: spacing.padding,
      }}
    />
  );
};

export default OptionsList;

function OptionItem({ title, icon }: { title: string; icon: string }) {
  return (
    <Button
      icon={icon}
      title={title}
      onPress={() => router.back()}
      variant="secondary"
    />
  );
}
