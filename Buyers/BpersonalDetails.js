import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // For back arrow icon

const API_URL = process.env.API_URL; 

const B_personal = ({ navigation }) => {
    const [imageUri, setImageUri] = useState(null);
    const [userName, setUserName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [citizenshipNumber, setCitizenshipNumber] = useState('');
    const [fullName, setFullName] = useState(''); 
    const [modalVisible, setModalVisible] = useState(false);
    const [isDetailsSaved, setIsDetailsSaved] = useState(false); 

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
              const savedFullName = await AsyncStorage.getItem('buyerFullName');
              if (!savedFullName) {
                console.error('Full Name missing in AsyncStorage');
                return;
              }
              setFullName(savedFullName); // Set the fullName from AsyncStorage
          
              // Get the email from AsyncStorage
              const email = await AsyncStorage.getItem('buyerEmail');
              if (!email) {
                console.error('User email missing in AsyncStorage');
                return;
              }
          
              // Fetch personal details from the backend only if not saved
              const response = await fetch(`${API_URL}/bpersonal-details/${email}`);
              const data = await response.json();
          
              if (response.ok) {
                if (data && data.data) {
                  // If personal details exist, set them
                  setUserName(data.data.userName || '');
                  setAddress(data.data.address || '');
                  setPhoneNumber(data.data.phoneNumber || '');
                  setCitizenshipNumber(data.data.citizenshipNumber || '');
                  setImageUri(data.data.profileImage || null);
                  setIsDetailsSaved(true); // Mark as saved
                }
              } else {
                
                setIsDetailsSaved(false); // Mark as unsaved
                Alert.alert("Please Save your Personal Details");
              }
            } catch (error) {
              console.error('Error fetching user details:', error);
              Alert.alert('Error', 'Failed to fetch user details.');
            }
          };
          
    
        fetchUserDetails();
    }, []);

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
    
        // Validate Nepal citizenship number (12-14 digits without spaces)
        const citizenshipRegex = /^[0-9]{12,14}$/;
        if (!citizenshipRegex.test(citizenshipNumber)) {
            Alert.alert('Error', 'Citizenship number must be between 12 and 14 digits.');
            return;
        }
    
        try {
            const email = await AsyncStorage.getItem('buyerEmail');
            if (!email) {
                Alert.alert('Error', 'User email is missing.');
                return;
            }
    
            const response = await fetch(`${API_URL}/bpersonal-details`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    fullName,  // Don't allow editing fullName
                    userName,
                    address,
                    phoneNumber,
                    citizenshipNumber,
                    profileImage: imageUri || "", // Use empty string if no image
                }),
            });
    
            const data = await response.json();
            if (response.ok) {
                // Save updated details in AsyncStorage
                await AsyncStorage.setItem('buyerFullName', fullName);
                await AsyncStorage.setItem('profileImage', imageUri || ""); // Use empty string if no image
    
                
                setModalVisible(true); // Show confirmation modal
                setIsDetailsSaved(true); // Mark details as saved
            } else {
                Alert.alert('Error', data.message || 'Failed to save personal details.');
            }
        } catch (error) {
            console.error('Error saving personal details:', error);
            Alert.alert('Error', 'Failed to connect to the server.');
        }
    };
    

    const handleLoginNavigation = () => {
        setModalVisible(false);
        navigation.navigate('Bprofile'); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.title}>Personal Details</Text>
            </View>

            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                    <View style={styles.placeholder}>
                        <Text style={styles.imageText}>Upload Image</Text>
                    </View>
                )}
            </TouchableOpacity>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={styles.input}
                value={fullName}
                editable={false} // Full name is not editable
            />
            <Text style={styles.label}>Nickname (Username)</Text>
            <TextInput
                style={styles.input}
                placeholder="Nickname"
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
               editable={!isDetailsSaved} // Allow editing only if details are not saved
            />

            <Button title="Save" onPress={handleSubmit} />

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
        backgroundColor: '#43B76A'
    },
    header: {
        // backgroundColor: '#41B06E', 
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
    successContainer: {
        alignItems: 'center',
    },
    successMessage: {
        fontSize: 18,
        color: 'green',
        marginBottom: 20,
        textAlign: 'center',
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
});


export default B_personal;
