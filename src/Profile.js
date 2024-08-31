// Profile.js

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Empty view or placeholder */}
      <View style={styles.content}>
        <Text style={styles.placeholderText}>Profile Screen Content</Text>
      </View>
      
      {/* Navigation Bar */}
      <View style={styles.navButtons}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Dashboard')} // Change 'Dashboard' to the correct screen name if different
        >
          <Icon name="home-outline" size={25} color="#43B76A" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Notes')} // Change 'Notes' to the correct screen name
        >
          <Icon name="document-text-outline" size={25} color="#43B76A" />
          <Text style={styles.navButtonText}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Message')} // Change 'Message' to the correct screen name
        >
          <Icon name="chatbox-ellipses-outline" size={25} color="#43B76A" />
          <Text style={styles.navButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')} // Change 'Profile' to the correct screen name
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
    justifyContent: 'flex-end', // Ensures the navbar is at the bottom
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Centers the placeholder text
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#000000',
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
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Profile;
