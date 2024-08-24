import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button } from 'react-native';

const Profile = ({ route, navigation }) => {
    const { fullName, address, email, imageUri } = route.params || {};
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(fullName || '');
    const [phoneNumber, setPhoneNumber] = useState('(123) 456-7890'); // Placeholder if phone number isn't in route
    const [userAddress, setUserAddress] = useState(address || '');
    const [userEmail, setUserEmail] = useState(email || '');

    const saveChanges = () => {
        setIsEditing(false);
        // Logic to save changes to server or local storage
        console.log('Changes saved:', { name, phoneNumber, userAddress, userEmail });
    };

    return (
        <View style={styles.container}>
            {/* Display the uploaded image */}
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.profileImage} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.imageText}>No Image</Text>
                </View>
            )}

            {/* Display the name below the image */}
            <Text style={styles.nameText}>{name}</Text>

            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Personal Information</Text>
                </View>
            </TouchableOpacity>

            {isEditing ? (
                <View style={styles.editContainer}>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Name"
                    />
                    <TextInput
                        style={styles.input}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        style={styles.input}
                        value={userAddress}
                        onChangeText={setUserAddress}
                        placeholder="Address"
                    />
                    <TextInput
                        style={styles.input}
                        value={userEmail}
                        onChangeText={setUserEmail}
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                    <Button title="Save Changes" onPress={saveChanges} />
                </View>
            ) : (
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Name: {name}</Text>
                    <Text style={styles.infoText}>Phone: {phoneNumber}</Text>
                    <Text style={styles.infoText}>Address: {userAddress}</Text>
                    <Text style={styles.infoText}>Email: {userEmail}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F1EEEE',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#ddd',
        marginBottom: 10, // Adjusted margin for name text
    },
    placeholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DFDFDF',
        marginBottom: 10, // Adjusted margin for name text
    },
    imageText: {
        fontSize: 18,
        color: '#888',
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    infoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    infoText: {
        fontSize: 18,
        color: '#333',
    },
    editContainer: {
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
});

export default Profile;
