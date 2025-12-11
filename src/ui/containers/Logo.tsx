import { Image } from "react-native";

export function Logo() {
  return (
    <Image
      source={require("../../../assets/images/logo.png")}
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
