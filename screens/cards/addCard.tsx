import { View, Text, Button, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import BasicTextInput from '@/components/BasicTextInput'; // Import BasicTextInput
import { useCardsPersistentStore } from '@/store';
import { Card, CardCondition } from '@/interfaces';
// Images
import CardBack from '../../assets/images/pokemon-card-back.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCard = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string>(CardBack); // Updated type
  const [name, setName] = useState(''); // State for the card name
  const [number, setNumber] = useState(''); // State for the card number

  const { userCards, setUserCards } = useCardsPersistentStore(); // Get the store state and action

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Camera permissions are required to use this feature.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'], // Updated to use the new array format
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update to access `assets` array
    }
  };

  const handleSaveCard = async () => {
    const newCard: Card = {
      name,
      image,
      number: number || null,
      set: null,
      condition: CardCondition.Good || null,
    };
    try {
      // Get existing cards from AsyncStorage
      const storedCards = await AsyncStorage.getItem('userCards');
      const cards = storedCards ? JSON.parse(storedCards) : [];
      cards.push(newCard);

      // Save updated cards back to AsyncStorage
      await AsyncStorage.setItem('userCards', JSON.stringify(cards));

      // Clear form
      setName('');
      setNumber('');
      setImage('null');
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add New Card</Text>

      {/* Display the taken photo */}
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 150, marginTop: 20 }}
        />
      )}

      {/* Button to trigger photo capture */}
      <Button title='Take Photo' onPress={handleTakePhoto} />

      {/* BasicTextInput for card name */}
      <BasicTextInput
        value={name}
        label='Card Name'
        placeholder='Enter card name'
        onChangeText={setName} // Update the state when text changes
      />

      {/* BasicTextInput for card number */}
      <BasicTextInput
        value={number}
        label='Card Number'
        placeholder='Enter card number'
        onChangeText={setNumber}
      />

      {/* Submit button */}
      <Button title='Submit' onPress={handleSaveCard} />
    </View>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
