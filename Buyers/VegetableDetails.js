// VegetableDetails.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const B_vegetableDetails = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={product.imageUrl} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.productInfo}>Available Date: {product.availableDate}</Text>
      <Text style={styles.productInfo}>Farmer Name: {product.farmerName}</Text>
      <Text style={styles.productInfo}>Phone Number: {product.phoneNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius: 75,
    marginTop:40,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#666',
    marginBottom: 20,
  },
  productInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});

export default B_vegetableDetails;
