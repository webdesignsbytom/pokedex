import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
// Store
import { useCollectionStore } from '../../store';
// Theme
import { themeCommon } from '../../styles/theme';
// Components
import BasicButton from '../BasicButton';

interface CollectionCheckboxArrayProps {
  onSelectionChange?: (selectedCollections: string[]) => void;
}

const CollectionCheckboxArray: React.FC<CollectionCheckboxArrayProps> = ({
  onSelectionChange,
}) => {
  const { collections, addCollection } = useCollectionStore(); // Assuming addCollection is available in your store
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const handleCheck = (id: string) => {
    const updatedSelections = selectedCollections.includes(id)
      ? selectedCollections.filter((collectionId) => collectionId !== id)
      : [...selectedCollections, id];

    setSelectedCollections(updatedSelections);

    // Pass the updated selections back to the parent component
    if (onSelectionChange) {
      onSelectionChange(updatedSelections);
    }
  };

  const handleCreateNewCollection = () => {
    if (newCollectionName.trim() === '') {
      Alert.alert('Error', 'Collection name cannot be empty');
      return;
    }

    // Add the new collection via the store's function
    addCollection(newCollectionName);
    // Reset the input and hide the creation form
    setNewCollectionName('');
    setIsCreating(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Collections:</Text>
      {/* {collections.map((collection) => (
        <View key={collection.id} style={styles.checkboxContainer}>
          <CheckBox
            value={selectedCollections.includes(collection.id)}
            onValueChange={() => handleCheck(collection.id)}
          />
          <Text style={styles.checkboxLabel}>{collection.name}</Text>
        </View>
      ))} */}

      {/* Button to create a new collection */}
      <BasicButton
        command={() => setIsCreating(true)}
        text='+ Collection'
        color={themeCommon.primary}
      />

      {/* Text input for new collection name */}
      {isCreating && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newCollectionName}
            onChangeText={setNewCollectionName}
            placeholder='Enter collection name'
          />
          <BasicButton
            command={handleCreateNewCollection}
            text='Confirm'
            color={themeCommon.primary}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    position: 'relative', // Allows for the input container to be positioned over the screen
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  createButton: {
    marginTop: 20,
    padding: 10,
  },
  inputContainer: {
    position: 'absolute',
    top: '50%', // Center the input form
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Adds a shadow to the container for better visibility
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default CollectionCheckboxArray;
