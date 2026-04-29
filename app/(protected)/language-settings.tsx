import { Box, Icon, Screen, Text, TouchableOpacityBox } from "@components";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AppLanguage,
  LANGUAGE_LABELS,
  useLanguageStore,
} from "src/store/useLanguageStore";

const LANGUAGES: AppLanguage[] = ["pt", "en"];

const LanguageSettings = () => {
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();

  return (
    <Screen>
      <SafeAreaView>
        <TouchableOpacityBox
          onPress={() => router.back()}
          flexDirection="row"
          gap="s10"
          paddingBottom="s14"
        >
          <Icon name={"chevron-left"} size={20} />
          <Text color="black" fontSize={20}>
            {t("language_settings.title")}
          </Text>
        </TouchableOpacityBox>

        <Text color="gray2" fontSize={15} padding="s10">
          {t("language_settings.subtitle")}
        </Text>

        <Box
          mt="s16"
          backgroundColor="pureWhite"
          borderRadius="default"
          overflow="hidden"
        >
          {LANGUAGES.map((lang, index) => (
            <TouchableOpacityBox
              key={lang}
              onPress={() => setLanguage(lang)}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              padding="s16"
              borderBottomWidth={index < LANGUAGES.length - 1 ? 1 : 0}
              borderBottomColor="gray3"
            >
              <Text color="black" fontSize={16}>
                {LANGUAGE_LABELS[lang]}
              </Text>
              {language === lang && (
                <Icon name="check" size={18} color="primary" />
              )}
            </TouchableOpacityBox>
          ))}
        </Box>
      </SafeAreaView>
    </Screen>
  );
};

export default LanguageSettings;
