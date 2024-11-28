import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Modal, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native'

const Notes = ({ navigation }) => {
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);

  const handleAddNote = () => {
    setNote(''); // Clear note input for new note
    setModalVisible(true);
  };

  const handleSaveNote = () => {
    if (note.trim()) {
      const newNote = {
        content: note,
        date: new Date().toLocaleDateString(), // Format the date as needed
      };
      setNotesList([...notesList, newNote]);
      setNote('');
      setModalVisible(false);
    } else {
      Alert.alert('Error', 'Please enter a note before saving.');
    }
  };

  const handleEditNote = (index) => {
    setEditingNoteIndex(index);
    setNote(notesList[index].content);
    setEditModalVisible(true);
  };

  const handleSaveEditedNote = () => {
    if (note.trim() && editingNoteIndex !== null) {
      const updatedNotes = notesList.map((noteItem, index) =>
        index === editingNoteIndex ? { ...noteItem, content: note } : noteItem
      );
      setNotesList(updatedNotes);
      setNote('');
      setEditingNoteIndex(null);
      setEditModalVisible(false);
    } else {
      Alert.alert('Error', 'Please enter a note before saving.');
    }
  };

  const handleDeleteNote = (index) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const updatedNotes = notesList.filter((_, i) => i !== index);
            setNotesList(updatedNotes);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const isActive = (screen) => route.name === screen;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Your Notes</Text>
          <Text style={styles.subHeaderText}>Manage your notes here</Text>
        </View>
       
      </View>
      <View style={styles.content}>
        {/* Rectangle Section for Adding Notes */}
        <TouchableOpacity style={styles.addNoteSection} onPress={handleAddNote}>
          <Text style={styles.addNoteText}>+ Add New Note</Text>
        </TouchableOpacity>
        
        {/* Display List of Notes */}
        {notesList.length === 0 ? (
          <Text>No notes available. Click '+ Add New Note' to start.</Text>
        ) : (
          notesList.map((noteItem, index) => (
            <View key={index} style={styles.noteItem}>
              <Text style={styles.noteContent}>{noteItem.content}</Text>
              <Text style={styles.noteDate}>{noteItem.date}</Text>
              <View style={styles.noteActions}>
                <TouchableOpacity onPress={() => handleEditNote(index)}>
                  <Icon name="pencil-outline" size={20} color="#6200EE" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteNote(index)}>
                  <Icon name="trash-outline" size={20} color="#FF6347" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('BDashboard')}
        >
          <Icon
            name={isActive('BDashboard') ? 'home' : 'home-outline'}
            size={25}
            color={isActive('BDashboard') ? '#43B76A' : '#000'}
          />
          <Text style={[styles.navButtonText, isActive('BDashboard') && styles.activeNavText]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Bnotes')}
        >
          <Icon
            name={isActive('Bnotes') ? 'document-text' : 'document-text-outline'}
            size={25}
            color={isActive('Bnotes') ? '#43B76A' : '#000'}
          />
          <Text style={[styles.navButtonText, isActive('Bnotes') && styles.activeNavText]}>
            Notes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Bmessage')}
        >
          <Icon
            name={isActive('Bmessage') ? 'book' : 'book-outline'}
            size={25}
            color={isActive('Bmessage') ? '#43B76A' : '#000'}
          />
          <Text style={[styles.navButtonText, isActive('Bmessage') && styles.activeNavText]}>
            Education
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Bprofile')}
        >
          <Icon
            name={isActive('Bprofile') ? 'person' : 'person-outline'}
            size={25}
            color={isActive('Bprofile') ? '#43B76A' : '#000'}
          />
          <Text style={[styles.navButtonText, isActive('Bprofile') && styles.activeNavText]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Adding Notes */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Note</Text>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="Write your note here..."
              value={note}
              onChangeText={setNote}
            />
            <View style={styles.modalButtons}>
              <Button title="Save" onPress={handleSaveNote} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="#FF6347" />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Editing Notes */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Note</Text>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="Edit your note here..."
              value={note}
              onChangeText={setNote}
            />
            <View style={styles.modalButtons}>
              <Button title="Save" onPress={handleSaveEditedNote} />
              <Button title="Cancel" onPress={() => setEditModalVisible(false)} color="#FF6347" />
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
  addNoteSection: {
    backgroundColor: '#41B06E',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  addNoteText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    borderColor: '#DDDDDD',
    borderWidth: 1,
  },
  noteContent: {
    fontSize: 16,
    marginBottom: 5,
  },
  noteDate: {
    fontSize: 12,
    color: '#888888',
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
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
  activeNavText: {
    color: '#43B76A',
    fontWeight: 'bold',
  },
});

export default Notes;
