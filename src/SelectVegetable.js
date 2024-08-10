import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';

const vegetables = [
  { id: '1', name: 'Carrot', image: require('../assets/carrot-1.jpeg') },
  { id: '2', name: 'Brinjal', image: require('../assets/brinjal.jpg') },
  { id: '3', name: 'Chilly', image: require('../assets/chilly-1.jpeg') },
  { id: '4', name: 'Tomato', image: require('../assets/tomato.jpg') },
  { id: '5', name: 'Potato', image: require('../assets/potato.jpg') },
  { id: '6', name: 'Onion', image: require('../assets/onion.jpg') },
  { id: '7', name: 'Cabbage', image: require('../assets/cabbage.jpeg') },
  { id: '8', name: 'Cauliflower', image: require('../assets/cauliflower.jpeg') },
  { id: '9', name: 'Pumpkin', image: require('../assets/pumpkin.jpeg') },
  { id: '10', name: 'Capssicum', image: require('../assets/capssicum.jpeg') },
  { id: '11', name: 'Turnip', image: require('../assets/turnip-1.jpeg') },
  { id: '12', name: 'Radish', image: require('../assets/radish-1.jpeg') },
  
  // Add more vegetable items as needed
];

const { width } = Dimensions.get('window');
const ITEM_SIZE = width / 3 - 10; // Calculate item size

const SelectVegetable = ({ navigation }) => {
  const handleSelect = (vegetableName) => {
    navigation.navigate('AddProduct', { selectedVegetable: vegetableName });
  };

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const rows = chunkArray(vegetables, 3);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Vegetable</Text>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.vegetableItem}
              onPress={() => handleSelect(item.name)}
            >
              <Image source={item.image} style={styles.vegetableImage} resizeMode="cover" />
              <Text style={styles.vegetableName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  vegetableItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE, // Ensure height matches width for a square item
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 5,
    padding: 5,
    overflow: 'hidden', // Ensure content doesn't overflow the box
  },
  vegetableImage: {
    width: '100%', // Ensure image takes full width of the box
    height: '100%', // Ensure image takes full height of the box
  },
  vegetableName: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default SelectVegetable;
