module.exports = {
  name: "ecohectare-mobile",
  slug: "ecohectare-mobile",
  version: "1.0.0",
  scheme: "ecohectaremobile",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.anonymous.ecohectaremobile",
  },
  android: {
    package: "com.anonymous.ecohectaremobile",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_API_KEY,
      },
    },
  },
  web: {
    favicon: "./assets/images/favicon.png",
  },
  plugins: ["expo-router", "expo-web-browser"],
};
