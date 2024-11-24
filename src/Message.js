import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

// Import images from assets folder
import cultivationImg from './../assets/Cul-1.jpeg';
import diseasesImg from './../assets/dis.jpeg';
import diseaseImg from './../assets/cul-2.jpeg';



// Header Component
const Header = () => (

  <View>
    <Text style={styles.eduction}>Education Section</Text>
  </View>

);


// Info Section Component
const InfoSection = ({ navigation }) => (
  // <View style={styles.infoSection}>
  //   <InfoCard title="Cultivation Process" imageUrl={cultivationImg} />

  //   <InfoCard title="Crops Diseases Solution" imageUrl={diseasesImg} />
  // </View>

  <View style={styles.educationBoxes}>
    <TouchableOpacity
      style={styles.educationBox}
      onPress={() => navigation.navigate('Cultivation')} // Replace 'Cultivation' with the actual screen name
    >
      <Image
        source={cultivationImg} // Use the imported image
        style={styles.educationImage}
      />
      <Text style={styles.educationText}>Cultivation Process</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.educationBox}
      onPress={() => navigation.navigate('Cropsdiseases')} // Replace 'CropDiseases' with the actual screen name
    >
      <Image
        source={diseasesImg} // Use the imported image
        style={styles.educationImage}
      />
      <Text style={styles.educationText}>Crop Diseases Solutions</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.educationBox}
      onPress={() => navigation.navigate('BBbcropDiseases')} // Replace 'CropDiseases' with the actual screen name
    >
      <Image
        source={diseaseImg} // Use the imported image
        style={styles.educationImage}
      />
      <Text style={styles.educationText}>Crop Diseases Solutions</Text>
    </TouchableOpacity>
  </View>
);

// Bottom Navigation Component
const BottomNav = ({ navigation }) => {
  const route = useRoute();

  const isActive = (screen) => route.name === screen;

  return (
    <View style={styles.navButtons}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Icon
          name={isActive('Dashboard') ? 'home' : 'home-outline'}
          size={25}
          color={isActive('Dashboard') ? '#43B76A' : '#000'}
        />
        <Text style={[styles.navButtonText, isActive('Dashboard') && styles.activeNavText]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Notes')}
      >
        <Icon
          name={isActive('Notes') ? 'document-text' : 'document-text-outline'}
          size={25}
          color={isActive('Notes') ? '#43B76A' : '#000'}
        />
        <Text style={[styles.navButtonText, isActive('Notes') && styles.activeNavText]}>
          Notes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Message')}
      >
        <Icon
          name={isActive('Message') ? 'book' : 'book-outline'}
          size={25}
          color={isActive('Message') ? '#43B76A' : '#000'}
        />
        <Text style={[styles.navButtonText, isActive('Message') && styles.activeNavText]}>
          Education
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Icon
          name={isActive('Profile') ? 'person' : 'person-outline'}
          size={25}
          color={isActive('Profile') ? '#43B76A' : '#000'}
        />
        <Text style={[styles.navButtonText, isActive('Profile') && styles.activeNavText]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};




// Main Dashboard Screen
const Message = ({ navigation }) => (
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
    fontSize: 15,
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


  navButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    elevation: 5,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    marginTop: 5,
    color: '#6200EE',
    fontSize: 14,
  },

  activeNavText: {
    color: '#43B76A',
    fontWeight: 'bold',
  },
});
export default Message;