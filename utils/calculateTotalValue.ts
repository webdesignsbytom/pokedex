import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from '../interfaces';

export const calculateTotalValue = async (): Promise<number> => {
    try {
      const storedCards = await AsyncStorage.getItem('userCards');
      if (!storedCards) return 0;
  
      const parsedCards: Card[] = JSON.parse(storedCards);
      if (!Array.isArray(parsedCards)) return 0;
  
      // Ensure values are numbers and sum them up
      const total = parsedCards.reduce((sum, card) => sum + (Number(card.value) || 0), 0);
  
      return total;
    } catch (error) {
      console.error('Error calculating total value:', error);
      return 0;
    }
  };
  
