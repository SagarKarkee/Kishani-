import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Bcropdiseases = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisease, setSelectedDisease] = useState(null);

  const diseases = [
    {
      name: 'Powdery Mildew',
      crop: 'Tomatoes',
      description: 'A fungal disease causing white powdery spots on leaves and stems.',
      symptoms: 'White powdery spots on leaves, distorted growth.',
      causes: 'High humidity, poor air circulation.',
      prevention: 'Increase airflow, avoid overhead watering.',
      treatment: 'Use fungicides, remove affected leaves.',
      image: require('../assets/dis.jpeg'), // Replace with your actual image path
    },
    // Add more diseases as needed
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedDisease(null); // Reset selected disease when searching
  };

  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crop Diseases Solutions</Text>
      <Text style={styles.subtitle}>Identify and Manage Crop Diseases</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search for a disease or crop"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <ScrollView>
        {filteredDiseases.map((disease, index) => (
          <TouchableOpacity key={index} style={styles.diseaseItem} onPress={() => setSelectedDisease(disease)}>
            <Text style={styles.diseaseName}>{disease.name}</Text>
            <Text style={styles.diseaseCrop}>Affects: {disease.crop}</Text>
          </TouchableOpacity>
        ))}

        {selectedDisease && (
          <View style={styles.detailsSection}>
            <Text style={styles.diseaseDetailTitle}>{selectedDisease.name}</Text>
            <Image source={selectedDisease.image} style={styles.diseaseImage} />
            <Text style={styles.detailLabel}>Symptoms:</Text>
            <Text style={styles.detailText}>{selectedDisease.symptoms}</Text>
            <Text style={styles.detailLabel}>Causes:</Text>
            <Text style={styles.detailText}>{selectedDisease.causes}</Text>
            <Text style={styles.detailLabel}>Prevention:</Text>
            <Text style={styles.detailText}>{selectedDisease.prevention}</Text>
            <Text style={styles.detailLabel}>Treatment Solutions:</Text>
            <Text style={styles.detailText}>{selectedDisease.treatment}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#555',
  },
  searchBar: {
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  diseaseItem: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 5,
  },
  diseaseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  diseaseCrop: {
    fontSize: 14,
    color: '#666',
  },
  detailsSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  diseaseDetailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  diseaseImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
});

export default Bcropdiseases;
