import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

// Replace with your local IP address
const API_URL = 'http://192.168.0.101:5000'; // Replace with the actual IP of the machine running your backend

const Signup = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Signup Logic
  const handleSignup = async () => {
    // Validation for empty fields
    if (fullName === '' || email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validation for password matching
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true); // Start loading
    try {
      // Debugging - Log request details
      console.log('Sending signup data to backend:', { fullName, email, password });

      // Make the POST request to the backend
      const response = await axios.post(`${API_URL}/signup`, {
        fullName,
        email,
        password,
      });

      // Debugging - Log backend response
      console.log('Backend response:', response.data);

      // If registration is successful
      Alert.alert('Success', response.data.message);
      navigation.navigate('Login'); // Navigate to Login screen after successful signup
    } catch (error) {
      // Handle registration errors
      console.error('Error during signup:', error);
      Alert.alert('Error', error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>

      {/* Full Name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Icon
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        >
          <Icon
            name={confirmPasswordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {/* Signup Button */}
      <Button
        mode="contained"
        onPress={handleSignup}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Signup</Text>
      </Button>

      {/* Navigation to Login Screen if user already has an account */}
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
    backgroundColor: '#43B76A',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: 'black',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingRight: 40,
    backgroundColor: '#DFDFDF',
    color: 'black',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 13,
  },
  button: {
    marginTop: 16,
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    marginTop: 16,
    color: 'blue',
    textAlign: 'center',
  },
});

export default Signup;
