import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.API_URL;
console.log("Api for login: ",API_URL);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // state to manage password visibility

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json(); // Only call json once

      if (response.ok) {
        Alert.alert('Success', 'Logged in successfully');
        if (rememberMe) {
          await AsyncStorage.setItem('userEmail', email);
          await AsyncStorage.setItem('userPassword', password);
        }
        // Store user data in AsyncStorage for later use
        await AsyncStorage.setItem('userFullName', data.user.fullName);
        await AsyncStorage.setItem('userEmail', data.user.email);

        navigation.navigate('Dashboard', { user: data.user.fullName }); // Pass the username here
      } else {
        Alert.alert('Error', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to connect to the server');
    }
  };

  useEffect(() => {
    const loadCredentials = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPassword = await AsyncStorage.getItem('userPassword');
      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
        setRememberMe(true);
      }
    };
    loadCredentials();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeButton}
        >
          <Text style={styles.eyeText}>{passwordVisible ? '👁' : '🙈'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rememberForgotContainer}>
        <View style={styles.rememberMeContainer}>
          <Checkbox
            status={rememberMe ? 'checked' : 'unchecked'}
            onPress={() => setRememberMe(!rememberMe)}
          />
          <Text style={styles.rememberMeText}>Remember Me</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Button>
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
    position: 'relative', // To position the eye icon
  },
  eyeButton: {
    position: 'absolute',
    right: 30,
    top: 12, // Adjust according to the height of the input field
  },
  eyeText: {
    fontSize: 18,
  },

  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 8,
    color: 'black',
  },
  forgotPasswordText: {
    color: 'blue',
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
