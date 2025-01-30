import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/interfaces';
// Theme
import { themeCommon } from '../../styles/theme';

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ItemProps {
  item: {
    id: string;
    name: string;
  };
}

const CollectionButton = ({ item }: ItemProps) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const params = item;
  
  return (
    <View style={styles.collectionItem}>
      <Pressable
        style={styles.pressableContainer}
        // onPress={() => navigation.navigate('Collection', params)} // Pass params
      >
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.viewText}>View</Text>
      </Pressable>
    </View>
  );
};

export default CollectionButton;

const styles = StyleSheet.create({
  collectionItem: {
    backgroundColor: themeCommon.primary,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  pressableContainer: {
    flex: 2,
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  text: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignItems: 'center',
    marginVertical: 'auto',
  },
  viewText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'center',
  },
});
