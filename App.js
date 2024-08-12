import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GetStarted from './src/GetStarted'; // Adjust the import according to your file structure
import Login from './src/Login'; // Adjust the import according to your file structure
import Signup from './src/Signup'; // Adjust the import according to your file structure
import PersonelDetails from './src/PersonelDetails'; // Adjust the import according to your file structure
import Dashboard from './src/Dashboard'; // Adjust the import according to your file structure
import Notes from './src/Notes'; // Adjust the import according to your file structure
import Message from './src/Message'; // Adjust the import according to your file structure
import Profile from './src/Profile'; // Adjust the import according to your file structure
import { Ionicons } from '@expo/vector-icons'; // or another icon library
import ForgotPasswordScreen from './src/ForgotPasswordScreen';
import AddProduct from './src/AddProduct';
import SelectVegetable from './src/SelectVegetable.js';
import AccountTypeScreen from './src/AccountTypeScreen.js';
import BLoginScreen from './Buyers/Blogin.js';
import BSignup from './Buyers/Bsignup.js';
import BPersonalDetailsForm from './Buyers/BpersonalDetails.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Notes') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Message') {
            iconName = focused ? 'chatbox' : 'chatbox-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Notes" component={Notes} />
      <Tab.Screen name="Message" component={Message} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="GetStarted">
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="AccountTypeScreen" component={AccountTypeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="PersonelDetails" component={PersonelDetails} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Notes" component={Notes} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="SelectVegetable" component={SelectVegetable} />
        <Stack.Screen name="Blogin" component={BLoginScreen} />
        <Stack.Screen name="Bsignup" component={BSignup} />
        <Stack.Screen name="BpersonalDetails" component={BPersonalDetailsForm}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
