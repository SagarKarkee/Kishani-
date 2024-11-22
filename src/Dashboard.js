import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Import local images
import cultivationImage from '../assets/Cul-1.jpeg'; // Replace with your actual path
import cropDiseasesImage from '../assets/dis.jpeg'; // Replace with your actual path

const Dashboard = ({ route, navigation }) => {
  const userName = route.params?.user || 'User';
  const [isChatBoxVisible, setIsChatBoxVisible] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Welcome {userName}👋!</Text>
            <Text style={styles.subHeaderText}>Welcome to KISHANI APP</Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Icon name="notifications-outline" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Add Product Section */}
        <View style={styles.addProductSection}>
          <Text style={styles.businessTitle}>Start your business right now</Text>
          <Text style={styles.addProductText}>Add a New Product</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddProduct')}
          >
            <Text style={styles.addButtonText}>+ Add Product</Text>
          </TouchableOpacity>
        </View>

        {/* Education Section */}
        <View style={styles.educationSection}>
          <Text style={styles.educationTitle}>Education</Text>
          <View style={styles.educationBoxes}>
            <TouchableOpacity
              style={styles.educationBox}
              onPress={() => navigation.navigate('Cultivation')}
            >
              <Image source={cultivationImage} style={styles.educationImage} />
              <Text style={styles.educationText}>Cultivation Process</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.educationBox}
              onPress={() => navigation.navigate('CropDiseases')}
            >
              <Image source={cropDiseasesImage} style={styles.educationImage} />
              <Text style={styles.educationText}>Crop Diseases Solutions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Chat Box */}
      {isChatBoxVisible && (
        <View style={styles.chatBox}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatHeaderText}>Chat</Text>
            <TouchableOpacity onPress={() => setIsChatBoxVisible(false)}>
              <Icon name="close-outline" size={25} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.chatBody}>
            {messages.map((msg, index) => (
              <Text key={index} style={styles.chatMessage}>
                {msg.sender === 'user' ? `You: ${msg.text}` : msg.text}
              </Text>
            ))}
          </ScrollView>
          <View style={styles.chatFooter}>
            <TextInput
              style={styles.chatInput}
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
            />
            <TouchableOpacity onPress={handleSendMessage}>
              <Icon name="send-outline" size={25} color="#43B76A" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Chat Toggle Button */}
      <TouchableOpacity
        style={styles.chatToggle}
        onPress={() => setIsChatBoxVisible(!isChatBoxVisible)}
      >
        <Icon name="chatbubble-outline" size={30} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Icon name="home-outline" size={25} color="#43B76A" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Notes')}
        >
          <Icon name="document-text-outline" size={25} color="#43B76A" />
          <Text style={styles.navButtonText}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Message')}
        >
          <Icon name="chatbox-ellipses-outline" size={25} color="#43B76A" />
          <Text style={styles.navButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="person-outline" size={25} color="#43B76A" />
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  content: {
    flexGrow: 1,
  },
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: '#43B76A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 40,
  },
  headerText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  subHeaderText: {
    fontSize: 18,
    color: '#D1C4E9',
  },
  addProductSection: {
    padding: 20,
    backgroundColor: '#E8EAF6',
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
    
  },
  addButton: {
    backgroundColor: '#43B76A', // Green color for the button
    padding: 15,               // Padding inside the button
    borderRadius: 10,          // Rounded corners
    marginVertical: 10,        // Space above and below the button
    width: '40%',              // Button width as 80% of its container
    alignItems: 'center',      // Center the button text
    elevation: 5,              // Add shadow for a 3D effect
  },
  addButtonText: {
    color: '#FFFFFF',          // White text
    fontWeight: 'bold',        // Bold font for emphasis
    fontSize: 16,              // Font size for readability
  },
  
  educationSection: {
    padding: 20,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    margin: 20,
  },
  educationBoxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  educationBox: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    alignItems: 'center',
    padding: 10,
  },
  educationImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  chatToggle: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#43B76A',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  chatBox: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: '80%',
    height: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 5,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#43B76A',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  chatFooter: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    marginTop: 5,
    color: '#000000',
    fontSize: 14,
  },
});

export default Dashboard;
