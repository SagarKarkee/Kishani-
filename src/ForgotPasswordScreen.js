import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';

const API_URL = process.env.API_URL;

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  // Email regex pattern
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSend = async () => {
    if (email === '') {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
  
    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
  
    try {
      // Send request to the backend to get the security question
      const response = await axios.post(`${API_URL}forgot-password`, { email });
  
      // Check if the email exists in the database
      if (response.status === 200) {
        console.log('Security question found:', response.data.question);
        // Navigate to the YourQuestionScreen and pass the email and question
        navigation.navigate('YourQuestion', { email, question: response.data.question });
      } else {
        Alert.alert('Error', response.data.message || 'Email not found');
      }
    } catch (error) {
      console.error('Error in forgot password:', error);
      if (error.response) {
        // Server returned an error
        Alert.alert('Error', `Server error: ${error.response.data.message}`);
      } else {
        // No response from server
        Alert.alert('Error', 'Unable to fetch security question');
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password</Text>
      <Text style={styles.subtitle}>
        Enter your email below to receive an email to reset your password.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        // onChangeText={setEmail}
        onChangeText={(text) => setEmail(text.toLowerCase())}

      />
      <Button mode="contained" onPress={handleSend} style={styles.button}>
        <Text style={styles.buttonText}>Send</Text>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>
          Already Have an Account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#43B76A',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#DFDFDF',
    color: 'black',
  },
  button: {
    marginTop: 16,
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  link: {
    marginTop: 16,
    color: 'black',
    textAlign: 'center',
  },
  loginLink: {
    color: 'blue',
  },
});

export default ForgotPasswordScreen;
