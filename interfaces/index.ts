import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  AddCard: undefined;
  AllCards: undefined;
};

export interface Navigation {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    string | undefined
  >;
}

export enum CardCondition {
  Bad = 'Bad',
  Good = 'Good',
  Excellent = 'Excellent',
  Mint = 'Mint',
}

export interface Card {
  name: string;
  image: string;
  number: number;
  set: string;
  condition: CardCondition; 
}