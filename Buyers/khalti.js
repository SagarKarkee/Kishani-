import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const KhaltiScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const Login = () => {
    navigation.navigate('payment'); // Update with your actual screen name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Text style={styles.brandName}>Khalti</Text>
      <Text style={styles.signInText}>Sign in to your Khalti Account</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Mobile Number / Email"
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
        />
        
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeButton}
        >
          <Text style={styles.eyeText}>{passwordVisible ? '👁' : '🙈'}</Text>
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>FORGOT PASSWORD</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={Login}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>

    
      {/* Create Account */}
      <View style={styles.footer}>
        <Text style={styles.newUserText}>New User?</Text>
        <TouchableOpacity>
          <Text style={styles.createAccountText}>CREATE AN ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  brandName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#7B43A1', // Adjust as per Khalti branding
    marginBottom: 16,
  },
  signInText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
  },
  eyeText: {
    fontSize: 18,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#7B43A1',
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#7B43A1',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  newUserText: {
    fontSize: 14,
    color: '#666',
  },
  createAccountText: {
    fontSize: 14,
    color: '#7B43A1',
    marginLeft: 4,
    fontWeight: '600',
  },
});

export default KhaltiScreen;
