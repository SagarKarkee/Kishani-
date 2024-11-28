import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const BFavourites = ({ navigation }) => {
  // Sample data for favorites (can be fetched from state, API, or async storage)
  const favourites = [
    { id: '1', name: 'Tomato', details: 'Fresh red tomatoes' },
    { id: '2', name: 'Potato', details: 'Organic potatoes' },
    { id: '3', name: 'Carrot', details: 'Healthy carrots' },
  ];

  // Render each favorite item in the list
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('BVegetableDetails', { item })} // Navigate to the details screen
    >
      <Text style={styles.itemName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favourites</Text>

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
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#43B76A',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  itemName: {
    fontSize: 16,
    color: '#333333',
  },
});

export default BFavourites;
