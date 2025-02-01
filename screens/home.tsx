import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
// Components
import GridContainer from '@/components/GridContainer';
import { themeCommon } from '@/styles/theme';
// Utils
import { calculateTotalValue } from '../utils/calculateTotalValue';
// Images
import PokeballImage from '../assets/images/pokeball.png';

function HomeScreen() {
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    const fetchTotalValue = async () => {
      const total = await calculateTotalValue();
      setTotalValue(total);
    };

    fetchTotalValue();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={PokeballImage}
        resizeMode='cover'
        style={styles.image}
      >
        <Text style={styles.headerText}>Pokedex</Text>
        <GridContainer />

        {/* Display Total Value */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total Value: £{Number(totalValue || 0).toFixed(2)}
          </Text>
        </View>
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
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    padding: 6,
    backgroundColor: '#00000050',
  },
  headerText: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: '#fff',
    marginTop: 10,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#00000080',
    borderRadius: 8,
    alignSelf: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
