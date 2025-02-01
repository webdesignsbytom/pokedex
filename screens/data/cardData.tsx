import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSetStore } from '../../store'; // Your Zustand set store
import { CardCondition } from '../../interfaces';
import { useCardStore } from '@/store/useCardStore';
import { capitalizeWords } from '@/utils';

const CardData = () => {
  const { cards, loadCards } = useCardStore();
  const { sets } = useSetStore();

  const [showAllSets, setShowAllSets] = useState(false);

  // Load cards when the component is mounted
  useEffect(() => {
    loadCards();
  }, [loadCards]);

  // Count how many cards belong to each set, ensuring all sets are listed
  const cardCountBySet = sets.reduce((acc, set) => {
    const count = cards.filter((card) => card.set === set.name).length;
    acc[set.name] = count;
    return acc;
  }, {} as Record<string, number>);

  // Count cards by condition
  const cardConditionCounts = cards.reduce((acc, card) => {
    if (card.condition) {
      acc[card.condition] = (acc[card.condition] || 0) + 1;
    }
    return acc;
  }, {} as Record<CardCondition, number>);

  // Decide which sets to show
  const displayedSets = showAllSets ? sets : sets.slice(0, 6);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Card Statistics</Text>

      {/* Cards by Set */}
      <View style={styles.section}>
        <Text style={styles.subHeaderText}>Cards by Set</Text>
        {displayedSets.map((set) => (
          <Text key={set.id} style={styles.statText}>
            {set.name}: {cardCountBySet[set.name] || 0} cards
          </Text>
        ))}

        {sets.length > 6 && (
          <TouchableOpacity onPress={() => setShowAllSets(!showAllSets)}>
            <Text style={styles.showMoreText}>
              {showAllSets ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Cards by Condition */}
      <View style={styles.section}>
        <Text style={styles.subHeaderText}>Cards by Condition</Text>
        {Object.entries(cardConditionCounts).map(([condition, count]) => (
          <Text key={condition} style={styles.statText}>
            {condition}: {count as number} cards
          </Text>
        ))}
      </View>

      {/* Full List of Cards */}
      <View style={styles.section}>
        <Text style={styles.subHeaderText}>All Cards</Text>
        {cards.length === 0 ? (
          <Text style={styles.statText}>No cards added yet.</Text>
        ) : (
          cards.map((card) => (
            <View key={card.id} style={styles.cardItem}>
              <Text style={styles.cardNumber}>#{card.number}</Text>
              <Text style={styles.cardText}>{capitalizeWords(card.name)}</Text>
              <Text style={styles.cardSubText}>
                Set: {card.set || 'Unknown'}
              </Text>
              <Text style={styles.cardSubText}>
                {card.condition}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default CardData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statText: {
    fontSize: 16,
    marginBottom: 4,
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSubText: {
    fontSize: 12,
    color: '#666',
  },
  showMoreText: {
    fontSize: 16,
    color: '#007bff',
    textAlign: 'center',
    marginTop: 8,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
