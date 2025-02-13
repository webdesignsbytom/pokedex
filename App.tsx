import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
// Interface
import { RootStackParamList } from './interfaces';
// Stores
import { useAppConfigStore } from './store';
// Themes
import { darkTheme, lightTheme } from './styles/theme';
// Screens
import HomeScreen from './screens/home';
import AddCard from './screens/cards/addCard';
import allCards from './screens/cards/allCards';
import SettingsScreen from './screens/settings/settings';
import EditCard from './screens/cards/editCard';
import CollectionScreen from './screens/collections/collectionScreen';
import CardData from './screens/data/cardData';

const Stack = createNativeStackNavigator<RootStackParamList>();

function MyStack() {
  const appTheme = useAppConfigStore.persistent((state) => state.theme);
  const currentTheme = appTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <>
      <StatusBar
        barStyle='light-content'
        backgroundColor={currentTheme.header}
      />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: currentTheme.header,
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: currentTheme.headerText,
          },
        }}
      >
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Pokédex Home' }}
        />
        <Stack.Screen
          name='AddCard'
          component={AddCard}
          options={{ title: 'Add Card' }}
        />
        <Stack.Screen
          name='AllCards'
          component={allCards}
          options={{ title: 'All Cards' }}
        />
        <Stack.Screen
          name='EditCard'
          component={EditCard}
          options={{ title: 'Edit Cards' }}
        />
        <Stack.Screen
          name='Collection'
          component={CollectionScreen}
          options={{ title: 'Collection' }}
        />
        <Stack.Screen
          name='CardData'
          component={CardData}
          options={{ title: 'Card Data' }}
        />
        <Stack.Screen
          name='Settings'
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
