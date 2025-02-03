import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
// Interfaces
import {
  Card,
  CardCondition,
  cardConditionArray,
  CardType,
  cardTypeArray,
} from '../../interfaces';
// Theme
import { themeCommon } from '../../styles/theme';
// Store
import { useSetStore } from '../../store';
import { useCardStore } from '@/store/useCardStore';
// Components
import BasicTextInput from '../../components/BasicTextInput';
import BasicButton from '../../components/BasicButton';
import BasicNumberInput from '../../components/BasicNumberInput';
import CurrencyInput from 'react-native-currency-input';
import SetDropdown from '../../components/SetDropdown';

const AddCard = () => {
  const { sets } = useSetStore();
  const { addCard } = useCardStore();

  const [image, setImage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [set, setSet] = useState<string>('');
  const [number, setNumber] = useState<number | null>(null);
  const [value, setValue] = useState<number | null>(null);
  const [type, setType] = useState<CardType>(CardType.Null);
  const [condition, setCondition] = useState<CardCondition>(
    CardCondition.Excellent
  );

  const [typeOpen, setTypeOpen] = useState(false);
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
      const newCard: Card = {
        id: uuid.v4() as string,
        name: name.trim(),
        image,
        number,
        set: set.trim() || null,
        condition,
        value,
        type,
      };

      await addCard(newCard); // ✅ Use Zustand store instead of AsyncStorage

      alert('Card saved successfully!');

      // Clear the form
      setName('');
      setNumber(null);
      setImage('');
      setSet('');
      setValue(null);
      setType(CardType.Null);
      setCondition(CardCondition.Good);
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

      <View style={styles.dropContainer}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
          Select Type
        </Text>
        <DropDownPicker
          open={typeOpen}
          value={type} // Match the enum type
          items={cardTypeArray}
          setOpen={setTypeOpen}
          setValue={setType}
        />
      </View>

      <View style={styles.valueContainer}>
        <Text style={styles.valueLabel}>Value: £</Text>
        <CurrencyInput
          value={value}
          onChangeValue={setValue}
          delimiter='.'
          separator=','
          precision={2}
          minValue={0}
          style={styles.numInput}
          onChangeText={(formattedValue) => {
            console.log(formattedValue);
          }}
        />
      </View>

      {/* Dropdown to select card condition */}
      <View style={styles.dropContainer}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
          Select Condition
        </Text>
        <DropDownPicker
          open={conditionOpen}
          value={condition} // Match the enum type
          items={cardConditionArray}
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
    paddingBottom: 6,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    rowGap: 4,
    paddingTop: 4,
    paddingBottom: 8,
    alignContent: 'center',
    alignItems: 'center',
  },
  valueLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  numInput: {
    width: '100%',
    maxWidth: 200,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
  },
});
