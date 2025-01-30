import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SmallCardItemProps {
  command: () => void; // Function to execute on button press
  text: string; // Button label
  color?: string; // Optional button color
}

const SmallButton: React.FC<SmallCardItemProps> = ({
  command,
  text,
  color = '#007bff',
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]} // Apply dynamic color
        onPress={command}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SmallButton;
