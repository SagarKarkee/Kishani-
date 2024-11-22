import React, { useState } from "react";
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity} from "react-native";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Password Reset",
      description: "Your password has been reset successfully.",
      time: "10:00 AM",
    },
    {
      id: "2",
      title: "Feedback Submitted",
      description: "Thank you for providing your feedback!",
      time: "10:30 AM",
    },
    {
      id: "3",
      title: "Successful Login",
      description: "You have logged in successfully.",
      time: "11:00 AM",
    },
    {
      id: "4",
      title: "Order Placed",
      description: "Your order has been placed successfully!",
      time: "12:00 PM",
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
      <Text style={styles.header}>Notifications</Text>

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
    padding: 16,
  },
  header: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 40,
    marginLeft: 55,
  },
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
    marginTop: 16,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NotificationPage;
