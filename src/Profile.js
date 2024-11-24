import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  // Load user details from AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      const name = await AsyncStorage.getItem('userFullName');
      const email = await AsyncStorage.getItem('userEmail');
      const image = await AsyncStorage.getItem('profileImage'); // Optional

      setUserName(name || 'User Name');
      setUserEmail(email || 'user@example.com');
      setProfileImage(image || null); // Image can be null
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear(); 
    navigation.replace('Accounttype'); 
  };


  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <View style={styles.imageSection}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Icon name="person-circle-outline" size={150} color="#43B76A" />
        )}
        {/* User Info Row */}
        <View style={styles.userInfoRow}>
          <Text style={styles.userName}>{userName || 'UserName'}</Text>
          <Text style={styles.userEmail}>{userEmail || 'user@example.com'}</Text>
        </View>
      </View>

      {/* Profile Information Section */}
      <TouchableOpacity style={styles.sectionButton}
        onPress={() => navigation.navigate('PersonelDetails')}
      >
        <Icon name="person-circle-outline" size={40} color="#43B76A" />
        <Text style={styles.sectionButtonText}>Personal Information</Text>
      </TouchableOpacity>

      {/* Settings Section */}
      <TouchableOpacity style={styles.sectionButton}
        onPress={() => navigation.navigate('Setting')}>
        <Icon name="settings-outline" size={25} color="#43B76A" />
        <Text style={styles.sectionButtonText}>Settings</Text>
      </TouchableOpacity>

      {/* Privacy Policy Section */}
      <TouchableOpacity style={styles.sectionButton}
        onPress={() => navigation.navigate('PrivacyPolicy')}>
        <Icon name="lock-closed-outline" size={25} color="#43B76A" />
        <Text style={styles.sectionButtonText}>Privacy Policy</Text>
      </TouchableOpacity>

      {/* Logout Section */}
      <TouchableOpacity style={styles.sectionButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={25} color="#FF6347" />
        <Text style={styles.sectionButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Navigation Bar */}
      <View style={styles.navButtons}>
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
          <Icon name="book-outline" size={25} color="#43B76A" />
          <Text style={styles.navButtonText}>Education</Text>
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
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingBottom: 0,
  },
  imageSection: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    marginTop: 60,
    // marginBottom: -200,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  userInfoRow: {
    flexDirection: 'colume',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
  },
  userName: {
    fontSize: 16,
    color: '#555555',

    marginTop: -10,
    alignItems: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: '#555555',
    // textAlign: 'center',
    alignItems: 'center',
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 10,
    marginTop: -190,
  },
  sectionButtonText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#000000',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
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

export default Profile;
