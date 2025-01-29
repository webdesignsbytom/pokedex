import React from 'react';
import { View, StyleSheet } from 'react-native';
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
      label: 'Settings',
      routeName: 'Settings',
      imageSource: PokeballIcon,
      params: null,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {links.map((button, index) => (
          <SquareButton
            key={index}
            label={button.label}
            routeName={button.routeName} // Pass the routeName dynamically
            imageSource={button.imageSource}
            params={button.params}
          />
        ))}
      </View>
    </View>
  );
};

export default GridContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  grid: {
    flex: 3,
    gap: 18,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
