import { ThemeColors } from "../theme/theme";
import { Box, TouchableOpacityBox, TouchableOpacityBoxProps } from "./Box";
import { Icon } from "./Icon";
import { Text } from "./Text";

type ButtonVariant = "primary" | "secondary";

const buttonColors: Record<
  ButtonVariant,
  {
    backgroundColor: ThemeColors;
    textColor: ThemeColors;
  }
> = {
  primary: {
    backgroundColor: "primary",
    textColor: "text",
  },
  secondary: {
    backgroundColor: "gray3",
    textColor: "primary",
  },
};

type ButtonProps = TouchableOpacityBoxProps & {
  icon: any;
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
};

export function Button({
  icon,
  title,
  onPress,
  variant = "primary",
  ...toProps
}: ButtonProps) {
  const buttonProps = buttonColors[variant];
  return (
    <TouchableOpacityBox
      {...toProps}
      onPress={onPress}
      backgroundColor={buttonProps.backgroundColor}
      flexDirection="row"
      borderRadius="default"
      padding="s16"
      alignItems="center"
      gap="s16"
    >
      {icon ? (
        <Box backgroundColor="lightGreen" padding="s10" borderRadius="rounded">
          <Icon name={icon ? icon : ""} color="primary" />
        </Box>
      ) : null}
      <Text color={buttonProps.textColor}>{title}</Text>
    </TouchableOpacityBox>
  );
}
