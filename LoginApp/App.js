import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Screen/LoginScreen';
import Home from './Screen/Home';
import { SignUpScreen } from './Screen/SignUpScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false ,gestureEnabled: false}}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}  options={{ title: 'Rejestracja',headerShown: false,gestureEnabled: false }}/>
      <Stack.Screen name="Home" component={Home} options={{ title: 'Ekran Główny', headerShown: false ,gestureEnabled: false}}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;
