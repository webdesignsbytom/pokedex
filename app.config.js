import "dotenv/config";

module.exports = {
  name: "Pokedex",
  slug: "pokedex-app",
  version: "1.0.0",
  privacy: "public",
  description: "My trading card pokedex.",
  orientation: "portrait",
  icon: "./assets/icons/pokeball-icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/icons/pokeball-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.bytetoast.pokedex",
    buildNumber: "1.0.0",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icons/pokeball-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.bytetoast.pokedex",
    versionCode: 1,
  },
  web: {
    favicon: "./assets/favicon/favicon-96x96.png",
  },
  extra: {
    apiUrl: process.env.REACT_APP_API_URL,
    userToken: process.env.REACT_APP_USER_TOKEN,
    eas: {
      projectId: "",
    },
  },
  plugins: [
    [
      "expo-notifications",
      {
        icon: "./assets/icons/pokeball-icon.png",
        color: "#FFFFFF",
      },
    ],
    [
      "expo-image-picker",
      {
        "photosPermission": "custom photos permission",
        "cameraPermission": "Allow Pokedex to open the camera",

        "//": "Disables the microphone permission",
        "microphonePermission": false
      }
    ],
    "expo-localization",
  ],
};
