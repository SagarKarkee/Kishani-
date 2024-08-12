import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const BPersonalDetailsForm = ({ navigation }) => {
    const [imageUri, setImageUri] = useState(null);
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
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
        if (!fullName || !address || !phoneNumber || imageUri) {
            Alert.alert('Error', 'All fields must be filled out.');
            return;
        }

        // Handle the form submission logic here
        console.log('Full Name:', fullName);
        console.log('Address:', address);
        console.log('Phone number:', phoneNumber);
        console.log('Image URI:', imageUri);

        // Simulate saving the data
        setIsSaved(true);
        setModalVisible(true);
    };

    const handleLoginNavigation = () => {
        setModalVisible(false);
        navigation.navigate('Blogin'); // Ensure you have a route named 'Login'
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

            {/* <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
       */}
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
                        <Text style={styles.successMessage}>Your account is successfully created.</Text>
                        <Button title="Go to Login" onPress={handleLoginNavigation} />
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
        backgroundColor: '#FF0000',
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

export default BPersonalDetailsForm;
