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

export interface ApiResponse<T> {
  data: T;
  status: string;
  message?: string;
}

export interface ContactForm {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  phoneNumber: string;
  location: string;
  businessName: string;
  projectType: string;
  createdAt: string; // Use `Date` if you're parsing dates
  updatedAt?: string;
}

export interface CallbackForm {
  id: string;
  fullName: string;
  phoneNumber: string;
  projectType: string;
  createdAt: string;
  updatedAt?: string;
}
