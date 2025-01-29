import React from 'react';
import { Text, View, Pressable, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/interfaces';

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SquareButtonProps {
  label: string;
  routeName: string;
  imageSource: any;
  params: any;
}

const SquareButton: React.FC<SquareButtonProps> = ({
  label,
  routeName,
  imageSource,
  params,
}) => {
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <Pressable
      style={styles.pressableContainer}
      onPress={() => navigation.navigate(routeName, params)} // Pass params
    >
      <View style={styles.button}>
        <ImageBackground
          source={imageSource}
          resizeMode='cover'
          style={styles.image}
        ></ImageBackground>
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default SquareButton;

const styles = StyleSheet.create({
  pressableContainer: {
    height: 150
  },
  button: {
    flex: 1,
    width: 96,
    maxWidth: 96,
    height: 96,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000050',
    overflow: 'hidden', // Ensures the image respects the button's rounded corners
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  label: {
    fontSize: 18,
    marginTop: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 6,
    padding: 2,
    backgroundColor: '#00000050',
  },
});
