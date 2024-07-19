import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Dashboard = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Welcome [User's Name]👋!</Text>
          <Text style={styles.subHeaderText}>Welcome to KISHANI APP</Text>
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <Icon name="notifications-outline" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {/* Your content goes here */}
      </View>
      <View style={styles.navButtons}>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Dashboard')} // Change 'Dashboard' to the correct screen name if different
        >
          <Icon name="home-outline" size={25} color="#6200EE" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Notes')} // Change 'Notes' to the correct screen name
        >
          <Icon name="document-text-outline" size={25} color="#6200EE" />
          <Text style={styles.navButtonText}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Message')} // Change 'Message' to the correct screen name
        >
          <Icon name="chatbox-ellipses-outline" size={25} color="#6200EE" />
          <Text style={styles.navButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')} // Change 'Profile' to the correct screen name
        >
          <Icon name="person-outline" size={25} color="#6200EE" />
          <Text style={styles.navButtonText}>Profile</Text>
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
    backgroundColor: '#6200EE',
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
});

export default Dashboard;
