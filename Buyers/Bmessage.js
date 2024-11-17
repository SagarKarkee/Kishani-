import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Import images from assets folder
import cultivationImg from './../assets/Cul-1.jpeg';
import diseasesImg from './../assets/dis.jpeg';


// Header Component
const Header = () => (

  <View>
    <Text style={styles.eduction}>Education Section</Text>
  </View>

);

//Info Card Component (Subtitle Removed)
// const InfoCard = ({ title, imageUrl }) => (
//   <View style={styles.infoCard}>
//     <Image source={imageUrl} style={styles.infoImage} />
//     <View style={styles.infoTextContainer}>
//       <Text style={styles.infoTitle}>{title}</Text>
//     </View>
//   </View>
// );

// Info Section Component
const InfoSection = ({ navigation }) => (
  // <View style={styles.infoSection}>
  //   <InfoCard title="Cultivation Process" imageUrl={cultivationImg} />

  //   <InfoCard title="Crops Diseases Solution" imageUrl={diseasesImg} />
  // </View>

  <View style={styles.educationBoxes}>
    <TouchableOpacity
      style={styles.educationBox}
      onPress={() => navigation.navigate('Bcultivation')} // Replace 'Cultivation' with the actual screen name
    >
      <Image
        source={cultivationImg} // Use the imported image
        style={styles.educationImage}
      />
      <Text style={styles.educationText}>Cultivation Process</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.educationBox}
      onPress={() => navigation.navigate('Bcropsdiseases')} // Replace 'CropDiseases' with the actual screen name
    >
      <Image
        source={diseasesImg} // Use the imported image
        style={styles.educationImage}
      />
      <Text style={styles.educationText}>Crop Diseases Solutions</Text>
    </TouchableOpacity>
  </View>
);

// Bottom Navigation Component
const BottomNav = ({ navigation }) => (
  <View style={styles.fixedNavButtons}>
    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('BDashboard')}>
      <Icon name="home-outline" size={25} color="#43B76A" />
      <Text style={styles.navButtonText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Bnotes')}>
      <Icon name="document-text-outline" size={25} color="#43B76A" />
      <Text style={styles.navButtonText}>Notes</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Bmessage')}>
      <Icon name="book-outline" size={25} color="#43B76A" />
      <Text style={styles.navButtonText}>Education</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Bprofile')}>
      <Icon name="person-outline" size={25} color="#43B76A" />
      <Text style={styles.navButtonText}>Profile</Text>
    </TouchableOpacity>
  </View>
);

// Main Dashboard Screen
const Bmessage = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Header />
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <InfoSection navigation={navigation} />
    </ScrollView>
    <BottomNav navigation={navigation} />
  </SafeAreaView>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContent: {
    paddingBottom: 100, // Space for the bottom navigation
  },
  // heading deducation
  eduction: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 60,
    color: 'black',
  },
 //main Education section
  educationBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10, // Reduced margin to avoid too much space
    elevation: 2,
  },
  educationImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,

  },
  educationText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 9,
    marginLeft: 9,
  },

  // infoSection: {
  //   paddingHorizontal: 20,
  //   marginTop: 20,
  // },
  // infoCard: {
  //   flexDirection: 'row',
  //   backgroundColor: '#fff',
  //   borderRadius: 10,
  //   padding: 10,
  //   marginBottom: 10, // Reduced margin to avoid too much space
  //   elevation: 2,
  // },
  // infoImage: {
  //   width: 100, // Fixed width for the info card image
  //   height: 100, // Fixed height for the info card image
  //   borderRadius: 10,
  //   resizeMode: 'cover',
  //   marginRight: 20,
  // },
  // infoTextContainer: {
  //   flex: 1, // Ensures text takes up remaining space
  //   justifyContent: 'center',
  // },
  // infoTitle: {
  //   fontWeight: 'bold',
  //   fontSize: 16,
  //   marginBottom: 5, // Adds some space between title and description
  // },


  fixedNavButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
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
export default Bmessage;