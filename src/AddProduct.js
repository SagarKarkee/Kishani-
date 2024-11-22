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
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [productId, setProductId] = useState(null);  // To store the product ID when editing

  useEffect(() => {
    if (route.params?.selectedVegetable) {
      setProductName(route.params.selectedVegetable);
    }
    fetchProducts();  // Load products on page load
  }, [route.params?.selectedVegetable]);

  // Function to fetch products from the database
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://192.168.1.91:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

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
    setDate(moment(selectedDate).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const handleSubmit = async () => {
    if (!productName || !quantity || !price || !date) {
      Alert.alert('Validation Error', 'Please fill all the fields.');
      return;
    }

    const newProduct = {
      productName,
      quantity,
      price,
      date,
      imageUri: 'https://example.com/product-image.jpg', // Update with actual image URI if available
    };

    try {
      if (editingIndex !== null) {
        // Update product in the database
        const response = await axios.put(`http://192.168.1.91:5000/update-product/${productId}`, newProduct);
        Alert.alert('Success', response.data.message);
      } else {
        // Add new product to the database
        const response = await axios.post('http://192.168.1.91:5000/addProduct', newProduct);
        Alert.alert('Success', response.data.message);
      }

      // Fetch the updated product list
      fetchProducts();

      // Clear input fields after submitting
      setProductName('');
      setQuantity('');
      setPrice('');
      setDate('');
      setEditingIndex(null);  // Reset the editing state
      setProductId(null);      // Reset product ID
    } catch (error) {
      console.error('Error adding or updating product:', error);
      Alert.alert('Error', 'Failed to add or update product');
    }
  };

  const handleEdit = (index) => {
    const product = products[index];
    setProductName(product.productName);
    setQuantity(product.quantity);
    setPrice(product.price);
    setDate(product.date);
    setProductId(product._id);  // Assuming the product has an _id field
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    const product = products[index];
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              // Delete product from the database
              const response = await axios.delete(`http://192.168.1.91:5000/delete-product/${product._id}`);
              Alert.alert('Success', response.data.message);

              // Remove product from the local state (UI)
              const updatedProducts = products.filter((_, i) => i !== index);
              setProducts(updatedProducts);
            } catch (error) {
              console.error('Error deleting product:', error);
              Alert.alert('Error', 'Failed to delete product');
            }
          },
        },
      ],
      { cancelable: true }
    );
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
        <Text style={styles.buttonText}>{editingIndex !== null ? 'Update Product' : 'Add Product'}</Text>
      </TouchableOpacity>
      {products.length > 0 && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Product Details:</Text>
          {products.map((product, index) => (
            <View key={index} style={styles.productDetails}>
              <Text style={styles.detailsText}>Name: {product.productName}</Text>
              <Text style={styles.detailsText}>Quantity: {product.quantity}</Text>
              <Text style={styles.detailsText}>Price: {product.price}</Text>
              <Text style={styles.detailsText}>Available Date: {product.date}</Text>
              <Image source={{ uri: product.imageUri }} style={styles.image} />
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={() => handleEdit(index)} style={styles.editButton}>
                  <Icon name="edit" size={25} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
                  <Icon name="delete" size={25} color="#D11A2A" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
    flex: 1,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  dateText: {
    lineHeight: 40,
    color: '#000',
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
  productDetails: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    backgroundColor: '#F9F9F9',
  },
  detailsText: {
    fontSize: 15,
    marginBottom: 5,
    
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    marginRight: 15,
  },
  deleteButton: {},
});

export default AddProduct;
