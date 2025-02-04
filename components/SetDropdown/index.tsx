import React from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

// Define the SetDropdown component props type
interface SetDropdownProps {
  sets: { name: string }[];
  set: string | null; // Allow null
  setSet: React.Dispatch<React.SetStateAction<string | null>>; // Allow null
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const SetDropdown: React.FC<SetDropdownProps> = ({ sets, set, setSet, open, setOpen }) => {
  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
        Select Set
      </Text>
      <DropDownPicker
        open={open}            // Controlled from parent
        value={set}            // The currently selected set
        items={sets.map((set) => ({
          label: set.name,     // Set the label from the set name
          value: set.name,     // Set the value to the set name
        }))}
        setValue={setSet}      // Updates the set when an item is selected
        placeholder="Select Set"
        multiple={false}       // Single selection only
        setOpen={setOpen}      // Controls whether the dropdown is open or closed
      />
    </View>
  );
};

export default SetDropdown;
