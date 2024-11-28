import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const B_vegetableDetails = ({ route }) => {
  const { product } = route.params;
  const navigation = useNavigation();
  const [isFavorited, setIsFavorited] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Popup visibility state
  const [quantity, setQuantity] = useState(''); // Quantity input state

  const toggleFavorite = async () => {
    setIsFavorited(!isFavorited);

    try {
      let favorites = await AsyncStorage.getItem('favorites');
      favorites = favorites ? JSON.parse(favorites) : [];

      if (!isFavorited) {
        favorites.push(product); // Add to favorites
      } else {
        favorites = favorites.filter((item) => item.name !== product.name); // Remove from favorites
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      Alert.alert('Success', isFavorited ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      console.error('Error managing favorites:', error);
    }
  };

  const callNow = () => {
    const phoneNumber = `tel:${product.phoneNumber}`;
    Linking.openURL(phoneNumber).catch((err) => console.error('Error making call:', err));
  };

  const handleOrder = () => {
    if (!quantity) {
      Alert.alert('Error', 'Please enter a quantity to order.');
      return;
    }

    setModalVisible(false);
    Alert.alert(
      'Order Placed',
      `You have successfully ordered ${quantity} of ${product.name}.`
    );
    setQuantity(''); // Reset quantity input
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
      <Text style={styles.Quantity}>{product.Quantity}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.productInfo}>Available Date: {product.availableDate}</Text>
      <Text style={styles.productInfo}>Farmer Name: {product.farmerName}</Text>
      <Text style={styles.productInfo}>Phone Number: {product.phoneNumber}</Text>

      {/* Order Now button */}
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Order NOW</Text>
      </TouchableOpacity>

      {/* Call Now button */}
      <TouchableOpacity style={styles.button} onPress={callNow}>
        <Text style={styles.buttonText}>CALL NOW</Text>
      </TouchableOpacity>

      {/* Popup Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Handles back button on Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Order Quantity</Text>
            <Text style={styles.modalText}>
              Enter the quantity of {product.name} you would like to order:
            </Text>

            {/* Input for Quantity */}
            <TextInput
              style={styles.input}
              placeholder="Enter quantity"
              keyboardType="numeric"
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleOrder}
              >
                <Text style={styles.modalButtonText}>Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    zIndex: 10,
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
  Quantity: {
    fontSize: 20,
    color: '#666',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#d9534f',
  },
  confirmButton: {
    backgroundColor: '#5cb85c',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default B_vegetableDetails;
