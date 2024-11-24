import React, { useState } from 'react';
import { View,Text,TextInput,Button,Image,StyleSheet,TouchableOpacity,Modal,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { MaterialIcons } from '@expo/vector-icons'; // For back arrow icon

const API_URL = process.env.API_URL; // Ensure environment variable is set
console.log("API URL for Personal Details:", API_URL);

const PersonalDetailsForm = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [citizenshipNumber, setCitizenshipNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Initialize modal visibility state

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = async () => {
    if (!userName || !address || !phoneNumber || !citizenshipNumber) {
      Alert.alert('Error', 'All fields must be filled out.');
      return;
    }

    try {
      const email = await AsyncStorage.getItem('userEmail'); // Fetch email from AsyncStorage
      if (!email) {
        Alert.alert('Error', 'User email is missing.');
        return;
      }

      const response = await fetch(`${API_URL}/personal-details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          fullName: userName,
          address,
          phoneNumber,
          citizenshipNumber,
          profileImage: imageUri,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Save updated details in AsyncStorage for Profile and Dashboard
        await AsyncStorage.setItem('userFullName', userName);
        if (imageUri) {
          await AsyncStorage.setItem('profileImage', imageUri);
        }

        Alert.alert('Success', 'Personal details updated successfully.');
        setModalVisible(true); // Show confirmation modal
      } else {
        Alert.alert('Error', data.message || 'Failed to save personal details.');
      }
    } catch (error) {
      console.error('Error saving personal details:', error);
      Alert.alert('Error', 'Failed to connect to the server.');
    }
  };

  const handleLoginNavigation = () => {
    setModalVisible(false); // Close modal
    navigation.navigate('Profile'); // Navigate back to Profile
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Personal Details</Text>
      </View>

      {/* Profile Image Picker */}
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.imageText}>Upload Image</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={userName}
        onChangeText={setUserName}
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
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Citizenship Number"
        value={citizenshipNumber}
        onChangeText={setCitizenshipNumber}
        keyboardType="number-pad"
      />
      <Button title="Save" onPress={handleSubmit} />

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.successMessage}>
              Your personal details have been updated successfully!
            </Text>
            <Button title="Go Back to Profile" onPress={handleLoginNavigation} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#43B76A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginBottom: 50,
  },
  backButton: {
    padding: 5,
    marginRight: -40,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: -30,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  successMessage: {
    fontSize: 18,
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default PersonalDetailsForm;
