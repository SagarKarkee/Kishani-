import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Import local images
import cultivationImage from '../assets/Cul-1.jpeg';
import cropDiseasesImage from '../assets/dis.jpeg';

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Welcome [User's Name]👋!</Text>
            <Text style={styles.subHeaderText}>Welcome to KISHANI APP</Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Icon name="notifications-outline" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Add Product Section */}
        <View style={styles.addProductSection}>
          <Text style={styles.businessTitle}>Start your business right now</Text>
          <Text style={styles.addProductText}>Add a New Product</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddProduct')}
          >
            <Text style={styles.addButtonText}>+ Add Product</Text>
          </TouchableOpacity>
        </View>

        {/* Education Section */}
        <View style={styles.educationSection}>
          <Text style={styles.educationTitle}>Education</Text>
          <View style={styles.educationBoxes}>
            <TouchableOpacity
              style={styles.educationBox}
              onPress={() => navigation.navigate('Cultivation')}
            >
              <Image source={cultivationImage} style={styles.educationImage} />
              <Text style={styles.educationText}>Cultivation Process</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.educationBox}
              onPress={() => navigation.navigate('CropDiseases')}
            >
              <Image source={cropDiseasesImage} style={styles.educationImage} />
              <Text style={styles.educationText}>Crop Diseases Solutions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Navbar */}
      <View style={styles.fixedNavButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Icon name="home-outline" size={25} color="#43B76A" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Notes')}
        >
          <Icon name="document-text-outline" size={25} color="#43B76A" />
          <Text style={styles.navButtonText}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Message')}
        >
          <Icon name="chatbox-ellipses-outline" size={25} color="#43B76A" />
          <Text style={styles.navButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="person-outline" size={25} color="#43B76A" />
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scrollContent: {
    paddingBottom: 100, // To avoid overlap with the navbar
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
    fontWeight: 'bold',
    marginBottom: 10,
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
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  educationImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  fixedNavButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    elevation: 5,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    marginTop: 5,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Dashboard;
