import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Account_Type({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CHOOSE YOUR ACCOUNT TYPE</Text>
      
      <View style={styles.optionContainer}>
        <TouchableOpacity 
          style={styles.option} 
          // onPress={() => navigation.navigate('SecurityQuestion')}>
          onPress={() => navigation.navigate('Login')}>

          <Image 
            source={require('./../assets/f.jpeg')} // replace with your image path
            style={styles.image} 
          />
          <Text style={styles.optionText}>FARMER</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.option} 
          onPress={() => navigation.navigate('Blogin')}>
          <Image 
            source={require('./../assets/b.jpeg')} // replace with your image path
            style={styles.image} 
          />
          <Text style={styles.optionText}>BUYER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#43B76A', // Green background color
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  optionText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});