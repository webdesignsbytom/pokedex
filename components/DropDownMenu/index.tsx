import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

interface DropdownProps<T> {
  title: string;
  data: { label: string; value: T }[];
  setSelected: React.Dispatch<React.SetStateAction<T>>; // React state setter function
  placeholder: string;
}

const DropDownMenu = <T,>({
  title,
  data,
  setSelected,
  placeholder,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <DropDownPicker
        open={isOpen}
        value={data[0].label} // The currently selected item
        items={data.map((item) => ({
          label: item.label, // Set the label from the item label
          value: item.label, // Set the value to the item label
        }))}
        setValue={setSelected} // Updates the item when an item is selected
        placeholder={placeholder}
        multiple={false} // Single selection only
        setOpen={setIsOpen} // Controls whether the dropdown is open or closed
      />
    </View>
  );
};

export default DropDownMenu;

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
});
