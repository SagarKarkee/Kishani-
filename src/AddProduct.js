import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const AddProduct = ({ navigation, route }) => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    if (route.params?.selectedVegetable) {
      setProductName(route.params.selectedVegetable);
    }
  }, [route.params?.selectedVegetable]);

  const handleAddButtonPress = () => {
    navigation.navigate('SelectVegetable');
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDate(moment(selectedDate).format('YYYY-MM-DD')); // Format the date as needed
    hideDatePicker();
  };

  const handleSubmit = () => {
    if (!productName || !quantity || !price || !date) {
      Alert.alert('Validation Error', 'Please fill all the fields.');
      return;
    }

    setProductDetails({
      productName,
      quantity,
      price,
      date,
      imageUri: 'https://example.com/product-image.jpg' // Replace with actual image URI
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Your Crops</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputWithIcon}>
          <TextInput
            style={styles.product}
            placeholder="Product Name"
            value={productName}
            onChangeText={setProductName}
          />
          <TouchableOpacity style={styles.iconButton} onPress={handleAddButtonPress}>
            <Icon name="add" size={30} color="#247A0E" />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />
        <TouchableOpacity style={styles.input} onPress={showDatePicker}>
          <Text style={styles.dateText}>{date || 'Available Date'}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {productDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Product Details:</Text>
          <Text style={styles.detailsText}>Name: {productDetails.productName}</Text>
          <Text style={styles.detailsText}>Quantity: {productDetails.quantity}</Text>
          <Text style={styles.detailsText}>Price: {productDetails.price}</Text>
          <Text style={styles.detailsText}>Available Date: {productDetails.date}</Text>
          <Image source={{ uri: productDetails.imageUri }} style={styles.image} />
        </View>
      )}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  inputContainer: {
    backgroundColor: '#43B76A',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  product: {
    height: 40,
    paddingHorizontal: 10,
    flex: 1, // Adjust to fill remaining space
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10, // Add margin to space out inputs
  },
  dateText: {
    lineHeight: 40, // Center the text vertically
    color: '#000', // Text color for the date input
  },
  iconButton: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#247A0E',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  detailsContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default AddProduct;
