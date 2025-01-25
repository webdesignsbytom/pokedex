import { StateCreator, create } from "zustand";
import { Appearance } from "react-native";
import { persist, PersistOptions } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type AppTheme = "light" | "dark";

interface AppConfigEphemeralState {
  isClosedUpdateModal: boolean;
  setIsClosedUpdateModal: (value: boolean) => void;
}

interface AppConfigPersistentState {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  isRateAppModalShown: boolean;
  setRateAppModalShown: (state: boolean) => void;
}

type AppConfigPersist = (
  config: StateCreator<AppConfigPersistentState>,
  options: PersistOptions<AppConfigPersistentState>
) => StateCreator<AppConfigPersistentState>;

export const useAppConfigStore = {
  persistent: create<AppConfigPersistentState>(
    (persist as unknown as AppConfigPersist)(
      (set) => ({
        theme: Appearance.getColorScheme() === "dark" ? "dark" : "light",
        setTheme: (theme) => set({ theme }),
        isRateAppModalShown: false,
        setRateAppModalShown: (state) => set({ isRateAppModalShown: state }),
      }),
      {
        name: "app-config-storage",
        // getStorage: () => AsyncStorage,
      }
    )
  ),
  ephemeral: create<AppConfigEphemeralState>((set) => ({
    isClosedUpdateModal: false,
    setIsClosedUpdateModal: (value) => set({ isClosedUpdateModal: value }),
  })),
};