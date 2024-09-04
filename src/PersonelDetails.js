import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const PersonalDetailsForm = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = () => {
    // Validation logic
    if (!fullName || !address || !phoneNumber) {
      Alert.alert('Error', 'All fields must be filled out.');
      return;
    }

    // Handle the form submission logic here
    console.log('Full Name:', fullName);
    console.log('Address:', address);
    console.log('Phone Number:', phoneNumber);
    console.log('Image URI:', imageUri);

    // Navigate back to Profile screen
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Details</Text>
      
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.imageText}>Upload Image</Text>
          </View>
        )}
      </TouchableOpacity>
      
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#43B76A',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    marginTop: 20,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 40,
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFDFDF',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageText: {
    fontSize: 18,
    color: '#888',
  },
  input: {
    height: 40,
    borderColor: 'black',
    backgroundColor: '#DFDFDF',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default PersonalDetailsForm;
