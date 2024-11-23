import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const YourSecurityQuestionScreen  = ({ navigation }) => {
  const [Question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yours Security Question</Text>
      <Text style={styles.subtitle}>Please Give the Secret Answers</Text>

      <TextInput
        style={styles.input}
        placeholder="Question"
        placeholderTextColor="#999"
        value={Question}
        onChangeText={setQuestion}
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
        onPress={() => navigation.navigate('ChangePassword')} // Use your actual screen name
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
