import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Interfaces
import { Card, CardCondition } from '../../interfaces';
// Theme
import { themeCommon } from '../../styles/theme';
// Store
import { useSetStore } from '../../store';
// Components
import BasicTextInput from '../../components/BasicTextInput';
import BasicButton from '../../components/BasicButton';
import BasicNumberInput from '../../components/BasicNumberInput';
import CurrencyInput from 'react-native-currency-input';
import SetDropdown from '../../components/SetDropdown';

const AddCard = () => {
  const { sets } = useSetStore();

  const [image, setImage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [set, setSet] = useState<string>('');
  const [number, setNumber] = useState<number | null>(null);
  const [value, setValue] = useState<number | null>(null);
  const [type, setType] = useState<string>('');
  const [condition, setCondition] = useState<CardCondition>(
    CardCondition.Excellent
  );

  const [conditionOpen, setConditionOpen] = useState(false);
  const [setsOpen, setSetsOpen] = useState(false);

  const [errors, setErrors] = useState('');

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Camera permissions are required to use this feature.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri); // Accessing safely
    }
  };

  const handleSaveCard = async () => {
    // Validate required fields
    if (!name.trim()) {
      alert('Please enter a card name.');
      return;
    }

    if (!image) {
      alert('Please take or upload an image for the card.');
      return;
    }

    if (!number) {
      alert('Please enter the card number.');
      return;
    }

    try {
      // Create a new card object
      const newCard: Card = {
        name: name.trim(),
        image,
        number: number,
        set: set.trim() || null,
        condition,
        value,
        type,
      };

      // Retrieve existing cards from AsyncStorage
      const storedCards = await AsyncStorage.getItem('userCards');
      let cards: Card[] = [];

      try {
        cards = storedCards ? JSON.parse(storedCards) : [];
        if (!Array.isArray(cards)) {
          throw new Error('Invalid data format in AsyncStorage.');
        }
      } catch (error) {
        console.warn('Error parsing stored userCards:', error);
        cards = [];
      }

      // Add the new card
      cards.push(newCard);

      // Validate the data before saving
      const serializedCards = JSON.stringify(cards);
      if (!serializedCards) {
        setErrors('Failed to serialize data.');
        throw new Error('Failed to serialize cards data.');
      }

      // Save updated cards back to AsyncStorage
      await AsyncStorage.setItem('userCards', serializedCards);

      // Post-save validation: Ensure the data was saved successfully
      const savedCards = await AsyncStorage.getItem('userCards');
      if (savedCards !== serializedCards) {
        throw new Error('Data mismatch: saved data does not match.');
      }

      alert('Card saved successfully!');

      // Clear the form after saving
      setName('');
      setNumber(null);
      setImage('');
      setSet('');
      setValue(null);
      setType('');
      setCondition(CardCondition.Good); // Reset condition to default
    } catch (error) {
      console.error('Error saving card:', error);
      alert('An error occurred while saving the card. Please try again.');
    }
  };



  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Add New Card</Text>
      {errors === 'Failed to serialize data.' && (
        <View>
          <Text>Failed to serialize data.</Text>
        </View>
      )}
      {/* Display the taken photo */}
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 200,
            height: 150,
            marginTop: 20,
            marginHorizontal: 'auto',
          }}
        />
      )}


      {/* Button to trigger photo capture */}
      <BasicButton
        command={handleTakePhoto}
        text='Take Photo'
        color={themeCommon.primary}
      />

      {/* BasicTextInput for card name */}
      <BasicTextInput
        value={name}
        label='Card Name'
        onChangeText={setName} // Update the state when text changes
        placeholder='Enter card name'
      />

      {/* BasicTextInput for card number */}
      <BasicNumberInput
        value={number}
        label='Card Number'
        onChangeText={setNumber}
        placeholder='Enter card number'
      />

      {/* DropDownPicker for Card Set */}
      <View style={styles.dropContainer}>
        <SetDropdown
          sets={sets}
          set={set}
          setSet={setSet}
          open={setsOpen}
          setOpen={setSetsOpen}
        />
      </View>

      <BasicTextInput
        value={type}
        label='Card Type'
        onChangeText={setType}
        placeholder='Enter card type'
      />

      <CurrencyInput
        value={value}
        onChangeValue={setValue}
        prefix='£'
        delimiter='.'
        separator=','
        precision={2}
        minValue={0}
        showPositiveSign
        onChangeText={(formattedValue) => {
          console.log(formattedValue); // R$ +2.310,46
        }}
      />

      {/* Dropdown to select card condition */}
      <View>
        <Text style={styles.label}>Condition</Text>
      </View>

      <View style={styles.dropContainer}>
        <DropDownPicker
          open={conditionOpen}
          value={condition} // Match the enum type
          items={[
            { label: 'Bad', value: CardCondition.Bad },
            { label: 'Good', value: CardCondition.Good },
            { label: 'Excellent', value: CardCondition.Excellent },
            { label: 'Mint', value: CardCondition.Mint },
          ]}
          setOpen={setConditionOpen}
          setValue={setCondition}
        />
      </View>

      {/* Submit button */}
      <BasicButton
        command={handleSaveCard}
        text='Submit'
        color={themeCommon.primary}
      />
    </ScrollView>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  dropContainer: {
    paddingTop: 4,
    paddingBottom: 18,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
});
