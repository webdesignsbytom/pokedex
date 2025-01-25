import styled from "styled-components/native";

// Define the type for props explicitly
interface InputProps {
  errorBorder: boolean;
}

export const InputWrapper = styled.View`
  margin-top: 10px;
  width: 100%;
  position: relative;
  padding: 0 20px;
  max-width: 400px;
  background-color: "#ee4037";
`;

export const Input = styled.TextInput<InputProps>`
  width: 100%;
  padding: 10px;
  font-size: 20px;
  border-radius: 5px;
  font-family: "Inter_200ExtraLight";
  background-color: "#ee4037";
`;

export const InputLabel = styled.Text`
  font-size: 20px;
  font-family: "Inter_300Light";
  margin-bottom: 5px;
  colour: white;
`;

export const ErrorContainer = styled.View`
  height: 20px;
  width: 100%;
`;

export const ErrorText = styled.Text`
  font-size: 11px;
  font-family: "Inter_300Light";
  margin-top: 3px;
`;
