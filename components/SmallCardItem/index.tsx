import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
// Interfaces
import { Card, RootStackParamList } from '../../interfaces';
// Theme
import { themeCommon } from '../../styles/theme';
// Components
import BasicButton from '../BasicButton';

interface SmallCardItemProps {
  card: Card;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditCard'>;

const SmallCardItem: React.FC<SmallCardItemProps> = ({ card }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View key={card.number} style={styles.card}>
      <Image source={{ uri: card.image }} style={styles.image} />
      <View style={styles.cardData}>
        <View style={styles.cardRow}>
          <Text style={styles.nameText}>{card.name}</Text>
          <Text style={styles.nameText}>{card.firstEdition && '1st'}</Text>
        </View>
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
          text='Edit'
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
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    marginVertical: 4,
    marginRight: 4,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 2,
    marginBottom: 8,
  },
  cardData: {
    paddingHorizontal: 8,
    width: '100%',
  },
  nameText: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    marginBottom: 4,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'left',
  },
  cardRow: {
    flex: 2,
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 4,
  },
});
