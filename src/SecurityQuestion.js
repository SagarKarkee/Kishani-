import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker'; // Install this package for dropdown
import axios from 'axios';

const API_URL = 'http://192.168.1.92:5000';

const SecurityQuestionScreen = ({ navigation }) => {
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const securityQuestions = [
    'What is the first name of your best friend in high school?',
    'What was the name of your first pet?',
    'What was the first thing you learned to cook?',
    'What was the first film you saw in the theater?',
    'Where did you go the first time you flew on a plane?',
    'What is the last name of your favorite elementary school teacher?',
  ];

  const handleSignup = async () => {
    if (
      securityQuestion === '' ||
      securityAnswer === ''
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/signup`,
        {
          securityQuestion,
          securityAnswer,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        Alert.alert('Success', 'User registered successfully');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Registration failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Security Question Dropdown */}
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={securityQuestion}
          onValueChange={(itemValue) => setSecurityQuestion(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a security question" value="" />
          {securityQuestions.map((question, index) => (
            <Picker.Item key={index} label={question} value={question} />
          ))}
        </Picker>
      </View>

      {/* Security Answer */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Answer"
          value={securityAnswer}
          onChangeText={setSecurityAnswer}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleSignup}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
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
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    backgroundColor: '#DFDFDF',
    color: 'black',
  },
  picker: {
    height: 50,
    backgroundColor: '#DFDFDF',
    borderRadius: 4,
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

export default SecurityQuestionScreen;
