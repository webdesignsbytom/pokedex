import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  AddCard: undefined;
  AllCards: undefined;
  EditCard: { card: Card };
  Collection: undefined;
  CardData: undefined;
  Settings: undefined;
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
  Damage = 'Heavy Damage',
  Bad = 'Bad',
  Good = 'Good',
  Excellent = 'Excellent',
  Mint = 'Mint',
}

export const cardConditionArray = [
  { label: 'Heavy Damage', value: CardCondition.Damage },
  { label: 'Bad', value: CardCondition.Bad },
  { label: 'Good', value: CardCondition.Good },
  { label: 'Excellent', value: CardCondition.Excellent },
  { label: 'Mint', value: CardCondition.Mint },
];

export enum CardType {
  Grass = 'Grass',
  Fire = 'Fire',
  Water = 'Water',
  Lightning = 'Lightning',
  Psychic = 'Psychic',
  Fighting = 'Fighting',
  Darkness = 'Darkness',
  Metal = 'Metal',
  Fairy = 'Fairy',
  Dragon = 'Dragon',
  Colorless = 'Colorless',
  Null = '',
}

export const cardTypeArray = [
  { label: 'Grass', value: CardType.Grass },
  { label: 'Fire', value: CardType.Fire },
  { label: 'Water', value: CardType.Water },
  { label: 'Lightning', value: CardType.Lightning },
  { label: 'Psychic', value: CardType.Psychic },
  { label: 'Fighting', value: CardType.Fighting },
  { label: 'Darkness', value: CardType.Darkness },
  { label: 'Metal', value: CardType.Metal },
  { label: 'Fairy', value: CardType.Fairy },
  { label: 'Dragon', value: CardType.Dragon },
  { label: 'Colorless', value: CardType.Colorless },
];

export interface Card {
  id: string;
  name: string;
  image: string;
  number: number | null;
  set: string | null;
  condition: CardCondition | null;
  value: number | null;
  type: CardType | null;
}

export interface Collection {
  id: string;
  name: string;
  cards: Card[];
}
