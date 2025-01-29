import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { themeCommon } from '../../styles/theme';
import BasicButton from '../../components/BasicButton';
import { Currency } from '../../interfaces';

const SettingsScreen = () => {
  const [open, setOpen] = useState(false); // State for DropDownPicker
  const [currency, setCurrency] = useState<Currency>(Currency.GBP); // Default currency is GBP

  // Load user currency from AsyncStorage when the screen loads
  useEffect(() => {
    const loadCurrency = async () => {
      try {
        const storedCurrency = await AsyncStorage.getItem('currency');
        if (storedCurrency) {
          setCurrency(storedCurrency as Currency); // Set the loaded currency value
        }
      } catch (error) {
        console.error('Failed to load currency:', error);
      }
    };

    loadCurrency();
  }, []);

  // Reset AsyncStorage
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
              setCurrency(Currency.GBP); // Reset to GBP after clearing storage
            } catch (error) {
              console.error('Error clearing storage:', error);
              Alert.alert('Error', 'Failed to clear storage. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <BasicButton
        command={handleResetStorage}
        text="Clear Storage"
        color={themeCommon.primary}
      />
      <Text style={styles.text}>Currency:</Text>
      <DropDownPicker
        open={open}
        value={currency} // Use selected currency
        items={[
          { label: 'GBP (£)', value: Currency.GBP },
          { label: 'USD ($)', value: Currency.USD },
        ]}
        setOpen={setOpen}
        // Directly set value and store in AsyncStorage
        setValue={(value) => {
          setCurrency(value); 
        }}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
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
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 6,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdown: {
    height: 40,
  },
});
