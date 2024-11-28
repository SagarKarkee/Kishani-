

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons'; // For back arrow icon

const BBfav = ({ navigation }) => {
  // Sample data for favorites (can be fetched from state, API, or async storage)
  const [favourites, setFavourites] = useState([
    { id: '1', name: 'Tomato', details: 'Fresh red tomatoes' },
    { id: '2', name: 'Potato', details: 'Organic potatoes' },
    { id: '3', name: 'Carrot', details: 'Healthy carrots' },
  ]);

  // Remove item from favorites
  const removeFromFavorites = (id) => {
    setFavourites(favourites.filter(item => item.id !== id));
  };

  // Render each favorite item in the list
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('BVegetableDetails', { item })} // Navigate to the details screen
      >
        <Text style={styles.itemName}>{item.name}</Text>
      </TouchableOpacity>

      {/* Heart icon to remove from favorites */}
      <TouchableOpacity onPress={() => removeFromFavorites(item.id)}>
        <Icon name="heart" size={24} color="#FF6347" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Favourites</Text>
      </View>

      {/* List of favorite items */}
      <FlatList
        data={favourites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#41B06E', // Green background
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 35,
  },
  backButton: {
    padding: 5,
    marginRight: 9,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Centers the title in the header
  },
  // backButton: {
   
    
  //   color: '#43B76A',
  //   marginBottom: 20,
  //   marginTop: 50,
  //   marginLeft: 100,
  // },
  // title: {
  //   fontSize: 22,
  //   fontWeight: 'bold',
  //   color: '#43B76A',
  //   marginBottom: 20,
  //   marginTop: 50,
  //   marginLeft: 100,
  // },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  item: {
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#333333',
  },
});

export default BBfav;


