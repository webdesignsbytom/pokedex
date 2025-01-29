import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
// Components
import GridContainer from '@/components/GridContainer';
import { themeCommon } from '@/styles/theme';
// Images
import PokeballImage from '../assets/images/pokeball.png'
// Store
// import { useCardsPersistentStore } from '@/store';

function HomeScreen() {
  // const persistentPlantsStore = useCardsPersistentStore((state) => state);
  useEffect(() => {}, [])

  return (
    <View style={styles.container}>
      <ImageBackground source={PokeballImage} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Pokedex Folders</Text>
        <GridContainer />
      </ImageBackground>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeCommon.mainBackground,
    maxHeight: '100%',
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    padding: 6,
    backgroundColor: '#00000050'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});
