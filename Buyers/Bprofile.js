import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = ({ navigation, route }) => {
  const { profileImage, userName = 'UserName', email = 'user@example.com' } = route.params || {};

  const handleLogout = () => {
    // Perform any logout logic here, such as clearing tokens or user data
    navigation.replace('GetStarted'); // Use replace to prevent going back to the Profile screen
  };

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
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
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
          <Icon name="book-outline" size={25} color="#43B76A" />
          <Text style={styles.navButtonText}>Education</Text>
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
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
  },
  userName: {
    fontSize: 16,
    color: '#555555',
    marginTop: -10,
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
