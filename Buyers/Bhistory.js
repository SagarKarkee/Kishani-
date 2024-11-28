
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons'; // For back arrow icon
import { useNavigation } from '@react-navigation/native';

const BHistory = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('orderHistory');
      const parsedHistory = storedHistory ? JSON.parse(storedHistory) : [];
      setHistory(parsedHistory);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  const clearHistory = async () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to clear your order history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('orderHistory');
              setHistory([]);
            } catch (error) {
              console.error('Error clearing history:', error);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>
        <Text style={styles.bold}>Product:</Text> {item.name}
      </Text>
      <Text style={styles.historyText}>
        <Text style={styles.bold}>Quantity:</Text> {item.quantity}
      </Text>
      <Text style={styles.historyText}>
        <Text style={styles.bold}>Price:</Text> {item.price}
      </Text>
      <Text style={styles.historyText}>
        <Text style={styles.bold}>Date:</Text> {item.date}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Order History</Text> */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History </Text>

      </View>

      {history.length > 0 ? (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noHistoryText}>No orders yet!</Text>
      )}

      <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
        <Text style={styles.clearButtonText}>Clear History</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    // padding: 20,
  },
  header: {
    backgroundColor: '#41B06E', // Green background
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
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
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  //   textAlign: 'center',
  //   marginTop: 40,
  // },
  noHistoryText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
  historyItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  historyText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#43B76A',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



export default BHistory;
