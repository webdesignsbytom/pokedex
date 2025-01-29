import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker'; // Import the DropDownPicker
// Interfaces
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Card, CardCondition } from '../../interfaces';
import BasicTextInput from '../../components/BasicTextInput';
import BasicButton from '../../components/BasicButton';
import { themeCommon } from '../../styles/theme';

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
  ); // Selected condition

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

        // Save updated list to AsyncStorage
        await AsyncStorage.setItem('userCards', JSON.stringify(updatedCards));

        // Navigate back
        navigation.goBack();
      }
    } catch (err) {
      console.error('Error saving card:', err);
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

      <BasicTextInput
        value={editedCard.name}
        label='Card Name:'
        onChangeText={(text) => setEditedCard({ ...editedCard, name: text })}
        placeholder='Card Name'
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
      <TextInput
        style={styles.input}
        value={editedCard.value || ''}
        onChangeText={(text) => setEditedCard({ ...editedCard, value: text })}
        placeholder='Card Value'
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

      <BasicButton command={handleSave} text="Save Changes" color={themeCommon.primary} />
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
