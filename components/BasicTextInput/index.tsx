import React from 'react';
import { StyleSheet } from 'react-native';
import { Platform, Text, TextInput, View } from 'react-native';

const TEXTAREA_NUMBER_OF_LINES = 4;
const IOS_LINE_HEIGHT_PX = 20;

interface Props {
  value: string;
  label: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  placeholder: string;
  textarea?: boolean;
  hideInput?: boolean;
  error?: string;
  showErrorMessage?: boolean;
}

const BasicTextInput = ({
  placeholder,
  value,
  label,
  onChangeText,
  onBlur,
  textarea,
  hideInput,
}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        multiline={textarea || false}
        textAlignVertical='top'
        autoCapitalize='none'
        secureTextEntry={hideInput}
        numberOfLines={textarea ? TEXTAREA_NUMBER_OF_LINES : 1}
        style={[
          styles.input,
          Platform.OS === 'ios' && textarea
            ? { height: TEXTAREA_NUMBER_OF_LINES * IOS_LINE_HEIGHT_PX }
            : null,
        ]}
      />
    </View>
  );
};

export default BasicTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Horizontal layout
    alignItems: 'center', // Align vertically in the center
    marginVertical: 8, // Add vertical spacing
    gap: 12,
  },
  label: {
    marginRight: 10, // Space between label and input
    fontSize: 16, // Label font size
    fontWeight: 'bold',
  },
  input: {
    flex: 1, // Take the remaining space
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    fontSize: 22,
    backgroundColor: 'white',
  },
});
