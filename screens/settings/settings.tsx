import { View, Text, StyleSheet, Alert } from 'react-native';
import React from 'react';
// Theme
import { themeCommon } from '../../styles/theme';
import BasicButton from '../../components/BasicButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
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
      <Text>SettingsScreen</Text>
      <BasicButton
        command={handleResetStorage}
        text='Clear Storage'
        color={themeCommon.primary}
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeCommon.mainBackground,
    maxHeight: '100%',
    overflow: 'hidden',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
});
