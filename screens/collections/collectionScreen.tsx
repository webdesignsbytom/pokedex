import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
// Store
import { useCollectionStore } from '../../store';

const CollectionScreen = () => {
  const { collections, addCollection } = useCollectionStore();
  const [newCollection, setNewCollection] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collections</Text>
      
      {/* Displaying the collections */}
      <FlatList
        data={collections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.collectionItem}>
            <Text style={styles.collectionText}>{item.name}</Text>
          </View>
        )}
      />

      {/* Input for new collection */}
      <TextInput
        style={styles.input}
        placeholder="New Collection Name"
        value={newCollection}
        onChangeText={setNewCollection}
      />

      {/* Add collection button */}
      <Button
        title="Add Collection"
        onPress={() => {
          if (newCollection.trim()) {
            addCollection(newCollection);
            setNewCollection('');
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  collectionItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  collectionText: {
    fontSize: 18,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    marginBottom: 20,
  },
});

export default CollectionScreen;
