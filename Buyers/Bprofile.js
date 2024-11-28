import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native'

const B_profile = ({ navigation}) => {
  const route = useRoute();
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      const name = await AsyncStorage.getItem('buyerFullName');
      const email = await AsyncStorage.getItem('buyerEmail');
      const image = await AsyncStorage.getItem('profileImage'); // Optional

      setBuyerName(name || 'User Name');
      setBuyerEmail(email || 'user@example.com');
      setProfileImage(image || null); // Image can be null
    };

    fetchUserData();
  }, []);


  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel', 
        },
        {
          text: 'Logout',
          style: 'destructive', 
          onPress: async () => {
            await AsyncStorage.clear(); 
            navigation.replace('GetStarted'); // Redirect to the GetStarted screen
          },
        },
      ],
      { cancelable: true }
    );
  };



  const isActive = (screen) => route.name === screen;



  return (
    <View style={styles.container}>
      {/* Profile Image and Details Section */}
      <View style={styles.imageSection}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Icon name="person-circle-outline" size={150} color="#43B76A" />
        )}
        <View style={styles.userInfoRow}>
          <Text style={styles.userName}>{buyerName}</Text>
          <Text style={styles.userEmail}>{buyerEmail}</Text>
        </View>
      </View>

      {/* Personal Information Section */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => navigation.navigate('BpersonalDetails')}
      >
        <Icon name="person-circle-outline" size={40} color="#43B76A" />
        <Text style={styles.sectionButtonText}>Personal Information</Text>
      </TouchableOpacity>

      {/* Favorites Section */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => navigation.navigate('Bfav')}
      >
        <Icon name="heart-outline" size={30} color="#FF6347" />
        <Text style={styles.sectionButtonText}>Favourites</Text>
      </TouchableOpacity>

      {/* History Section */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => navigation.navigate('Bhistory')}
      >
        <Icon name="time-outline" size={30} color="#649CB4" />
        <Text style={styles.sectionButtonText}>History</Text>
      </TouchableOpacity>

      {/* Settings Section */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => navigation.navigate('Bsetting')}
      >
        <Icon name="settings-outline" size={30} color="#43B76A" />
        <Text style={styles.sectionButtonText}>Settings</Text>
      </TouchableOpacity>

      {/* Privacy Policy Section */}
      <TouchableOpacity
        style={styles.sectionButton}
        onPress={() => navigation.navigate('BprivacyPolicy')}
      >
        <Icon name="lock-closed-outline" size={30} color="#43B76A" />
        <Text style={styles.sectionButtonText}>Privacy Policy</Text>
      </TouchableOpacity>

      {/* Logout Section */}
      <TouchableOpacity style={styles.sectionButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={30} color="#FF6347" />
        <Text style={styles.sectionButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Navigation Bar */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('BDashboard')}
        >
          <Icon
            name={isActive('BDashboard') ? 'home' : 'home-outline'}
            size={25}
            color={isActive('BDashboard') ? '#43B76A' : '#000'}
          />
          <Text style={[styles.navButtonText, isActive('BDashboard') && styles.activeNavText]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Bnotes')}
        >
          <Icon
            name={isActive('Bnotes') ? 'document-text' : 'document-text-outline'}
            size={25}
            color={isActive('Bnotes') ? '#43B76A' : '#000'}
          />
          <Text style={[styles.navButtonText, isActive('Bnotes') && styles.activeNavText]}>
            Notes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Bmessage')}
        >
          <Icon
            name={isActive('Bmessage') ? 'book' : 'book-outline'}
            size={25}
            color={isActive('Bmessage') ? '#43B76A' : '#000'}
          />
          <Text style={[styles.navButtonText, isActive('Bmessage') && styles.activeNavText]}>
            Education
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Bprofile')}
        >
          <Icon
            name={isActive('Bprofile') ? 'person' : 'person-outline'}
            size={25}
            color={isActive('Bprofile') ? '#43B76A' : '#000'}
          />
          <Text style={[styles.navButtonText, isActive('Bprofile') && styles.activeNavText]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align the profile section content to the top
    backgroundColor: '#FFFFFF',

    paddingBottom: 70, // Add enough space for the bottom navigation

  },
  imageSection: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    marginTop: 60,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfoRow: {

    flexDirection: 'column',
    justifyContent: 'center',

    alignItems: 'center',
    width: '90%',
    marginTop: 10,
  },
  userName: {
    fontSize: 16,
    color: '#555555',

    fontWeight: 'bold',

  },
  userEmail: {
    fontSize: 16,
    color: '#555555',
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 10,

    marginTop: 10, // Adjust margin for spacing

  },
  sectionButtonText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#000000',
  },
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


export default B_profile;
