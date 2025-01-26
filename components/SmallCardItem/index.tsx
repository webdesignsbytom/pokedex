import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

import { Card } from '@/interfaces';  // Import the Card interface

// Add card as a prop to SmallCardItem
interface SmallCardItemProps {
  card: Card;  // Define the type for the card prop
}

const SmallCardItem: React.FC<SmallCardItemProps> = ({ card }) => {
  return (
    <View key={card.number} style={styles.card}>
      <Image source={{ uri: card.image }} style={styles.image} />
      <Text style={styles.text}>{card.name}</Text>
      <Text style={styles.text}>{card.set}</Text>
      <Text style={styles.text}>#{card.number}</Text>
      <Text style={styles.text}>Condition: {card.condition}</Text>  {/* Display the condition */}
    </View>
  );
};

export default SmallCardItem;

const styles = StyleSheet.create({
  card: {
    width: '33%',
    height: 'auto',
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
    borderRadius: 2,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
