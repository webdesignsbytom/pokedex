import React from "react";
import { Platform, Text } from "react-native";
import { Input, InputWrapper, InputLabel } from "./styles";

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
  error,
}: Props): JSX.Element => {

  return (
    <InputWrapper>
      {label && <InputLabel>{label}</InputLabel>}
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        multiline={textarea}
        textAlignVertical="top"
        autoCapitalize="none"
        secureTextEntry={hideInput}
        errorBorder={!!error}
        numberOfLines={textarea ? TEXTAREA_NUMBER_OF_LINES : 1}
        style={
          Platform.OS === "ios" && textarea
            ? { height: TEXTAREA_NUMBER_OF_LINES * IOS_LINE_HEIGHT_PX }
            : null
        }
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </InputWrapper>
  );
};

export default BasicTextInput;
