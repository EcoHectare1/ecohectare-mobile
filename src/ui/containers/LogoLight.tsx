import { Image } from "react-native";

export function LogoLight() {
  return (
    <Image
      source={require("../../../assets/images/logo-white.png")}
      style={{
        width: 320,
        height: 75,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 60,
      }}
    />
  );
}
