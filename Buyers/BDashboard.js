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
  { id: '1', name: 'Cauliflower', price: 'Rs 30/kg', imageUrl: imageMap['1'], availableDate: '2024-09-05', farmerName: 'John Doe', phoneNumber: '123-456-7890' },
  { id: '2', name: 'Tomato', price: 'Rs 40/kg', imageUrl: imageMap['2'], availableDate: '2024-09-06', farmerName: 'Jane Smith', phoneNumber: '098-765-4321' },
  { id: '3', name: 'Brinjal', price: 'Rs 80/kg', imageUrl: imageMap['3'], availableDate: '2024-09-07', farmerName: 'Emily Brown', phoneNumber: '111-222-3333' },
  { id: '4', name: 'Potato', price: 'Rs 60/kg', imageUrl: imageMap['4'], availableDate: '2024-09-08', farmerName: 'Michael Green', phoneNumber: '444-555-6666' },
];

const Header = ({ username }) => (
  <View style={styles.header}>
      <View style={styles.headerText}>
          <Image source={require('./../assets/b.jpeg')} style={styles.profileImage} />
          <View>
              <Text style={styles.greeting}>
                  Hi {username ? username.toString() : 'User'}! 👋
              </Text> 
              <Text style={styles.welcomeText}>Welcome to KISHANI App</Text>
          </View>
      </View>
      <TouchableOpacity>
          <Icon name="notifications-outline" size={30} color="#000" />
      </TouchableOpacity>
  </View>
);


// Product Card Component
const ProductCard = ({ product, navigation }) => (
  <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate('VegetableDetails', { product })}>
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

// Info Card Component (Subtitle Removed)
const InfoCard = ({ title, imageUrl }) => (
  <View style={styles.infoCard}>
    <Image source={imageUrl} style={styles.infoImage} />
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoTitle}>{title}</Text>
    </View>
  </View>
);

// Info Section Component
const InfoSection = ({ navigation }) => (
  <View style={styles.educationSection}>
    <Text style={styles.educationTitle}>Education</Text>
    <View style={styles.educationBoxes}>
      <TouchableOpacity
        style={styles.educationBox}
        onPress={() => navigation.navigate('Bcultivation')} // Replace 'Cultivation' with the actual screen name
      >
        <Image
          source={tomatoImg} // Use the imported image
          style={styles.educationImage}
        />
        <Text style={styles.educationText}>Cultivation Process</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.educationBox}
        onPress={() => navigation.navigate('Bcropsdiseases')} // Replace 'CropDiseases' with the actual screen name
      >
        <Image
          source={tomatoImg} // Use the imported image
          style={styles.educationImage}
        />
        <Text style={styles.educationText}>Crop Diseases Solutions</Text>
      </TouchableOpacity>
    </View>
  </View>
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
      <Icon name="chatbox-ellipses-outline" size={25} color="#43B76A" />
      <Text style={styles.navButtonText}>Message</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Bprofile')}>
      <Icon name="person-outline" size={25} color="#43B76A" />
      <Text style={styles.navButtonText}>Profile</Text>
    </TouchableOpacity>
  </View>
);

// Main Dashboard Screen
const BDashboard = ({ navigation, route }) => {
  const username = route?.params?.username || 'User'; // Fallback to 'User' if not defined
  return (
      <SafeAreaView style={styles.container}>
          <Header username={username} />
          <ScrollView contentContainerStyle={styles.scrollContent}>
              <InfoSection navigation={navigation} />
          </ScrollView>
          <FlatList
              data={products}
              renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.productList}
          />
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
  scrollContent: {
    paddingBottom: 100, // Space for the bottom navigation
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
  },
  productImage: {
    width: 120, // Fixed width for the image
    height: 120, // Fixed height for the image
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  productPrice: {
    fontSize: 12,
    color: '#888',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#43B76A',
    padding: 8,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  educationSection: {
    padding: 20,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    margin: 20,
  },
  educationTitle: {
    fontSize: 18,
    color: '#388E3C',
    fontWeight: 'bold',
    marginBottom: 10,
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
    color: '#388E3C',
  },
  infoCard: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  infoImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  infoTextContainer: {
    justifyContent: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fixedNavButtons: {
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
    fontSize: 12,
    color: '#43B76A',
  },
});

export default BDashboard;
