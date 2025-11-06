// App.js
import React from 'react';
import { StatusBar } from 'react-native';
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <UserProvider>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </UserProvider>
  );
}
