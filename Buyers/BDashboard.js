
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, SafeAreaView, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import images from assets folder
import cauliflowerImg from './../assets/cauliflower.jpeg';
import tomatoImg from './../assets/tomato.jpg';
import brinjalImg from './../assets/brinjal.jpg';
import potatoImg from './../assets/potato.jpg';
import chillyImg from './../assets/chilly-1.jpeg';
import onionImg from './../assets/onion.jpg';
import carrotImg from './../assets/carrot-1.jpeg';
import cabbageImg from './../assets/cabbage.jpeg';
import capssicumImg from './../assets/capssicum.jpeg';
import CarrotImg from './../assets/carrot.jpg';
import ChillyImg from './../assets/chilly.jpg';
import cucumberImg from './../assets/cucumber.jpeg';
import greenchillyImg from './../assets/greenchilly.jpeg';
import radishImg from './../assets/radish-1.jpeg';

const imageMap = {
  '1': cauliflowerImg,
  '2': tomatoImg,
  '3': brinjalImg,
  '4': potatoImg,
  '5': chillyImg,
  '6': onionImg,
  '7': carrotImg,
  '8': cabbageImg,
  '9': capssicumImg,
  '10': CarrotImg,
  '11': ChillyImg,
  '12': cucumberImg,
  '13': greenchillyImg,
  '14': radishImg,
};

const products = [
  { id: '1', name: 'Cauliflower', Quantity:"Quantity 100 kg", price: 'Rs 30/kg', imageUrl: cauliflowerImg, availableDate: '2024-09-05', farmerName: 'John Doe', phoneNumber: '123-456-7890' },
  { id: '2', name: 'Tomato', Quantity:"Quantity 100 kg", price: 'Rs 40/kg', imageUrl: tomatoImg, availableDate: '2024-09-06', farmerName: 'Jane Smith', phoneNumber: '098-765-4321' },
  { id: '3', name: 'Brinjal', Quantity:"Quantity 100 kg", price: 'Rs 80/kg', imageUrl: brinjalImg, availableDate: '2024-09-07', farmerName: 'Emily Brown', phoneNumber: '111-222-3333' },
  { id: '4', name: 'Potato', Quantity:"Quantity 100 kg", price: 'Rs 70/kg', imageUrl: potatoImg, availableDate: '2024-09-02', farmerName: 'Michael Green', phoneNumber: '444-555-6666' },
  { id: '5', name: 'Chilly', Quantity:"Quantity 100 kg", price: 'Rs 90/kg', imageUrl: imageMap['5'], availableDate: '2024-09-03', farmerName: 'Sandip Green', phoneNumber: '444-555-6666' },
  { id: '6', name: 'Onion', Quantity:"Quantity 100 kg", price: 'Rs 30/kg', imageUrl: imageMap['6'], availableDate: '2024-09-04', farmerName: 'Malbik Black', phoneNumber: '444-555-6666' },
  { id: '7', name: 'carrot', Quantity:"Quantity 100 kg", price: 'Rs 20/kg', imageUrl: imageMap['7'], availableDate: '2024-09-05', farmerName: 'Black', phoneNumber: '444-555-6666' },
  { id: '8', name: 'cabbage', Quantity:"Quantity 100 kg", price: 'Rs 90/kg', imageUrl: imageMap['8'], availableDate: '2024-09-01', farmerName: 'Malbik Black', phoneNumber: '444-555-6666' },
  { id: '9', name: 'capssicum', Quantity:"Quantity 100 kg", price: 'Rs 40/kg', imageUrl: imageMap['9'], availableDate: '2024-09-09', farmerName: 'Malbik Black', phoneNumber: '444-555-6666' },
  { id: '10', name: 'Carrot',Quantity:"Quantity 100 kg", price: 'Rs 30/kg', imageUrl: imageMap['10'], availableDate: '2024-09-08', farmerName: 'Malbik Black', phoneNumber: '444-555-6666' },
  { id: '11', name: 'Chilly', Quantity:"Quantity 100 kg", price: 'Rs 20/kg', imageUrl: imageMap['11'], availableDate: '2024-09-07', farmerName: 'Malbik Black', phoneNumber: '444-555-6666' },
  { id: '12', name: 'cucumber', Quantity:"Quantity 100 kg", price: 'Rs 100/kg', imageUrl: imageMap['12'], availableDate: '2024-09-06', farmerName: 'Malbik Black', phoneNumber: '444-555-6666' },
  { id: '13', name: 'greenchilly', Quantity:"Quantity 100 kg", price: 'Rs 60/kg', imageUrl: imageMap['13'], availableDate: '2024-09-02', farmerName: 'Malbik Black', phoneNumber: '444-555-6666' },
  { id: '14', name: 'radish', Quantity:"Quantity 100 kg", price: 'Rs 90/kg', imageUrl: imageMap['14'], availableDate: '2024-09-03', farmerName: 'Malbik Black', phoneNumber: '444-555-6666' },
  { id: '15', name: 'Cauliflower', Quantity:"Quantity 100 kg", price: 'Rs 30/kg', imageUrl: imageMap['1'], availableDate: '2024-09-05', farmerName: 'John Doe', phoneNumber: '123-456-7890' },
  { id: '16', name: 'Tomato', Quantity:"Quantity 100 kg", price: 'Rs 40/kg', imageUrl: imageMap['2'], availableDate: '2024-09-06', farmerName: 'Jane Smith', phoneNumber: '098-765-4321' },
  { id: '17', name: 'Cauliflower', Quantity:"Quantity 100 kg", price: 'Rs 30/kg', imageUrl: cauliflowerImg, availableDate: '2024-09-05', farmerName: 'John Doe', phoneNumber: '123-456-7890' },
  { id: '13', name: 'greenchilly', Quantity:"Quantity 100 kg", price: 'Rs 60/kg', imageUrl: imageMap['13'], availableDate: '2024-09-02', farmerName: 'Malbik Black', phoneNumber: '444-555-6666' },
  // Add more products here as needed
];

// Header Component

const Header = ({ username, navigation }) => (
  <View style={styles.header}>
    <View style={styles.headerText}>
      <Image source={require('./../assets/b.jpeg')} style={styles.profileImage} />
      <View>
        <Text style={styles.greeting}>Hi {username ? username.toString() : 'User'}! 👋</Text>
        <Text style={styles.welcomeText}>Welcome to KISHANI App</Text>
      </View>
    </View>
    <TouchableOpacity onPress={() => navigation.navigate('Bnotification')}>
      <Icon name="notifications-outline" size={30} color="#000" />
    </TouchableOpacity>
  </View>
);

// Product Card Component
const ProductCard = ({ product, navigation }) => (
  <TouchableOpacity
    style={styles.productCard}
    onPress={() => navigation.navigate('VegetableDetails', { product })}
  >
    <Image source={product.imageUrl} style={styles.productImage} />
    <Text style={styles.productName}>{product.name}</Text>
    <Text style={styles.Quantity}>{product.Quantity}</Text>
    <Text style={styles.productPrice}>{product.price}</Text>
  </TouchableOpacity>
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
const BDashboard = ({ navigation }) => {
  const [buyerName, setBuyerName] = useState('User');
  const [searchQuery, setSearchQuery] = useState('');
  // const username = route?.params?.username || 'User'; // Fallback to 'User' if not defined

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    const loadUserData = async () => {
      const storedName = await AsyncStorage.getItem('buyerFullName');
      const storedEmail = await AsyncStorage.getItem('buyerEmail');

      if (storedName) setBuyerName(storedName);
      if (!storedName || !storedEmail) {
        console.error('User data missing in AsyncStorage');
      }
    };

    loadUserData();
  }, []);

  
  return (
    <SafeAreaView style={styles.container}>
      <Header username={buyerName} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for products"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.productList}
      />
        {/* <InfoSection navigation={navigation} /> */}
      </ScrollView>

      <BottomNav navigation={navigation} />
    </SafeAreaView>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    
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
    marginBottom: 10,
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
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  productList: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
    // marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    
    marginBottom: 10,
    resizeMode: 'contain'
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  Quantity:{
    fontSize: 20,
    color: '#666',
    marginBottom: 10,
  },
  Quantity:{
    fontSize: 12,
    color: '#666',
    marginBottom: 7,
    textAlign: 'center',
    marginTop: 3,
  },
  productPrice: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },

  educationBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  educationBox: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 3,
  },
  educationImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  educationText: {
    fontSize: 14,
    color: 'black',
  },

  fixedNavButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 12,
    color: '#43B76A',
  },
});

export default BDashboard;
