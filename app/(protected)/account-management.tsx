import {
  Box,
  Button,
  FormInput,
  Icon,
  Screen,
  Text,
  TouchableOpacityBox,
} from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppTheme } from "@theme";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "src/domain/auth/AuthContext";
import { useGetUserById } from "src/domain/users/operations/useGetUserById";
import { LoginFormData, loginSchema } from "src/schemas/loginSchema";

const AccountManagement = () => {
  const { removeAuthUser, authData } = useAuth();
  const { colors } = useAppTheme();

  const { user } = useGetUserById(authData?.user.id!);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (user && user[0]) {
      reset({
        name: user[0].name,
        email: user[0].email,
      });
    }
  }, [user, reset]);

  return (
    <>
      <Screen>
        <TouchableOpacityBox
          onPress={() => router.back()}
          flexDirection="row"
          gap="s10"
          paddingBottom="s14"
        >
          <Icon name={"chevron-left"} size={20} />
          <Text color="black" fontSize={20}>
            Gerenciamento de conta
          </Text>
        </TouchableOpacityBox>

        <Text color="gray2" fontSize={15} padding="s10">
          Gerencie suas informações pessoais e de segurança.
        </Text>

        <Box
          mt="s16"
          backgroundColor="pureWhite"
          padding="s16"
          borderRadius="default"
          gap="s12"
        >
          <Text color="black">Informações pessoais</Text>
          <Text color="gray2" fontSize={14}>
            Suas informações básicas de perfil
          </Text>

          <FormInput
            label="Nome"
            borderColor="#b3b3b3"
            control={control}
            name="name"
            placeholder="Nome"
            backgroundColor="transparent"
            placeholderColor={colors.gray1}
            textColor={colors.gray1}
          />

          <FormInput
            label="E-mail"
            borderColor="#b3b3b3"
            control={control}
            name="email"
            placeholder="E-mail"
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
          <Text color="fbErrorSurface">Sair</Text>
          <Text color="gray2" fontSize={14}>
            Ao sair, você precisará fazer login novamente
          </Text>

          <Button
            textColor="pureWhite"
            title="Sair"
            justifyContent="center"
            backgroundColor="fbErrorSurface"
            onPress={removeAuthUser}
          />
        </Box>
      </Screen>
    </>
  );
};

export default AccountManagement;
