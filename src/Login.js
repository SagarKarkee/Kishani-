import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  
  
  const handleLogin = async () => {
    if (phoneNumber === '' || password === '' ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Perform login action here
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          password,
        }),
      });
  
      if (response.ok) {
        Alert.alert('Success', 'Logged in successfully');
        navigation.navigate('Dashboard');
      } else {
        const data = await response.json();
        Alert.alert('Error', data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server');
    }
    
  };
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
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
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
