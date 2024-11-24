import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker'; // Install this package for dropdown
import axios from 'axios';

const API_URL = process.env.API_URL;


const SecurityQuestionScreen = ({ route, navigation }) => {
  const { email } = route.params;
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

  const handleSecurityQuestion = async () => {
    if (securityQuestion === '' || securityAnswer === '') {
        Alert.alert('Error', 'Please fill in all fields');
        return;
    }

    try {
        setLoading(true);
        const response = await axios.post(`${API_URL}/SecurityQuestion`, 
            {
                email, // Include the email
                securityQuestion,
                securityAnswer,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Backend response:', response.data);

        if (response.status === 201) {
            Alert.alert('Success', 'Security question saved successfully');
            navigation.navigate('Login'); // Navigate to Login screen
        } else {
            Alert.alert('Error', 'Failed to save security question');
        }
    } catch (error) {
        Alert.alert('Error', 'An error occurred during the process');
        console.error(error);
    } finally {
        setLoading(false);
    }
};


  return (
    <View style={styles.container}>
      {/* Page Header */}
      <Text style={styles.header}>Security Question</Text>

      {/* Security Question Label */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Please select a security question:</Text>
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

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSecurityQuestion}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Done</Text>
      </Button>
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
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
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
  button: {
    marginTop: 16,
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SecurityQuestionScreen;
