import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Import local images
import cultivationImage from '../assets/Cul-1.jpeg'; // Replace with your actual path
import cropDiseasesImage from '../assets/dis.jpeg'; // Replace with your actual path

const Dashboard = ({ navigation }) => {
  const route = useRoute();
  const [userName, setUserName] = useState('User');
  const [isChatBoxVisible, setIsChatBoxVisible] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      const storedName = await AsyncStorage.getItem('userFullName');
      const storedEmail = await AsyncStorage.getItem('userEmail');
  
      if (storedName) setUserName(storedName);
      if (!storedName || !storedEmail) {
        console.error('User data missing in AsyncStorage');
      }
    };
  
    loadUserData();
  }, []);

  // Function to open the index.html in a browser
  const openRecommendationPage = () => {
    
    const url = process.env.API_URL;
    Linking.openURL(`${url}/`).catch(err => console.error("Couldn't load the page", err));
  };


  const isActive = (screen) => route.name === screen; 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Welcome {userName}👋!</Text>
          <Text style={styles.subHeaderText}>Welcome to KISHANI APP</Text>
        </View>
        <View style={styles.notification}>
          <TouchableOpacity style={styles.notifications} onPress={() => navigation.navigate('Notification')}>
            <Icon name="notifications-outline" size={30} color="#000" />
          </TouchableOpacity>
        </View>
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

      {/* Crops Recommendation Section */}
      <View style={styles.recommendationSection}>
        <Text style={styles.recommendationTitle}>Crops Recommendation</Text>
        <Text style={styles.recommendationText}>
          Get insights into the best crops to grow based on your region and soil type.
        </Text>
        <TouchableOpacity
          style={styles.recommendationButton}
          onPress={openRecommendationPage} // Use the function to open the web page
        >
          <Text style={styles.recommendationButtonText}>Go to Recommendations</Text>
        </TouchableOpacity>
      </View>

      
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
      <TouchableOpacity style={styles.chatToggle} onPress={() => setIsChatBoxVisible(!isChatBoxVisible)}>
        <Icon name="chatbubble-outline" size={30} color="#FFFFFF" />
      </TouchableOpacity>



      {/* Navigation Buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Icon
            name={isActive('Dashboard') ? 'home' : 'home-outline'}
            size={25}
            color={isActive('Dashboard') ? '#43B76A' : '#000'}
          />
          <Text style={[styles.navButtonText, isActive('Dashboard') && styles.activeNavText]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Notes')}
        >
          <Icon
            name={isActive('Notes') ? 'document-text' : 'document-text-outline'}
            size={25}
            color={isActive('Notes') ? '#43B76A' : '#000'}
          />
          <Text style={[styles.navButtonText, isActive('Notes') && styles.activeNavText]}>
            Notes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Message')}
        >
          <Icon
            name={isActive('Message') ? 'book' : 'book-outline'}
            size={25}
            color={isActive('Message') ? '#43B76A' : '#000'}
          />
          <Text style={[styles.navButtonText, isActive('Message') && styles.activeNavText]}>
            Education
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon
            name={isActive('Profile') ? 'person' : 'person-outline'}
            size={25}
            color={isActive('Profile') ? '#43B76A' : '#000'}
          />
          <Text style={[styles.navButtonText, isActive('Profile') && styles.activeNavText]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5FCFF',
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
  headerTextContainer: {
    flex: 1,
  },
  headerText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  subHeaderText: {
    fontSize: 18,
    color: '#D1C4E9',
  },
  notificationIcon: {
    marginLeft: 20,
  },
  addProductSection: {
    padding: 20,
    backgroundColor: '#E8EAF6',
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  businessTitle: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addProductText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#247A0E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  // educationSection: {
  //   padding: 20,
  //   backgroundColor: '#E8F5E9',
  //   borderRadius: 10,
  //   margin: 20,
  // },
  // educationTitle: {
  //   fontSize: 18,
  //   color: '#388E3C',
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  //   textAlign: 'center',
  // },
  // educationBoxes: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  // educationBox: {
  //   width: '48%',
  //   backgroundColor: '#FFFFFF',
  //   borderRadius: 10,
  //   overflow: 'hidden',
  //   elevation: 2,
  //   marginBottom: 10,
  //   alignItems: 'center',
  //   padding: 10,
  // },
  // educationImage: {
  //   width: '100%',
  //   height: 100,
  //   borderRadius: 10,
  //   marginBottom: 10,
  // },
  // educationText: {
  //   fontSize: 16,
  //   color: '#388E3C',
  //   textAlign: 'center',
  // },

  navButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    elevation: 5,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    marginTop: 5,
    color: '#6200EE',
    fontSize: 14,
  },

  //for chat pup off
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
    bottom: 125,
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

  //for recomendation
  recommendationSection: {
    padding: 20,
    backgroundColor: '#FFECB3',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  recommendationTitle: {
    fontSize: 18,
    color: '#FFA000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendationText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  recommendationButton: {
    backgroundColor: '#FFA000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  recommendationButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  activeNavText: {
    color: '#43B76A',
    fontWeight: 'bold',
  },

  
});

export default Dashboard;
