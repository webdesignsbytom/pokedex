import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

interface Card {
  name: string;
  image: string; // Image URI
  number: number;
}

const CardGridContainer = () => {
  // Example cards array, replace with your actual data (e.g., from state or storage)
  const cards: Card[] = [
    {
      name: 'Pikachu',
      image: 'https://example.com/pikachu.jpg', // Replace with actual URI
      number: 25,
    },
    {
      name: 'Charmander',
      image: 'https://example.com/charmander.jpg', // Replace with actual URI
      number: 4,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {cards.map((card) => (
          <View key={card.number} style={styles.card}>
            <Image source={{ uri: card.image }} style={styles.image} />
            <Text style={styles.text}>{card.name}</Text>
            <Text style={styles.text}>#{card.number}</Text>
          </View>
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
  card: {
    width: 120,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
