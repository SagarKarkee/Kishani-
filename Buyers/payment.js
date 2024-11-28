import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet,} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TransferScreen = () => {
  const [escrowEnabled, setEscrowEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleProceed = () => {
    // Show modal on button click
    setIsModalVisible(true);
  };

  const closeModal = () => {
    // Close the modal
    setIsModalVisible(false);
    navigation.navigate('BFeedbackScreen');
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Send to Khalti User</Text>
      <Text style={styles.balanceText}>Transferable Balance Rs. 100000056</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Khalti Mobile Number"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.picker}>
        <Text style={styles.pickerText}>Personal use</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Remarks"
        multiline
        numberOfLines={3}
      />

      {/* Proceed Button */}
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedButtonText}>PAY NOW</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Your payment is successfully done!</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#7B43A1',
    marginBottom: 4,
    textAlign: 'center',
    marginTop: 120,
  },
  balanceText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  picker: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  proceedButton: {
    backgroundColor: '#7B43A1',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#7B43A1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TransferScreen;
