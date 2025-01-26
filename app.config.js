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
    infoPlist: {
      NSCameraUsageDescription: "Allow Pokedex to use your camera to take photos of your cards.",
      NSPhotoLibraryUsageDescription: "Allow Pokedex to access your photo library to select card images.",
      NSPhotoLibraryAddUsageDescription: "Allow Pokedex to save card images to your photo library."
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icons/pokeball-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.bytetoast.pokedex",
    versionCode: 1,
    permissions: [
      "CAMERA",
      "WRITE_EXTERNAL_STORAGE"
    ]
  },
  web: {
    favicon: "./assets/favicon/favicon-96x96.png",
  },
  extra: {
    apiUrl: process.env.REACT_APP_API_URL,
    userToken: process.env.REACT_APP_USER_TOKEN,
    eas: {
      projectId: "6ce4dc4e-7c5c-460a-bf52-6109148ee306",
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
