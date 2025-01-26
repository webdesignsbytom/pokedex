import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Components
import SmallCardItem from '../SmallCardItem';
// Interfaces
import { Card } from '@/interfaces';

const CardGridContainer = () => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        // Retrieve stored cards from AsyncStorage
        const storedCards = await AsyncStorage.getItem('userCards');
        if (storedCards) {
          // Parse the stored cards and set the state
          setCards(JSON.parse(storedCards));
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.number ? item.number.toString() : Math.random().toString()} 
        renderItem={({ item }) => <SmallCardItem card={item} />}
        numColumns={2} // Adjust for the grid layout
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

export default CardGridContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    backgroundColor: '#f9f9f9',
  },
  grid: {
    gap: 18,
    justifyContent: 'center',
  },
});
