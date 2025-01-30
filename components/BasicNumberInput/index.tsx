import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface BasicNumberInputProps {
  value: number | null;
  label: string;
  onChangeText: (value: number | null) => void;
  placeholder?: string;
}

const BasicNumberInput: React.FC<BasicNumberInputProps> = ({
  value,
  label,
  onChangeText,
  placeholder,
}) => {
  const handleTextChange = (text: string) => {
    const numericValue = text ? parseInt(text, 10) : null;
    onChangeText(numericValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value !== null ? value.toString() : ''}
        onChangeText={handleTextChange}
        placeholder={placeholder}
        keyboardType='numeric'
      />
    </View>
  );
};

export default BasicNumberInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginVertical: 8, 
    gap: 8,
  },
  label: {
    marginRight: 10, // Space between label and input
    fontSize: 16, // Label font size
    fontWeight: 'bold',
  },
  input: {
    flex: 1, // Take the remaining space
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 16,
  },
});
