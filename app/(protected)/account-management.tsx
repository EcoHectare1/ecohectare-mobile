import {
  Box,
  Button,
  FormInput,
  Icon,
  Screen,
  Text,
  TouchableOpacityBox,
} from "@components";
import BottomSheet from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppTheme } from "@theme";
import { router } from "expo-router";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "src/domain/auth/AuthContext";
import { useGetUserById } from "src/domain/users/operations/useGetUserById";
import { RegisterFormData, registerSchema } from "src/schemas/registerSchema";
import { ConfirmBottomSheet } from "src/ui/components/ConfirmBottomSheet";

const AccountManagement = () => {
  const { t } = useTranslation();
  const { removeAuthUser, authData } = useAuth();
  const { colors } = useAppTheme();

  const confirmBottomSheetRef = useRef<BottomSheet>(null);

  const { user } = useGetUserById(authData?.user.id!);

  function handleLogout() {
    removeAuthUser();
    confirmBottomSheetRef.current?.close();
  }

  function onConfirmLogout() {
    handleLogout();
  }

  function onCloseConfirmBottomSheet() {
    confirmBottomSheetRef.current?.close();
  }

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (user && user[0]) {
      reset({
        name: user[0].name,
        email: user[0].email,
      });
    }
  }, [user, reset]);

  const handleOpenBottomSheet = () => confirmBottomSheetRef.current?.expand();
  const handleCloseBottomSheet = () => confirmBottomSheetRef.current?.close();

  return (
    <>
      <Screen scrollable>
        <SafeAreaView>
          <TouchableOpacityBox
            onPress={() => router.back()}
            flexDirection="row"
            gap="s10"
            paddingBottom="s14"
          >
            <Icon name={"chevron-left"} size={20} />
            <Text color="black" fontSize={20}>
            {t("account_management.title")}
            </Text>
          </TouchableOpacityBox>

          <Text color="gray2" fontSize={15} padding="s10">
          {t("account_management.subtitle")}
          </Text>

          <Box
            mt="s16"
            backgroundColor="pureWhite"
            padding="s16"
            borderRadius="default"
            gap="s12"
          >
            <Text color="black">{t("account_management.personal_info")}</Text>
            <Text color="gray2" fontSize={14}>
              {t("account_management.personal_info_subtitle")}
            </Text>

            <FormInput
              label={t("common.name")}
              borderColor="#b3b3b3"
              control={control}
              name="name"
              placeholder={t("common.name")}
              backgroundColor="transparent"
              placeholderColor={colors.gray1}
              textColor={colors.gray1}
            />

            <FormInput
              label={t("common.email")}
              borderColor="#b3b3b3"
              control={control}
              name="email"
              placeholder={t("common.email")}
              backgroundColor="transparent"
              placeholderColor={colors.gray1}
              textColor={colors.gray1}
            />
          </Box>

          <Box
            mt="s16"
            backgroundColor="pureWhite"
            padding="s16"
            borderRadius="default"
            gap="s12"
          >
            <Text color="black">{t("account_management.change_password")}</Text>
            <Text color="gray2" fontSize={14}>
              {t("account_management.change_password_subtitle")}
            </Text>

            <FormInput
              label={t("account_management.new_password")}
              borderColor="#b3b3b3"
              control={control}
              name="password"
              backgroundColor="transparent"
              placeholderColor={colors.gray1}
              textColor={colors.gray1}
            />

            <FormInput
              label={t("account_management.confirm_new_password")}
              borderColor="#b3b3b3"
              control={control}
              name="confirmPassword"
              backgroundColor="transparent"
              placeholderColor={colors.gray1}
              textColor={colors.gray1}
            />
          </Box>
          <Box
            flexDirection="column"
            gap="s10"
            borderWidth={1}
            borderColor="fbErrorSurface"
            mt="s24"
            backgroundColor="pureWhite"
            padding="s16"
            borderRadius="default"
          >
            <Text color="fbErrorSurface">{t("account_management.logout")}</Text>
            <Text color="gray2" fontSize={14}>
              {t("account_management.logout_subtitle")}
            </Text>

            <Button
              textColor="pureWhite"
              title={t("account_management.logout")}
              justifyContent="center"
              backgroundColor="fbErrorSurface"
              onPress={handleOpenBottomSheet}
            />
          </Box>
        </SafeAreaView>
      </Screen>

      <ConfirmBottomSheet
        index={-1}
        bottomInset={1}
        ref={confirmBottomSheetRef}
        enablePanDownToClose
        snapPoints={["30%"]}
        onClose={onCloseConfirmBottomSheet}
      >
        <Box width={"100%"} alignItems="center" gap="s20">
          <Text color="black" fontSize={20}>
            {t("account_management.logout_confirm")}
          </Text>

          <Button
            width={"80%"}
            textColor="black"
            title={t("common.cancel")}
            justifyContent="center"
            borderWidth={1}
            borderColor="darkBackground"
            onPress={handleCloseBottomSheet}
          />
          <Button
            width={"80%"}
            textColor="pureWhite"
            title={t("account_management.logout")}
            justifyContent="center"
            backgroundColor="fbErrorSurface"
            onPress={removeAuthUser}
          />
        </Box>
      </ConfirmBottomSheet>
    </>
  );
};

export default AccountManagement;
