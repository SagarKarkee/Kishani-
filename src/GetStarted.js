import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    // Navigate to the next screen
    navigation.navigate('Login'); // Change 'NextScreen' to your actual screen name
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image className="h-full w-full" source={require('../assets/Vector.png')} style={styles.vector} />
        <Image source={require('../assets/Kishani logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.welcome}>Empowering Farmers, Enhancing Markets</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#43B76A',
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
    width: 200,
    height: 200, // Adjust the height as needed
    marginBottom: 300, // Add some space between the image and the text
    justifyContent: 'center',
    alignItems: 'center',
  },
  vector: {
 
  
  },
  logo: {
    position: 'absolute',
    width: 300, // Adjust the width as needed
    height: 300, // Adjust the height as needed
    transform: [{ translateX: 3 }, { translateY: 0 }], // Center the logo
  },
  welcome: {
    fontSize: 19,
    fontWeight: 'italic',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GetStarted;
