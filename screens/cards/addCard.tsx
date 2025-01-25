import { View, Text, Button, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import BasicTextInput from '@/components/BasicTextInput'; // Import BasicTextInput

const AddCard = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null); // Updated type
  const [name, setName] = useState(''); // State for the card name
  const [number, setNumber] = useState(''); // State for the card number

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Camera permissions are required to use this feature.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'], // Updated to use the new array format
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update to access `assets` array
    }
  };

  const handleSubmit = () => {
    // Handle the submission of the card details here
    console.log('Card Name:', name);
    console.log('Card Number:', number);
    console.log('Card Image URI:', image);
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
      <Button title='Submit' onPress={handleSubmit} />
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
