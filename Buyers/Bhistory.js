import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BHistory = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Your History</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default BHistory;
