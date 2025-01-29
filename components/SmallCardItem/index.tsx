import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
// Interfaces
import { Card, RootStackParamList } from '../../interfaces'; // Import the Card interface
// Components
import BasicButton from '../BasicButton';
import { themeCommon } from '../../styles/theme';

interface SmallCardItemProps {
  card: Card;
}
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditCard'>;

const SmallCardItem: React.FC<SmallCardItemProps> = ({ card }) => {
  const navigation = useNavigation<NavigationProp>(); // Correctly type the navigation prop

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
        <BasicButton
          command={() =>
            navigation.navigate('EditCard', {
              card: card,
            })
          }
          text='Edit Card'
          color={themeCommon.primary}
        />
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
    marginHorizontal: 2
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
