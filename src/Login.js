import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the eye icon

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Send the login request to the backend
      const response = await fetch('http://192.168.0.101:5000/login', { // Ensure this is correct IP address and endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful
        Alert.alert('Success', 'Logged in successfully');
        navigation.navigate('Dashboard');  // Redirect to the Dashboard screen
      } else {
        // If login failed (e.g., wrong credentials)
        Alert.alert('Error', data.message || 'Invalid credentials');
      }
    } catch (error) {
      // If there's a network error or server issue
      Alert.alert('Error', 'Failed to connect to the server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      {/* Password Input with Eye Icon */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}  // Toggle the secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Icon name={showPassword ? 'visibility-off' : 'visibility'} size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Button>

      {/* Sign Up Link */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    backgroundColor: '#DFDFDF',
    color: 'black',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,  // Position the icon on the right inside the box
    zIndex: 1,  // Ensure the icon is on top of the input field
  },
  forgotPasswordText: {
    color: 'blue',
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  link: {
    marginTop: 16,
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginScreen;
