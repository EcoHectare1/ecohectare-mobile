import React from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { Button } from "@components";
import { router } from "expo-router";
import { useAppTheme } from "@theme";

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
    title: "Meus certificados",
    link: "CertificatesScreen",
  },
  {
    id: "2",
    iconName: "user-cog",
    title: "Gerenciamento de conta",
    link: "/account-management",
  },
  {
    id: "3",
    iconName: "globe",
    title: "Idioma",
    link: "LanguageSettingsScreen",
    value: "Português",
  },
];

const OptionsList = ({}) => {
  const { spacing } = useAppTheme();

  function renderItem(item: ListRenderItemInfo<MenuItem>) {
    return (
      <OptionItem
        title={item.item.title}
        link={item.item.link}
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

function OptionItem({
  title,
  icon,
  link,
}: {
  title: string;
  icon: string;
  link: string;
}) {
  return (
    <Button
      textColor="primary"
      icon={icon}
      title={title}
      onPress={() => router.push(link)}
      backgroundColor="pureWhite"
    />
  );
}
