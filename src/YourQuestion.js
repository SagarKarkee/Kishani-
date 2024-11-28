import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const API_URL = process.env.API_URL;


const YourSecurityQuestionScreen = ({ navigation, route }) => {
  const { email } = route.params; 
  const [question, setQuestion] = useState(''); 
  const [answer, setAnswer] = useState('');

  // Fetch security question from the backend when the component is mounted
  useEffect(() => {
    const fetchSecurityQuestion = async () => {
      try {
        const response = await axios.post(`${API_URL}/forgot-password`, { email });
        
        if (response.status === 200) {
          setQuestion(response.data.question); // Set the question from the response
        } else {
          Alert.alert('Error', response.data.message || 'Failed to fetch question');
        }
      } catch (error) {
        console.error('Error fetching security question:', error);
        Alert.alert('Error', 'Failed to fetch the security question');
      }
    };

    fetchSecurityQuestion();
  }, [email]); // This effect runs when the component is mounted and the email is passed

  const handleSubmitAnswer = async () => {
    if (answer === '') {
      Alert.alert('Error', 'Please provide an answer');
      return;
    }
  
    try {
      const response = await axios.post(`${API_URL}/validate-answer`, {
        email,
        answer,
      });
  
      if (response.status === 200) {
        Alert.alert('Success', 'Answer verified. You can now reset your password.');
        navigation.navigate('ChangePassword', { email }); // Pass email to ChangePassword screen
      } else {
        Alert.alert('Error', response.data.message || 'Incorrect answer');
      }
    } catch (error) {
      console.error('Error verifying security answer:', error.response?.data || error);
      Alert.alert('Error', 'Unable to verify the answer');
    }
  };
  
  


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yours Security Question</Text>
      <Text style={styles.subtitle}>Please Give the Secret Answers</Text>

      <TextInput
        style={styles.input}
        placeholder="Question"
        placeholderTextColor="#999"
        value={question} 
        editable={false} 
      />
      <TextInput
        style={styles.input}
        placeholder="Answer "
        placeholderTextColor="#999"
        value={answer}
        onChangeText={setAnswer}
      />

      {/* Navigate to another screen */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmitAnswer} // Call handleSubmitAnswer on button press
        >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>

    </View>
  );
};

const BYourSecurity = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BYourSecurity  />
      </ScrollView>
    </SafeAreaView>
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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
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

export default YourSecurityQuestionScreen;
