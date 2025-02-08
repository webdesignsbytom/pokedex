import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { Checkbox } from 'react-native-paper';
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
  const [set, setSet] = useState<string | null>(null);
  const [number, setNumber] = useState<number | null>(null);
  const [value, setValue] = useState<number | null>(null);
  const [firstEdition, setFirstEdition] = useState<boolean>(false);
  const [type, setType] = useState<CardType>(CardType.Null);
  const [condition, setCondition] = useState<CardCondition>(
    CardCondition.Excellent
  );

  const [typeOpen, setTypeOpen] = useState(false);
  const [conditionOpen, setConditionOpen] = useState(false);
  const [setsOpen, setSetsOpen] = useState(false);

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
      setImage(result.assets[0].uri);
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
        set: set || null,
        condition,
        value,
        type,
        firstEdition,
      };

      await addCard(newCard);
      alert('Card saved successfully!');

      // Clear the form
      setName('');
      setNumber(null);
      setImage('');
      setSet(null);
      setValue(null);
      setType(CardType.Null);
      setCondition(CardCondition.Good);
    } catch (error) {
      console.error('Error saving card:', error);
      alert('An error occurred while saving the card. Please try again.');
    }
  };

  const formItems = [
    {
      key: 'image',
      component: image ? (
        <Image
          source={{ uri: image }}
          style={{
            width: 200,
            height: 250,
            marginTop: 20,
            alignSelf: 'center',
          }}
        />
      ) : null,
    },
    {
      key: 'take-photo',
      component: (
        <BasicButton
          command={handleTakePhoto}
          text='Take Photo'
          color={themeCommon.primary}
        />
      ),
    },
    {
      key: 'name',
      component: (
        <BasicTextInput
          value={name}
          label='Card Name'
          onChangeText={setName}
          placeholder='Enter card name'
        />
      ),
    },
    {
      key: 'number',
      component: (
        <BasicNumberInput
          value={number}
          label='Card Number'
          onChangeText={setNumber}
          placeholder='Enter card number'
        />
      ),
    },
    {
      key: 'firstEdition',
      component: (
        <View style={styles.checkboxRow}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>First Edition</Text>
          <Checkbox
            status={firstEdition ? 'checked' : 'unchecked'}
            onPress={() => setFirstEdition(!firstEdition)}
            color={themeCommon.primary}
          />
        </View>
      ),
    },
    {
      key: 'set',
      component: (
        <View
          style={[
            styles.dropContainer,
            setsOpen ? styles.dropContainerOpen : null,
          ]}
        >
          <SetDropdown
            sets={sets}
            set={set}
            setSet={(value) => setSet(value ?? '')}
            open={setsOpen}
            setOpen={setSetsOpen}
          />
        </View>
      ),
    },
    {
      key: 'type',
      component: (
        <View
          style={[
            styles.dropContainer,
            typeOpen ? styles.dropContainerOpen : null,
          ]}
        >
          <Text style={styles.label}>Select Type</Text>
          <DropDownPicker
            open={typeOpen}
            value={type}
            items={cardTypeArray}
            setOpen={setTypeOpen}
            setValue={setType}
            zIndex={1000}
            zIndexInverse={3000}
          />
        </View>
      ),
    },
    {
      key: 'value',
      component: (
        <View style={styles.valueContainer}>
          <Text style={styles.valueLabel}>Value: £</Text>
          <CurrencyInput
            value={value}
            onChangeValue={setValue}
            delimiter=','
            separator='.'
            precision={2}
            minValue={0}
            style={styles.numInput}
          />
        </View>
      ),
    },
    {
      key: 'condition',
      component: (
        <View
          style={[
            styles.dropContainer,
            conditionOpen ? styles.dropContainerOpen : null,
          ]}
        >
          <Text style={styles.label}>Select Condition</Text>
          <DropDownPicker
            open={conditionOpen}
            value={condition}
            items={cardConditionArray}
            setOpen={setConditionOpen}
            setValue={setCondition}
            zIndex={900}
            zIndexInverse={2900}
          />
        </View>
      ),
    },
    {
      key: 'submit',
      component: (
        <BasicButton
          command={handleSaveCard}
          text='Submit'
          color={themeCommon.primary}
        />
      ),
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={formItems}
          renderItem={({ item }) => item.component}
          keyExtractor={(item) => item.key}
          keyboardShouldPersistTaps='handled'
          style={styles.flatListContainer}
        />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: { flex: 1 },
  flatListContainer: { flex: 1, padding: 24 },
  dropContainer: { marginBottom: 16, zIndex: 10 },
  dropContainerOpen: { zIndex: 1000 },
  numInput: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    paddingHorizontal: 8,
    fontSize: 18,
    height: 40,
    width: '100%',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  valueLabel: { fontSize: 16, fontWeight: '700', marginRight: 8 },
});
