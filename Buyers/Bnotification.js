
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; // For back arrow icon
import { useNavigation } from '@react-navigation/native';

const NotificationPage = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Password Reset",
      description: "Your password has been reset successfully.",
      
    },
    {
      id: "2",
      title: "Feedback Submitted",
      description: "Thank you for providing your feedback!",
      
    },
    {
      id: "3",
      title: "Successful Login",
      description: "You have logged in successfully.",
      
    },
    {
      id: "4",
      title: "Order Placed",
      description: "Your order has been placed successfully!",
     
    },
  ]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDescription}>{item.description}</Text>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>

      </View>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
        />
      ) : (
        <Text style={styles.noNotificationsText}>
          No notifications available.
        </Text>
      )}

      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearNotifications}
      >
        <Text style={styles.clearButtonText}>Clear All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    // padding: 20,
    
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
  // header: {
  //   fontSize: 34,
  //   fontWeight: "bold",
  //   marginBottom: 16,
  //   marginTop: 40,
  //   marginLeft: 55,
  // },
  notificationCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: "#aaa",
  },
  noNotificationsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: "#43B76A",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    paddingBottom: 20,
    marginBottom: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NotificationPage;