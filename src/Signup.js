import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (email === '' || phoneNumber === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    // Perform signup action here
    try {
      const response = await fetch('http://your-server-url/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          phoneNumber,
          password,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully');
        navigation.navigate('PersonelDetails');
      } else {
        const data = await response.json();
        Alert.alert('Error', data.message || 'An error occurred during signup');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server');
    }
  
    // navigation.navigate('PersonelDetails'); // Navigate to the PersonelDetails screen
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button mode="contained" onPress={handleSignup} style={styles.button}>
        <Text style={styles.buttonText}>Signup</Text>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#43B76A'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: 'black'
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#DFDFDF',
    color: 'black'
  },
  button: {
    marginTop: 16,
    backgroundColor: 'white'
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize:18,
  },
  link: {
    marginTop: 16,
    color: 'blue',
    textAlign: 'center',
  },
});

export default Signup;
