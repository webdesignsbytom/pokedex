import React, { useEffect } from 'react';
import { StyleSheet, FlatList, Text, ScrollView, View } from 'react-native';
// Components
import SmallCardItem from '../SmallCardItem';
import { useCardStore } from '@/store/useCardStore';
// Store

const CardGridContainer = () => {
  const { cards, loadCards } = useCardStore(); // ✅ Get Zustand state

  useEffect(() => {
    loadCards(); // ✅ Load cards when component mounts
  }, []);

  return (
    <View style={styles.container}>
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
        <Text style={styles.noCardsText}>No cards to display.</Text>
      )}
    </View>
  );
};

export default CardGridContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 12,
  },
  grid: {
    gap: 12,
    justifyContent: 'center',
    padding: 4
  },
  noCardsText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#555',
  },
});
