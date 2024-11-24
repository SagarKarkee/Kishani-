import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // For back arrow icon

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Top Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollView}>
        <Text style={styles.date}>Effective Date: [2024]</Text>

        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.text}>
          Welcome to the Crop Diseases App. Your privacy is important to us, and this policy outlines how we collect, use, and protect your information.
        </Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.text}>
          We may collect the following information:{"\n"}
          - Personal details you provide, such as your name, email address, and contact information, when contacting us.{"\n"}
          - Non-personal information like your device type, operating system, and usage data to improve the app experience.
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.text}>
          We use the collected information to:{"\n"}
          - Provide and enhance our services.{"\n"}
          - Respond to your inquiries and provide support.{"\n"}
          - Analyze app usage to improve functionality.
        </Text>

        <Text style={styles.sectionTitle}>3. Data Sharing</Text>
        <Text style={styles.text}>
          We do not sell or share your personal information with third parties except to comply with legal obligations or protect our rights.
        </Text>

        <Text style={styles.sectionTitle}>4. Security Measures</Text>
        <Text style={styles.text}>
          We implement security measures to protect your data but cannot guarantee absolute security due to online risks.
        </Text>

        <Text style={styles.sectionTitle}>5. Your Rights</Text>
        <Text style={styles.text}>
          You have the right to:{"\n"}
          - Access, modify, or delete your personal data.{"\n"}
          - Opt-out of data collection by contacting us.
        </Text>

        <Text style={styles.sectionTitle}>6. Contact Us</Text>
        <Text style={styles.text}>
          If you have questions about this policy, contact us at:{"\n"}
          [+977 9876543210]
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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
  scrollView: {
    paddingHorizontal: 26,
    paddingVertical: 0,
  },
  date: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
});

export default PrivacyPolicyScreen;
