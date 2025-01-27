import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Theme
import { themeCommon } from '../../styles/theme';
// Components
import BasicButton from '../BasicButton';
import SquareButton from '../Utils/squareButton';
// Images
import PokeballIcon from '../../assets/icons/pokeball-icon.png';

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
      imageSource: PokeballIcon,
      params: null,
    },
  ];

  const handleResetStorage = async () => {
    Alert.alert(
      'Reset Storage',
      'Are you sure you want to reset all saved data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              console.log('Storage has been cleared successfully.');
              Alert.alert('Success', 'All data has been reset.');
            } catch (error) {
              console.error('Error clearing storage:', error);
              Alert.alert(
                'Error',
                'Failed to clear storage. Please try again.'
              );
            }
          },
        },
      ]
    );
  };

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

        <BasicButton
          command={handleResetStorage}
          text='Clear Storage'
          color={themeCommon.primary}
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
  },
  grid: {
    flex: 3,
    gap: 18,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
