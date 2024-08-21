
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Import images from assets folder
import cauliflowerImg from './../assets/cauliflower.jpeg';
import tomatoImg from './../assets/tomato.jpg';
import brinjalImg from './../assets/brinjal.jpg';
import potatoImg from './../assets/potato.jpg';
import cultivationImg from './../assets/tomato-1.png';
import diseasesImg from './../assets/tomato-2.png';
// import { red } from 'react-native-reanimated/lib/typescript/Colors';

// Dummy product data
const imageMap = {
  '1': cauliflowerImg,
  '2': tomatoImg,
  '3': brinjalImg,
  '4': potatoImg,
};

const products = [
  { id: '1', name: 'Cauliflower', price: 'Rs 30/kg', imageUrl: imageMap['1'] },
  { id: '2', name: 'Tomato', price: 'Rs 40/kg', imageUrl: imageMap['2'] },
  { id: '3', name: 'Brinjal', price: 'Rs 80/kg', imageUrl: imageMap['3'] },
  { id: '4', name: 'Potato', price: 'Rs 60/kg', imageUrl: imageMap['4'] },
];

// Header Component
const Header = () => {
  return (
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
  );
};

// Product Card Component
const ProductCard = ({ product }) => (
  <View style={styles.productCard}>
    <Image source={product.imageUrl} style={styles.productImage} />
    <Text style={styles.productName}>{product.name}</Text>
    <Text style={styles.productPrice}>{product.price}</Text>
    <TouchableOpacity style={styles.addButton}>
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  </View>
);

// Product List Component
const ProductList = () => (
  <FlatList
    data={products}
    renderItem={({ item }) => <ProductCard product={item} />}
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

// Main Dashboard Screen
const BDashboard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <ProductList />
        <InfoSection />
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
  // productList: {
  //   paddingBottom: 0,
  //   paddingHorizontal: 20,
  //   paddingTop: 20,
  // },
  // row: {
  //   justifyContent: 'space-between',
  // },
  // productCard: {
  //   width: '48%',
  //   backgroundColor: '#D3D3D3',
  //   borderRadius: 10,
  //   padding: 10,
  //   marginBottom: 15,
  //   alignItems: 'center',
  // },
  // productImage: {
  //   width: 80,
  //   height: 80,
  //   marginBottom: 10,

  // },
  // productName: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  // productPrice: {
  //   fontSize: 14,
  //   color: '#666',
  //   marginBottom: 10,
  // },
  // addButton: {
  //   backgroundColor: '#4CAF50',
  //   paddingVertical: 5,
  //   paddingHorizontal: 10,
  //   borderRadius: 5,
  // },
  // addButtonText: {
  //   color: '#fff',
  //   fontSize: 20,
  // },
  // infoSection: {
  //   marginTop: 1,
  //   paddingHorizontal: 20,
  // },
  // infoCard: {
  //   flexDirection: 'row',
  //   backgroundColor: '#D3D3D3',
  //   borderRadius: 10,
  //   padding: 10,
  //   marginBottom: 15,
  //   alignItems: 'center',
  // },
  // infoImage: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 10,
  //   marginRight: 10,
  // },
  // infoTitle: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  // infoDescription: {
  //   fontSize: 12,
  //   color: '#666',
  //   width: 250,
  // },


  productCard: {
    width: '44%', // Adjusts for spacing between items
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
  // addToCartButton: {
  //   width: 30,
  //   height: 30,
  //   backgroundColor: '#48a868',
  //   color: 'white',
  //   borderRadius: 4,
  //   justifyContent: 'center',
  //   alignItems: 'center',
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

});

export default BDashboard;
