// BDashboard.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Import images from assets folder
import cauliflowerImg from './../assets/cauliflower.jpeg';
import tomatoImg from './../assets/tomato.jpg';
import brinjalImg from './../assets/brinjal.jpg';
import potatoImg from './../assets/potato.jpg';
import cultivationImg from './../assets/tomato.jpg';
import diseasesImg from './../assets/tomato.jpg';

const imageMap = {
  '1': cauliflowerImg,
  '2': tomatoImg,
  '3': brinjalImg,
  '4': potatoImg,
};

const products = [
  {
    id: '1',
    name: 'Cauliflower',
    price: 'Rs 30/kg',
    imageUrl: imageMap['1'],
    availableDate: '2024-09-05',
    farmerName: 'John Doe',
    phoneNumber: '123-456-7890'
  },
  {
    id: '2',
    name: 'Tomato',
    price: 'Rs 40/kg',
    imageUrl: imageMap['2'],
    availableDate: '2024-09-06',
    farmerName: 'Jane Smith',
    phoneNumber: '098-765-4321'
  },
  {
    id: '3',
    name: 'Brinjal',
    price: 'Rs 80/kg',
    imageUrl: imageMap['3'],
    availableDate: '2024-09-07',
    farmerName: 'Emily Brown',
    phoneNumber: '111-222-3333'
  },
  {
    id: '4',
    name: 'Potato',
    price: 'Rs 60/kg',
    imageUrl: imageMap['4'],
    availableDate: '2024-09-08',
    farmerName: 'Michael Green',
    phoneNumber: '444-555-6666'
  },
];

// Header Component
const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerText}>
        <Image
          source={require('./../assets/b.jpeg')}
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
  );
};

// Product Card Component
const ProductCard = ({ product, navigation }) => (
  <TouchableOpacity
    style={styles.productCard}
    onPress={() => navigation.navigate('VegetableDetails', { product })}
  >
    <Image source={product.imageUrl} style={styles.productImage} />
    <Text style={styles.productName}>{product.name}</Text>
    <Text style={styles.productPrice}>{product.price}</Text>
    <TouchableOpacity style={styles.addButton}>
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

// Product List Component
const ProductList = ({ navigation }) => (
  <FlatList
    data={products}
    renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
    keyExtractor={(item) => item.id}
    numColumns={2}
    columnWrapperStyle={styles.row}
    contentContainerStyle={styles.productList}
  />
);

// Info Card Component
const InfoCard = ({ title, description, imageUrl }) => (
  <View style={styles.infoCard}>
    <Image source={imageUrl} style={styles.infoImage} />
    <View>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoDescription}>{description}</Text>
    </View>
  </View>
);

// Info Section Component
const InfoSection = () => (
  <View style={styles.infoSection}>
    <InfoCard
      title="Cultivation Process"
      description="Tomato Cultivation: Tomatoes are warm and sun-loving ..."
      imageUrl={cultivationImg}
    />

    <InfoCard
      title="Crops Diseases Solution"
      description="Tomato Diseases: Our guide to the most common tomato ..."
      imageUrl={diseasesImg}
    />
  </View>
);
//bottom Nav component
const BottomNav = () => (
  <View style={styles.navButtons}>
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => navigation.navigate('BDashboard')} // Change 'Dashboard' to the correct screen name if different
    >
      <Icon name="home-outline" size={25} color="#6200EE" />
      <Text style={styles.navButtonText}>Home</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => navigation.navigate('Bnotes')} // Change 'Notes' to the correct screen name
    >
      <Icon name="document-text-outline" size={25} color="#6200EE" />
      <Text style={styles.navButtonText}>Notes</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => navigation.navigate('Bmessage')} // Change 'Message' to the correct screen name
    >
      <Icon name="chatbox-ellipses-outline" size={25} color="#6200EE" />
      <Text style={styles.navButtonText}>Message</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.navButton}
      onPress={() => navigation.navigate('Bprofile')} // Change 'Profile' to the correct screen name
    >
      <Icon name="person-outline" size={25} color="#6200EE" />
      <Text style={styles.navButtonText}>Profile</Text>
    </TouchableOpacity>
  </View>
);

// Main Dashboard Screen
const BDashboard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <ProductList navigation={navigation} />
        <InfoSection />
        <BottomNav />
      </ScrollView>
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
  productList: {
    paddingBottom: 0,
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '44%',
    padding: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 2,
    marginTop: -10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  infoSection: {
    marginTop: 1,
    paddingHorizontal: 20,
  },
  infoCard: {
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  infoImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  infoDescription: {
    fontSize: 12,
    color: '#666',
    width: 250,
  },
  //Bottom Nav
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
    fontSize: 15,
  },
});

export default BDashboard;
