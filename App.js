import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from './src/GetStarted'; // Adjust the import according to your file structure
import Login from './src/Login'; // Adjust the import according to your file structure
import Signup from './src/Signup'; // Adjust the import according to your file structure
import PersonelDetails from './src/PersonelDetails'; // Adjust the import according to your file structure
import Dashboard from './src/Dashboard'; // Adjust the import according to your file structure


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName="GetStarted">
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="PersonelDetails" component={PersonelDetails} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
    
      </Stack.Navigator>
    </NavigationContainer>
  );
}
