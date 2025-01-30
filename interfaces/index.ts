import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  AddCard: undefined;
  AllCards: undefined;
  EditCard: { card: Card };
  Settings: undefined;
  Collection: undefined;
};

export interface Navigation {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    string | undefined
  >;
}

export enum Currency {
  GBP = '£',
  USD = '$',
}

export interface User {
  currency: Currency;
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
  number: number | null;
  set: string | null;
  condition: CardCondition | null;
  value: number | null;
  type: string | null;
}

export interface Collection {
  id: string;
  name: string;
  cards: Card[];
}