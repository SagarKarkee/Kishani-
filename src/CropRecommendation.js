import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const CropRecommendation = () => {
  // State for form data
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [ph, setPh] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [result, setResult] = useState('');

  // API URL from your Flask server
  const API_URL = "http://192.168.0.102:5000/"; // Change to your IP address or URL

  // Handle form submission
  const handleSubmit = async () => {
    const data = {
      Nitrogen: nitrogen,
      Phosphorus: phosphorus,
      Potassium: potassium,
      Temperature: temperature,
      Humidity: humidity,
      pH: ph,
      Rainfall: rainfall,
    };

    try {
      const response = await axios.post(API_URL, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Set result from the response
      setResult(response.data.result);
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch the recommendation. Please try again later.');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Crop Recommendation System 🌱</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Nitrogen"
        keyboardType="numeric"
        value={nitrogen}
        onChangeText={setNitrogen}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Phosphorus"
        keyboardType="numeric"
        value={phosphorus}
        onChangeText={setPhosphorus}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Potassium"
        keyboardType="numeric"
        value={potassium}
        onChangeText={setPotassium}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Temperature in °C"
        keyboardType="numeric"
        value={temperature}
        onChangeText={setTemperature}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Humidity in %"
        keyboardType="numeric"
        value={humidity}
        onChangeText={setHumidity}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter pH"
        keyboardType="numeric"
        value={ph}
        onChangeText={setPh}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Rainfall in mm"
        keyboardType="numeric"
        value={rainfall}
        onChangeText={setRainfall}
      />

      <Button title="Get Recommendation" onPress={handleSubmit} />

      {result ? (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Recommended Crop for Cultivation:</Text>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#BCBBB8',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    color: 'green',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
    fontSize: 16,
  },
  resultCard: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 18,
    color: 'white',
  },
  resultText: {
    fontSize: 16,
    color: 'lightgreen',
  },
});

export default CropRecommendation;
