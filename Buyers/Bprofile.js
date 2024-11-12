import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = ({ navigation, route }) => {
  const { profileImage } = route.params || {};

  const handleLogout = () => {
    // Perform any logout logic here, such as clearing tokens or user data
    // For example, AsyncStorage.clear(), if you're using AsyncStorage to store the session
    // Then navigate to the Login screen
    navigation.replace('Login'); // Use replace to prevent going back to the Profile screen
  };

  return (
    <View style={styles.container}>
      {/* Profile Image Section */}
      <View style={styles.imageSection}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Icon name="person-circle-outline" size={150} color="#43B76A" />
        )}
      </View>

      {/* Profile Information Section */}
      <TouchableOpacity 
        style={styles.profileInfoSection}
        onPress={() => navigation.navigate('PersonelDetails')}
      >
        <Icon name="person-circle-outline" size={40} color="#43B76A" />
        <View style={styles.profileInfoTextContainer}>
          <Text style={styles.profileInfoTitle}>Personal Information</Text>
        </View>
        <Icon name="chevron-forward-outline" size={25} color="#43B76A" />
      </TouchableOpacity>

      {/* Settings Section */}
      <TouchableOpacity style={styles.sectionButton}>
        <Icon name="settings-outline" size={25} color="#43B76A" />
        <Text style={styles.sectionButtonText}>Settings</Text>
      </TouchableOpacity>

      {/* Privacy Policy Section */}
      <TouchableOpacity style={styles.sectionButton}>
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
          onPress={() => navigation.navigate('BDashboard')}
        >
          <Icon name="home-outline" size={25} color="#43B76A" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Bnotes')}
        >
          <Icon name="document-text-outline" size={25} color="#43B76A" />
          <Text style={styles.navButtonText}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Bmessage')}
        >
          <Icon name="chatbox-ellipses-outline" size={25} color="#43B76A" />
          <Text style={styles.navButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Bprofile')}
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
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 10,
  },
  profileInfoTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  profileInfoTitle: {
    fontSize: 18,
    color: '#000000',
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 10,
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
