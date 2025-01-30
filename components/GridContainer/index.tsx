import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
// Components
import SquareButton from '../Utils/squareButton';
// Images
import PokeballIcon from '../../assets/icons/pokeball-icon.png';
import PokemonCardBack from '../../assets/images/pokemon-card-back.png';

const GridContainer = () => {
  const links = [
    {
      label: 'Add Card',
      routeName: 'AddCard',
      imageSource: PokeballIcon,
      params: null,
    },
    {
      label: 'All Cards',
      routeName: 'AllCards',
      imageSource: PokemonCardBack,
      params: null,
    },
    {
      label: 'Collections',
      routeName: 'Collection',
      imageSource: PokemonCardBack,
      params: null,
    },
    {
      label: 'Settings',
      routeName: 'Settings',
      imageSource: PokeballIcon,
      params: null,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <FlatList
          data={links}
          keyExtractor={(item, index) =>
            item.label ? item.label.toString() : `fallback-${index}`
          }
          renderItem={({ item }) => (
            <SquareButton
              key={item.label}
              label={item.label}
              routeName={item.routeName} // Pass the routeName dynamically
              imageSource={item.imageSource}
              params={item.params}
            />
          )}
          numColumns={3}
          contentContainerStyle={styles.grid}
        />
      </View>
    </View>
  );
};

export default GridContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  grid: {
    rowGap: 12,
    columnGap: 12,
  },
});
