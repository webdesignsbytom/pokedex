import { StateCreator, create } from "zustand";
import { Appearance } from "react-native";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Interfaces
import { Card, Collection } from '../interfaces';
import { cardSeriesData } from '@/data/cardData';

interface UserCardsState {
  userCards: Card[];
  setUserCards: (cards: Card[]) => void;
}

type CardsPersist = (
  config: StateCreator<UserCardsState>,
  options: PersistOptions<UserCardsState>
) => StateCreator<UserCardsState>;

export const useCardsPersistentStore = create<UserCardsState>(
  (persist as unknown as CardsPersist)(
    (set) => ({
      userCards: [],
      setUserCards: (userCards) => set({ userCards }),
    }),
    {
      name: "user-cards-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

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
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  ),
  ephemeral: create<AppConfigEphemeralState>((set) => ({
    isClosedUpdateModal: false,
    setIsClosedUpdateModal: (value) => set({ isClosedUpdateModal: value }),
  })),
};

interface CollectionStore {
  collections: Collection[];
  addCollection: (name: string) => void; // Only adds the name and generates an id
  addCardToCollection: (card: Card, collectionId: string) => void; // Adds card to a collection
}

export const useCollectionStore = create<CollectionStore>((set) => ({
  collections: [],

  // Add collection with just a name and generate an ID
  addCollection: (name) =>
    set((state) => ({
      collections: [...state.collections, { id: Date.now().toString(), name, cards: [] }],
    })),

  // Add card to the specific collection
  addCardToCollection: (card, collectionId) =>
    set((state) => ({
      collections: state.collections.map((collection) =>
        collection.id === collectionId
          ? { ...collection, cards: [...collection.cards, card] }
          : collection
      ),
    })),
}));

// addCardToCollection(card, collectionId); // Add a card to an existing collection
interface Set {
  id: string;
  name: string; 
}

let idx = 1;

const getSeriesNames = () => {
  return cardSeriesData.flatMap((series) => 
    series.expansions.map((expansion) => expansion.name)
  );
};

const seriesNames = getSeriesNames();

const defaultSets = seriesNames.map((name) => ({
  id: (idx++).toString(),
  name,
  cards: [],
}));

interface SetStore {
  sets: { id: string; name: string; cards: any[] }[]; // Array of sets with id, name, and cards
  addSet: (name: string) => void; // Adds a new set to the list
}

export const useSetStore = create<SetStore>((set) => ({
  sets: defaultSets, // Use the dynamically generated sets here

  // Add a new set to the list with an auto-generated ID and an empty cards array
  addSet: (name) =>
    set((state) => ({
      sets: [
        ...state.sets,
        { id: (idx++).toString(), name, cards: [] }, // Create a new set with the name and an empty cards array
      ],
    })),
}));