import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Components
import SmallCardItem from '../SmallCardItem';
// Interfaces
import { Card } from '@/interfaces';

const CardGridContainer = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        // Retrieve stored cards from AsyncStorage
        const storedCards = await AsyncStorage.getItem('userCards');
        if (storedCards) {
          const parsedCards = JSON.parse(storedCards);

          // Validate that parsedCards is an array
          if (!Array.isArray(parsedCards)) {
            throw new Error('Invalid data format: expected an array.');
          }

          // Ensure all items are valid cards
          const validCards = parsedCards.filter((card: any) => {
            return (
              card &&
              typeof card.name === 'string' &&
              typeof card.image === 'string' &&
              (typeof card.number === 'string' || card.number === null) &&
              (typeof card.set === 'string' || card.set === null) &&
              typeof card.condition === 'string'
            );
          });

          setCards(validCards);
        } else {
          setError('No cards found.');
        }
      } catch (err) {
        console.error('Error fetching cards:', err);
        setError('Failed to load cards.');
      }
    };

    fetchCards();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {cards.length > 0 ? (
        <FlatList
          data={cards}
          keyExtractor={(item, index) =>
            item.number ? item.number.toString() : `fallback-${index}`
          }
          renderItem={({ item }) => <SmallCardItem card={item} />}
          numColumns={3}
          contentContainerStyle={styles.grid}
        />
      ) : (
        !error && <Text style={styles.noCardsText}>No cards to display.</Text>
      )}
    </ScrollView>
  );
};

export default CardGridContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  grid: {
    gap: 18,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  noCardsText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#555',
  },
});
