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
  icon?: any;
  textColor: string;
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
};

export function Button({
  icon,
  title,
  onPress,
  textColor,
  variant = "primary",
  ...toProps
}: ButtonProps) {
  return (
    <TouchableOpacityBox
      {...toProps}
      onPress={onPress}
      flexDirection="row"
      borderRadius="small"
      padding="s10"
      alignItems="center"
      gap="s16"
    >
      {icon ? (
        <Box
          backgroundColor="lightGreen"
          justifyContent="center"
          alignItems="center"
          height={50}
          width={50}
          borderRadius="rounded"
        >
          <Icon name={icon ? icon : ""} color="primary" />
        </Box>
      ) : null}
      <Text style={{ color: textColor }}>{title}</Text>
    </TouchableOpacityBox>
  );
}
