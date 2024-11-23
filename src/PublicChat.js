import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Modal, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Publicchat = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  // API URL for backend
  const API_URL = 'http://192.168.1.88:5000/publicchat'; // Update with your actual backend URL

  // Fetch comments from the backend
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(API_URL);
        setCommentsList(response.data.reverse()); // Display newest comments first
      } catch (error) {
        console.error('Error fetching comments:', error);
        setErrorMessage('Unable to fetch comments. Please try again later.');
      }
    };
    fetchComments();
  }, []);

  const handleAddComment = () => {
    setComment('');
    setModalVisible(true);
  };

  const handlePostComment = async () => {
    if (!comment.trim()) {
      Alert.alert('Error', 'Please write something before posting.');
      return;
    }
  
    Alert.alert(
      'Confirmation',
      'Do you want to post this comment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Post',
          onPress: async () => {
            try {
              const email = await AsyncStorage.getItem('email') || 'guest@example.com';
              const userName = await AsyncStorage.getItem('userName') || 'Guest User';
  
              const newComment = { content: comment, email, userName };
  
              const response = await axios.post(API_URL, newComment);
              console.log('Comment posted successfully:', response.data);
  
              setCommentsList([response.data.data, ...commentsList]); // Update the list with new comment
              setModalVisible(false);
            } catch (error) {
              console.error('Error posting comment:', error);
              const errorMessage = error.response?.data?.error || 'Failed to post comment. Please try again.';
              Alert.alert('Error', errorMessage);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Public Chat</Text>
        <Text style={styles.subHeaderText}>Share your thoughts with the community</Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.addCommentSection} onPress={handleAddComment}>
          <Text style={styles.addCommentText}>+ Add New Comment</Text>
        </TouchableOpacity>

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : commentsList.length === 0 ? (
          <Text style={styles.noCommentsText}>No comments yet. Be the first to post!</Text>
        ) : (
          commentsList.map((commentItem) => (
            <View key={commentItem._id} style={styles.commentItem}>
              <Text style={styles.commentContent}>
                <Text style={{ fontWeight: 'bold' }}>{commentItem.userName}:</Text> {commentItem.content}
              </Text>
              <Text style={styles.commentDate}>
                {new Date(commentItem.date).toLocaleString()}
              </Text>
            </View>
          ))
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Comment</Text>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="Write your comment here..."
              value={comment}
              onChangeText={setComment}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handlePostComment} style={styles.postButton}>
                <Text style={styles.buttonText}>Post</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.postButton, { backgroundColor: '#FF6347' }]}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#41B06E',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 40,
  },
  headerText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#E1DED',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  addCommentSection: {
    backgroundColor: '#41B06E',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  addCommentText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    borderColor: '#DDDDDD',
    borderWidth: 1,
  },
  commentContent: {
    fontSize: 16,
    marginBottom: 5,
  },
  commentDate: {
    fontSize: 12,
    color: '#888888',
  },
  noCommentsText: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginTop: 20,
  },
  errorMessage: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    height: 150,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  postButton: {
    flex: 1,
    backgroundColor: '#41B06E',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Publicchat;
