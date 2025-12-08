import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useAppTheme } from "../theme/useAppTheme";
import { ThemeColors } from "../theme/theme";

export type IconProps = {
  name: IconName;
  color?: ThemeColors;
  size?: number;
};
export function Icon({ name, color = "gray2", size = 24 }: IconProps) {
  const { colors } = useAppTheme();
  return <FontAwesome5 name={name} size={size} color={colors[color]} />;
}

export type IconName = keyof typeof FontAwesome5.glyphMap;
