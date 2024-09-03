import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import GetStarted from './src/GetStarted';
import Login from './src/Login';
import Signup from './src/Signup';
import PersonelDetails from './src/PersonelDetails';
import Dashboard from './src/Dashboard';
import Notes from './src/Notes';
import Message from './src/Message';
import Profile from './src/Profile';
import ForgotPasswordScreen from './src/ForgotPasswordScreen';
import AddProduct from './src/AddProduct';
import SelectVegetable from './src/SelectVegetable';
import AccountTypeScreen from './src/AccountTypeScreen';
import BLoginScreen from './Buyers/Blogin';
import BSignup from './Buyers/BSignup';
import BpersonalDetails from './Buyers/BpersonalDetails';

import BForgotPasswordScreen from './Buyers/BforgetPassword';
import BDashboard from './Buyers/BDashboard';
import VegetableDetails from './Buyers/VegetableDetails';
import Bnotes from './Buyers/Bnotes';
import Bmessage from './Buyers/Bmessage';
import Bprofile from './Buyers/Bprofile';

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
        <Stack.Screen name="BSignup" component={BSignup} />
        <Stack.Screen name="BpersonalDetails" component={BpersonalDetails} />
        <Stack.Screen name="BforgetPassword" component={BForgotPasswordScreen} />
        <Stack.Screen name="BDashboard" component={BDashboard} />
        <Stack.Screen name="VegetableDetails" component={VegetableDetails} />
        <Stack.Screen name="Bnotes" component={Bnotes}/>
        <Stack.Screen name="Bmessage" component={Bmessage}/>
        <Stack.Screen name="Bprofile" component={Bprofile}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
}
