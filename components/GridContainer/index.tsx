import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
// Components
import SquareButton from '../Utils/squareButton';
// Images
import PokeballIcon from '../../assets/icons/pokeball-icon.png';
import PokemonCardBack from '../../assets/images/pokemon-card-back.png';
import Pokedex from '../../assets/images/pokedex.png';
import SettingsIcon from '../../assets/images/settings.png';
import CardPack from '../../assets/images/card-pack.png';

const GridContainer = () => {
  const links = [
    {
      label: 'Add Card',
      routeName: 'AddCard',
      imageSource: PokeballIcon,
      params: undefined, // or any params you need for AddCard
    },
    {
      label: 'All Cards',
      routeName: 'AllCards',
      imageSource: PokemonCardBack,
      params: undefined, // or any params you need for AllCards
    },
    {
      label: 'Collection',
      routeName: 'Collection',
      imageSource: CardPack,
      params: undefined, // No params for Collection
    },
    {
      label: 'Card Data',
      routeName: 'CardData',
      imageSource: Pokedex,
      params: undefined, // No params for Collection
    },
    {
      label: 'Settings',
      routeName: 'Settings',
      imageSource: SettingsIcon,
      params: undefined, // or any params you need for Settings
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
