import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
// Interfaces
import { Card } from '../../interfaces'; // Import the Card interface

interface SmallCardItemProps {
  card: Card;
}

const SmallCardItem: React.FC<SmallCardItemProps> = ({ card }) => {
  return (
    <View key={card.number} style={styles.card}>
      <Image source={{ uri: card.image }} style={styles.image} />
      <View style={styles.cardData}>
        <Text style={styles.text}>{card.name}</Text>
        <Text style={styles.text}>Set: {card.set}</Text>
        <Text style={styles.text}>Type: {card.type}</Text>
        <Text style={styles.text}>£{card.value}</Text>
        <Text style={styles.text}>#{card.number}</Text>
        <Text style={styles.text}>Condition: {card.condition}</Text> 
      </View>
    </View>
  );
};

export default SmallCardItem;

const styles = StyleSheet.create({
  card: {
    width: '33%',
    height: 'auto',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 2,
    marginBottom: 8,
  },
  cardData: {
    paddingHorizontal: 12,
  },
  text: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
