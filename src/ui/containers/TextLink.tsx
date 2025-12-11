import { LinkProps, router } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "../components/Text";

export type TextLinkProps = {
  colorText:
    | "primary"
    | "secondary"
    | "text"
    | "gray1"
    | "gray2"
    | "mainGreen"
    | "secondaryGreen"
    | "charcoalGrey"
    | "stoneGrey"
    | "pureWhite"
    | "transparent";
  text: string;
  ctaText: string;
  href?: LinkProps["href"];
  goBackOnPress?: boolean;
};
export function TextLink({
  colorText,
  text,
  ctaText,
  href,
  goBackOnPress,
}: TextLinkProps) {
  function handleOnPress() {
    if (href) {
      router.navigate(href);
    } else if (goBackOnPress) {
      router.back();
    }
  }

  return (
    <Pressable onPress={handleOnPress}>
      <Text alignSelf="center" mt="s16" color={colorText}>
        {text}{" "}
        <Text variant="title14" color="secondary">
          {ctaText}
        </Text>
      </Text>
    </Pressable>
  );
}
