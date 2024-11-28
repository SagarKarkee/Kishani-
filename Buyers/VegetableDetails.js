import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const B_vegetableDetails = ({ route }) => {
  const { product } = route.params;
  const navigation = useNavigation();
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = async () => {
    setIsFavorited(!isFavorited);

    try {
      let favorites = await AsyncStorage.getItem('favorites');
      favorites = favorites ? JSON.parse(favorites) : [];

      if (!isFavorited) {
        // Add to favorites
        favorites.push(product);
      } else {
        // Remove from favorites
        favorites = favorites.filter(item => item.name !== product.name);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      Alert.alert('Success', isFavorited ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      console.error('Error managing favorites:', error);
    }
  };

  const BuyNow = () => {
    navigation.navigate('khalti'); // Update with your actual screen name
  };

  const callNow = () => {
    const phoneNumber = `tel:${product.phoneNumber}`;
    Linking.openURL(phoneNumber).catch(err =>
      console.error('Error making call:', err)
    );
  };

  return (
    <View style={styles.container}>
      {/* Favorite Icon */}
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteIcon}>
        <Icon
          name={isFavorited ? 'heart' : 'heart-outline'}
          size={30}
          color={isFavorited ? 'red' : 'gray'}
        />
      </TouchableOpacity>

      <Image source={product.imageUrl} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.productInfo}>Available Date: {product.availableDate}</Text>
      <Text style={styles.productInfo}>Farmer Name: {product.farmerName}</Text>
      <Text style={styles.productInfo}>Phone Number: {product.phoneNumber}</Text>

      <TouchableOpacity style={styles.button} onPress={BuyNow}>
        <Text style={styles.buttonText}>Book NOW</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={callNow}>
        <Text style={styles.buttonText}>CALL NOW</Text>
      </TouchableOpacity>
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
  favoriteIcon: {
    position: 'absolute',
    top: 80,
    right: 25,
    zIndex: 10, // Ensures the icon is on top
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 30,
    borderRadius: 75,
    marginTop: 40,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
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
  button: {
    backgroundColor: '#43B76A',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default B_vegetableDetails;
