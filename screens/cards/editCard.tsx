import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker'; // Import the DropDownPicker
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Interfaces
import {
  RootStackParamList,
  Card,
  CardCondition,
  cardTypeArray,
  CardType,
} from '../../interfaces';
// Themes
import { themeCommon } from '../../styles/theme';
// Store
import { useCardStore } from '@/store/useCardStore';
// Components
import BasicTextInput from '../../components/BasicTextInput';
import BasicButton from '../../components/BasicButton';
import BasicNumberInput from '../../components/BasicNumberInput';
import DropDownMenu from '@/components/DropDownMenu';

type EditCardRouteProp = RouteProp<RootStackParamList, 'EditCard'>;

const EditCard = ({
  route,
  navigation,
}: {
  route: EditCardRouteProp;
  navigation: any;
}) => {
  const { card } = route.params;

  const { cards, loadCards, removeCard } = useCardStore(); // Use store methods

  const [editedCard, setEditedCard] = useState<Card>(card);
  const [selectedType, setSelectedType] = useState<CardType>(card.type ?? CardType.Null); // Fallback if type is null
  const [open, setOpen] = useState(false); // State for DropDownPicker
  const [condition, setCondition] = useState<CardCondition | null>(
    card.condition
  );

  // Sync the condition value with the editedCard state
  useEffect(() => {
    setEditedCard((prevState) => ({ ...prevState, condition }));
  }, [condition]);

  useEffect(() => {
    loadCards(); // Load cards from AsyncStorage on component mount
  }, [loadCards]);

  const handleSave = async () => {
    try {
      // Update the card with the selected type
      const updatedCard = { ...editedCard, type: selectedType };
      const cardExists = cards.find((item) => item.id === updatedCard.id);

      if (cardExists) {
        const updatedCards = cards.map((item) =>
          item.id === updatedCard.id ? updatedCard : item
        );
        await AsyncStorage.setItem('userCards', JSON.stringify(updatedCards));
        loadCards();
      }
      navigation.goBack();
    } catch (err) {
      console.error('Error saving card:', err);
    }
  };

  const deleteCard = async () => {
    Alert.alert(
      'Delete Card',
      'Are you sure you want to delete this card? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeCard(editedCard.id); // Remove the card from the store
              loadCards(); // Reload the cards after deletion
              Alert.alert('Deleted', 'The card has been successfully deleted.');
              navigation.goBack();
            } catch (err) {
              console.error('Error deleting card:', err);
              Alert.alert(
                'Error',
                'Failed to delete the card. Please try again.'
              );
            }
          },
        },
      ]
    );
  };

  const handleEditPhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Camera permissions are required to edit the image.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setEditedCard({ ...editedCard, image: result.assets[0].uri });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {editedCard.image && (
        <Image
          source={{ uri: editedCard.image }}
          style={{
            width: 150,
            height: 200,
            marginTop: 20,
            marginHorizontal: 'auto',
          }}
        />
      )}

      <BasicButton
        command={handleEditPhoto}
        text='Edit Image'
        color={themeCommon.primary}
      />

      <BasicTextInput
        value={editedCard.name}
        label='Card Name:'
        onChangeText={(text) => setEditedCard({ ...editedCard, name: text })}
        placeholder='Card Name'
      />

      <BasicNumberInput
        value={editedCard.number || null}
        label='Card Number'
        onChangeText={(text) => setEditedCard({ ...editedCard, number: text })}
        placeholder='Edit card number'
      />

      <TextInput
        style={styles.input}
        value={editedCard.set || ''}
        onChangeText={(text) => setEditedCard({ ...editedCard, set: text })}
        placeholder='Card Set'
      />

<DropDownMenu
        title='Card Type'
        data={cardTypeArray}
        setSelected={setSelectedType} // Set local state here
        placeholder='Card Type'
      />

      <BasicNumberInput
        value={editedCard.value || null}
        label='Card Value'
        onChangeText={(text) => setEditedCard({ ...editedCard, value: text })}
        placeholder='Edit card value'
      />

      {/* DropDownPicker for condition */}
      <Text style={styles.text}>Condition:</Text>

      <DropDownPicker
        open={open}
        value={condition} // Match the enum type
        items={[
          { label: 'Bad', value: CardCondition.Bad },
          { label: 'Good', value: CardCondition.Good },
          { label: 'Excellent', value: CardCondition.Excellent },
          { label: 'Mint', value: CardCondition.Mint },
        ]}
        setOpen={setOpen}
        setValue={setCondition}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
      />

      <BasicButton
        command={handleSave}
        text='Save Changes'
        color={themeCommon.primary}
      />

      <BasicButton
        command={deleteCard}
        text='Delete Card'
        color={themeCommon.primary}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  dropdownContainer: {
    marginBottom: 12,
    height: 50,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
  },
});

export default EditCard;
