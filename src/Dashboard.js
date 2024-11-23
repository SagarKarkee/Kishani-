import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

// Import local images
import cultivationImage from '../assets/Cul-1.jpeg'; // Replace with your actual path
import cropDiseasesImage from '../assets/dis.jpeg'; // Replace with your actual path

const Dashboard = ({ route, navigation }) => {
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    // Load the user's name from AsyncStorage
    const loadUserName = async () => {
      const storedName = await AsyncStorage.getItem('userFullName');
      if (storedName) setUserName(storedName);
    };

    loadUserName();
  }, []);

  // Function to open the index.html in a browser
  const openRecommendationPage = () => {
    // Assuming the index.html is hosted locally or on a server (e.g., 'http://localhost/index.html')
    const url = 'http://192.168.0.102:5000/'; // Replace with the correct URL
    Linking.openURL(url).catch(err => console.error("Couldn't load the page", err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Welcome {userName}👋!</Text>
          <Text style={styles.subHeaderText}>Welcome to KISHANI APP</Text>
        </View>
        <View style={styles.notification}>
          <TouchableOpacity style={styles.notifications} onPress={() => navigation.navigate('Notification')}>
            <Icon name="notifications-outline" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Product Section */}
      <View style={styles.addProductSection}>
        <Text style={styles.businessTitle}>Start your business right now</Text>
        <Text style={styles.addProductText}>Add a New Product</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProduct')} // Replace 'AddProduct' with the actual screen name
        >
          <Text style={styles.addButtonText}>+ Add Product</Text>
        </TouchableOpacity>
      </View>

      {/* Crops Recommendation Section */}
      <View style={styles.recommendationSection}>
        <Text style={styles.recommendationTitle}>Crops Recommendation</Text>
        <Text style={styles.recommendationText}>
          Get insights into the best crops to grow based on your region and soil type.
        </Text>
        <TouchableOpacity
          style={styles.recommendationButton}
          onPress={openRecommendationPage} // Use the function to open the web page
        >
          <Text style={styles.recommendationButtonText}>Go to Recommendations</Text>
        </TouchableOpacity>
      </View>

      {/* Education Section */}
      <View style={styles.educationSection}>
        <Text style={styles.educationTitle}>Education</Text>
        <View style={styles.educationBoxes}>
          <TouchableOpacity
            style={styles.educationBox}
            onPress={() => navigation.navigate('Cultivation')} // Replace 'Cultivation' with the actual screen name
          >
            <Image
              source={cultivationImage} // Use the imported image
              style={styles.educationImage}
            />
            <Text style={styles.educationText}>Cultivation Process</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.educationBox}
            onPress={() => navigation.navigate('CropDiseases')} // Replace 'CropDiseases' with the actual screen name
          >
            <Image
              source={cropDiseasesImage} // Use the imported image
              style={styles.educationImage}
            />
            <Text style={styles.educationText}>Crop Diseases Solutions</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {/* Your content goes here */}
      </View>

      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Dashboard')} // Change 'Dashboard' to the correct screen name if different
        >
          <Icon name="home-outline" size={25} color="#43B76A" />
          <Text style={{ color: '#000000', fontSize: 14, marginTop: 5, fontWeight: 'bold', }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Notes')} // Change 'Notes' to the correct screen name
        >
          <Icon name="document-text-outline" size={25} color="#43B76A" />
          <Text style={{ color: '#000000', fontSize: 14, marginTop: 5, fontWeight: 'bold' }}>Notes</Text>

        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Message')} // Change 'Message' to the correct screen name
        >
          <Icon name="chatbox-ellipses-outline" size={25} color="#43B76A" />
          <Text style={{ color: '#000000', fontSize: 14, marginTop: 5, fontWeight: 'bold' }}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')} // Change 'Profile' to the correct screen name
        >
          <Icon name="person-outline" size={25} color="#43B76A" />
          <Text style={{ color: '#000000', fontSize: 14, marginTop: 5, fontWeight: 'bold' }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: '#43B76A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 40,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  subHeaderText: {
    fontSize: 18,
    color: '#D1C4E9',
  },
  notificationIcon: {
    marginLeft: 20,
  },
  addProductSection: {
    padding: 20,
    backgroundColor: '#E8EAF6',
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  businessTitle: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addProductText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#247A0E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  educationSection: {
    padding: 20,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    margin: 20,
  },
  educationTitle: {
    fontSize: 18,
    color: '#388E3C',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  educationBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  educationBox: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    marginBottom: 10,
    alignItems: 'center',
    padding: 10,
  },
  educationImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  educationText: {
    fontSize: 16,
    color: '#388E3C',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    marginTop: 5,
    color: '#6200EE',
    fontSize: 14,
  },

  //for recomendation
  recommendationSection: {
    padding: 20,
    backgroundColor: '#FFECB3',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  recommendationTitle: {
    fontSize: 18,
    color: '#FFA000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  recommendationButton: {
    backgroundColor: '#FFA000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  recommendationButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Dashboard;
