import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { MaterialIcons } from '@expo/vector-icons'; // For arrow icon

const CropDiseasesScreen = () => {
  const navigation = useNavigation(); // Hook for navigation

  const content = [
    {
      title: 'Definitions of Plant Disease',
      description:
        'A plant becomes diseased when a causal agent disrupts its normal growth or function. Diseases can be infectious (caused by pathogens like fungi, bacteria, or viruses) or noninfectious (caused by unfavorable conditions like drought or nutrient deficiencies).',
      link: 'https://www.britannica.com/science/plant-disease',
      imageUrl: require('../assets/Plant_Disease.jpeg'), // Local image
    },
    {
      title: 'Disease Development and Transmission',
      description:
        'Pathogenesis involves three key stages: inoculation (where a pathogen contacts the host), incubation (when the pathogen grows and spreads in the host), and infection (where the disease symptoms become visible). Pathogens use toxins, enzymes, and other virulence factors to damage plant tissues and spread effectively.',
      link: 'https://www.britannica.com/science/plant-disease',
      imageUrl: require('../assets/different_Plant_disease.jpeg'), // Local image
    },
    {
      title: 'Epiphytotics (Plant Epidemics)',
      description:
        'Plant epidemics, known as epiphytotics, occur when diseases rapidly spread over large populations of plants. This is often influenced by weather conditions, the introduction of new pathogens, or monoculture farming practices.',
      link: 'https://www.britannica.com/science/plant-disease',
      imageUrl: require('../assets/early_blight_of_potato.jpg'),
      
    },
    {
      title: 'Powdery Mildew (Example Disease)',
      description:
        'Powdery mildew is a common fungal disease affecting crops like tomatoes. Symptoms include white powdery spots on leaves, which may lead to distorted growth and reduced crop yields. Prevention methods include increasing airflow and avoiding overhead watering, while treatment involves fungicides and removing infected parts.',
      link: 'https://www.britannica.com/science/powdery-mildew',
      imageUrl: require('../assets/white_fluffy_pustules.png'),
    },
  ];

  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open link:', err));
  };

  return (
    <View style={styles.container}>
      {/* Top Section with Green Theme */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Crop Diseases Solutions</Text>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Learn about crop diseases and how to manage them</Text>

      {/* Scrollable Content */}
      <ScrollView>
        {content.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={item.imageUrl} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <TouchableOpacity
              style={styles.learnMoreButton}
              onPress={() => openLink(item.link)}
            >
              <Text style={styles.learnMoreText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#41B06E', // Green theme
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 30, // Push down from the top
    borderRadius: 15, // Curved edges
    elevation: 4, // Shadow effect
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1, // Takes remaining space
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
    resizeMode: 'cover', // Ensures the image covers the space
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  learnMoreButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#41B06E',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  learnMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default CropDiseasesScreen;
