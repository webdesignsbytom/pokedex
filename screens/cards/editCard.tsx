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
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker'; // Import the DropDownPicker
import { RouteProp } from '@react-navigation/native';
// Interfaces
import { RootStackParamList, Card, CardCondition } from '../../interfaces';
// Themes
import { themeCommon } from '../../styles/theme';
// Components
import BasicTextInput from '../../components/BasicTextInput';
import BasicButton from '../../components/BasicButton';
import BasicNumberInput from '../../components/BasicNumberInput';
import CollectionCheckboxArray from '../../components/CollectionCheckboxArray';

type EditCardRouteProp = RouteProp<RootStackParamList, 'EditCard'>;

const EditCard = ({
  route,
  navigation,
}: {
  route: EditCardRouteProp;
  navigation: any;
}) => {
  const { card } = route.params;

  const [editedCard, setEditedCard] = useState<Card>(card);
  const [open, setOpen] = useState(false); // State for DropDownPicker
  const [condition, setCondition] = useState<CardCondition | null>(
    card.condition
  );

  // Sync the condition value with the editedCard state
  useEffect(() => {
    setEditedCard((prevState) => ({ ...prevState, condition }));
  }, [condition]);

  const handleSave = async () => {
    try {
      // Retrieve stored cards from AsyncStorage
      const storedCards = await AsyncStorage.getItem('userCards');
      if (storedCards) {
        const parsedCards = JSON.parse(storedCards);

        // Update the edited card in the list
        const updatedCards = parsedCards.map((item: Card) =>
          item.number === editedCard.number ? editedCard : item
        );

        await AsyncStorage.setItem('userCards', JSON.stringify(updatedCards));

        navigation.goBack();
      }
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
              // Retrieve stored cards from AsyncStorage
              const storedCards = await AsyncStorage.getItem('userCards');
              if (storedCards) {
                const parsedCards = JSON.parse(storedCards);

                // Filter out the card being deleted
                const updatedCards = parsedCards.filter(
                  (item: Card) => item.number !== editedCard.number
                );

                // Save the updated list to AsyncStorage
                await AsyncStorage.setItem(
                  'userCards',
                  JSON.stringify(updatedCards)
                );

                Alert.alert(
                  'Deleted',
                  'The card has been successfully deleted.'
                );

                // Navigate back after deletion
                navigation.goBack();
              }
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
      <Text style={styles.header}>Edit Card</Text>

      {editedCard.image && (
        <Image
          source={{ uri: editedCard.image }}
          style={{
            width: 200,
            height: 150,
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

      <TextInput
        style={styles.input}
        value={editedCard.type || ''}
        onChangeText={(text) => setEditedCard({ ...editedCard, type: text })}
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
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
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
