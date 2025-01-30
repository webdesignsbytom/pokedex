import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Interfaces
import { Card } from '@/interfaces';

interface CardStore {
  cards: Card[];
  loadCards: () => Promise<void>;
  addCard: (card: Card) => Promise<void>;
  removeCard: (cardId: string) => Promise<void>;
}

export const useCardStore = create<CardStore>((set) => ({
  cards: [],
  
  loadCards: async () => {
    try {
      const storedCards = await AsyncStorage.getItem('userCards');
      if (storedCards) {
        const parsedCards = JSON.parse(storedCards);
        set({ cards: Array.isArray(parsedCards) ? parsedCards : [] });
      }
    } catch (error) {
      console.error('Error loading cards:', error);
    }
  },

  addCard: async (card) => {
    try {
      set((state) => {
        const updatedCards = [...state.cards, card];
        AsyncStorage.setItem('userCards', JSON.stringify(updatedCards));
        return { cards: updatedCards };
      });
    } catch (error) {
      console.error('Error adding card:', error);
    }
  },

  removeCard: async (cardId) => {
    try {
      set((state) => {
        const updatedCards = state.cards.filter((card) => card.id !== cardId);
        AsyncStorage.setItem('userCards', JSON.stringify(updatedCards));
        return { cards: updatedCards };
      });
    } catch (error) {
      console.error('Error removing card:', error);
    }
  },
}));
