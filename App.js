import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GetStarted from './src/GetStarted'; // Adjust the import according to your file structure
import Login from './src/Login'; // Adjust the import according to your file structure
import Signup from './src/Signup'; // Adjust the import according to your file structure
import PersonelDetails from './src/PersonelDetails'; // Adjust the import according to your file structure
import Dashboard from './src/Dashboard'; // Adjust the import according to your file structure
import CropRecommendation from './src/CropRecommendation.js';
import Notes from './src/Notes'; // Adjust the import according to your file structure
import Message from './src/Message'; // Adjust the import according to your file structure
import Profile from './src/Profile'; // Adjust the import according to your file structure
import { Ionicons } from '@expo/vector-icons'; // or another icon library
import ForgotPasswordScreen from './src/ForgotPasswordScreen';
import AddProduct from './src/AddProduct';
import SelectVegetable from './src/SelectVegetable.js';
import CropDiseases from './src/CropDiseases.js';
import Cultivation from './src/Cultivation.js';
import BDashboard from './Buyers/BDashboard.js';
import BForgotPasswordScreen from './Buyers/BforgetPassword.js';
import BLoginScreen from './Buyers/Blogin.js';
import Bmessage from './Buyers/Bmessage.js';
import Bnote from './Buyers/Bnotes.js';
import B_personal from './Buyers/BpersonalDetails.js';
import B_profile from './Buyers/Bprofile.js';
import B_Signup from './Buyers/BSignup.js';
import B_vegetableDetails from './Buyers/VegetableDetails.js';
import Account_Type from './src/Accounttype.js';
import Bcultivation from './Buyers/Bcultivation.js';
import Bcropdiseases from './Buyers/Bcropsdiseases.js';
import FeedbackScreen from './Buyers/BFeedbackScreen.js';
import NotificationPage from './Buyers/Bnotification.js';
import SecurityQuestionScreen from './src/SecurityQuestion.js';
import YourSecurityQuestionScreen from './src/YourQuestion.js';
import ChangePasswordScreen from './src/ChangePassword.js';
import SettingScreen from './src/Setting.js';
import Notificationpage from './src/Notification.js';
import BYourSecurityQuestionScreen from './Buyers/BYourQuestion.js';
import BChangePasswordScreen from './Buyers/BChangePassword.js';
import BsettingScreen from './Buyers/Bsetting.js';
import BBcropdiseases from './Buyers/BBcropDiseases.js';
import PrivacyPolicyScreen from './Buyers/BprivacyPolicy.js';
import BBbcropdiseases from './src/BBbcropDiseases.js';
import PrivacyPolicyScreens from './src/PrivacyPolicy.js';
import KhaltiScreen from './Buyers/khalti.js';
import TransferScreen from './Buyers/payment.js';
import Bfavourites from './Buyers/BFavourites.js';

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
          } else if (route.name === 'Education') {
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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="PersonelDetails" component={PersonelDetails} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CropRecommendation" component={CropRecommendation} />
        <Stack.Screen name="Notes" component={Notes} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="SelectVegetable" component={SelectVegetable} />
        <Stack.Screen name="CropDiseases" component={CropDiseases} />
        <Stack.Screen name="Cultivation" component={Cultivation} />
        <Stack.Screen name="Accounttype" component={Account_Type} />
        <Stack.Screen name="BDashboard" component={BDashboard} />
        <Stack.Screen name="BforgetPassword" component={BForgotPasswordScreen} />
        <Stack.Screen name="Blogin" component={BLoginScreen} />
        <Stack.Screen name="Bmessage" component={Bmessage} />
        <Stack.Screen name="Bnotes" component={Bnote} />
        <Stack.Screen name="BpersonalDetails" component={B_personal} />
        <Stack.Screen name="Bprofile" component={B_profile} />
        <Stack.Screen name="BSignup" component={B_Signup} />
        <Stack.Screen name="VegetableDetails" component={B_vegetableDetails} />
        <Stack.Screen name="Bcultivation" component={Bcultivation}/>
        <Stack.Screen name="Bcropsdiseases" component={Bcropdiseases}/>
        <Stack.Screen name="BFeedbackScreen" component={FeedbackScreen}/>
        <Stack.Screen name="Bnotification" component={NotificationPage}/>
        <Stack.Screen name="SecurityQuestion" component={SecurityQuestionScreen}/>
        <Stack.Screen name="YourQuestion" component={YourSecurityQuestionScreen}/>
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}/>
        <Stack.Screen name="Setting" component={SettingScreen}/>
        <Stack.Screen name="Notification" component={Notificationpage}/>
        <Stack.Screen name="BYourQuestion" component={BYourSecurityQuestionScreen}/>
        <Stack.Screen name="BChangePassword" component={BChangePasswordScreen}/>
        <Stack.Screen name="Bsetting" component={BsettingScreen}/>
        <Stack.Screen name="BBcropDiseases" component={BBcropdiseases}/>
        <Stack.Screen name="BprivacyPolicy" component={PrivacyPolicyScreen}/>
        <Stack.Screen name="BBbcropDiseases" component={BBbcropdiseases}/>
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreens}/>
        <Stack.Screen name="khalti" component={KhaltiScreen}/>
        <Stack.Screen name="payment" component={TransferScreen}/>
        <Stack.Screen name="Bfavourites" component={Bfavourites} />

       













        


        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
