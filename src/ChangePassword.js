import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import axios from 'axios';

const API_URL = process.env.API_URL;

const ChangePasswordScreen = ({ route, navigation }) => {
  const { email } = route.params || {}; // Ensure email is passed correctly from previous screen
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation function
  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isValidLength = password.length >= 8;
    return hasUppercase && hasNumber && isValidLength;
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }
  
    if (!validatePassword(newPassword)) {
      Alert.alert(
        'Error',
        'New password must contain at least 1 uppercase letter, 1 number, and be at least 8 characters long.'
      );
      return;
    }
  
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match.');
      return;
    }
  
    try {
      const response = await axios.post(`${API_URL}update-password`, {
        email, // Passed from YourQuestion screen
        newPassword,
      });
  
      if (response.status === 200) {
        Alert.alert('Success', 'Password has been changed successfully!');
        navigation.navigate('Login'); // Navigate to login screen
      }
    } catch (error) {
      console.error('Error resetting password:', error.response?.data || error);
      Alert.alert('Error', 'Error resetting password');
    }
  };
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      {/* New Password */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#999"
          secureTextEntry={!showNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowNewPassword(!showNewPassword)}
        >
          <Icon
            name={showNewPassword ? 'visibility' : 'visibility-off'}
            size={24}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm New Password */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          placeholderTextColor="#999"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Icon
            name={showConfirmPassword ? 'visibility' : 'visibility-off'}
            size={24}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {/* Change Password Button */}
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#43B76A',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 10,
    },
    eyeIcon: {
        marginLeft: 10,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
});

export default ChangePasswordScreen;