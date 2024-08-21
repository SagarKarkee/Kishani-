import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


// **Header section***
const BDashboard = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Image
            source={require('./../assets/buyers.png')} // replace with your image path
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.greeting}>Hi Aasis! 👋</Text>
            <Text style={styles.welcomeText}>Welcome to KISHANI App</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="notifications-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
// **Product Listing Section**



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // marginBottom: 20,
    width: '100%',
    padding: 20,
    backgroundColor: '#43B76A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 40,
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
});

export default BDashboard;
