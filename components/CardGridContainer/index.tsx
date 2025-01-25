import { Card, CardCondition } from '@/interfaces';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SmallCardItem from '../SmallCardItem';

const CardGridContainer = () => {
  // Example cards array, replace with your actual data (e.g., from state or storage)
  const cards: Card[] = [
    {
      name: 'Pikachu',
      image: 'https://example.com/pikachu.jpg', // Replace with actual URI
      number: 25,
      set: '',
      condition: CardCondition.Mint,
    },
    {
      name: 'Charmander',
      image: 'https://example.com/charmander.jpg', // Replace with actual URI
      number: 4,
      set: '',
      condition: CardCondition.Mint
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {cards.map((card) => (
          <SmallCardItem key={card.number} card={card} />
        ))}
      </View>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    justifyContent: 'center',
  },
});
