import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // For back arrow icon

const B_personal = ({ navigation }) => {
    const [imageUri, setImageUri] = useState(null);
    const [userName, setUserName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [citizenshipNumber, setCitizenshipNumber] = useState('');

    const [isSaved, setIsSaved] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    const handleSubmit = () => {
        // Validation logic
        if (!userName || !address || !phoneNumber || !citizenshipNumber || imageUri) {
            Alert.alert('Error', 'All fields must be filled out.');
            return;
        }

        // Handle the form submission logic here
        console.log('User Name:', userName);
        console.log('Address:', address);
        console.log('Phone number:', phoneNumber);
        console.log('Citizenship number:', citizenshipNumber);
        console.log('Image URI:', imageUri);

        // Simulate saving the data
        setIsSaved(true);
        setModalVisible(true);
    };

    const handleLoginNavigation = () => {
        setModalVisible(false);
        navigation.navigate('Bprofile'); // Ensure you have a route named 'Login'
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
                placeholder="Citizenship Number"
                value={citizenshipNumber}
                onChangeText={setCitizenshipNumber}
                keyboardType="phone-pad"
            />

            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
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
                        <Text style={styles.successMessage}>Your account is successfully Update.</Text>
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
        // fontSize: 24,
        // fontWeight: 'bold',
        // marginBottom: 50,
        // textAlign: 'center',
        // marginTop: 30,
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
