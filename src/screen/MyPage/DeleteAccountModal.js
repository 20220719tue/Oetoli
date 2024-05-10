import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";

const DeleteAccountModal = ({ visible, onCancel, onDelete }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <TouchableOpacity style={styles.centeredView} onPress={onCancel}>
        <TouchableNativeFeedback>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>정말 탈퇴하시겠습니까?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={onDelete}
              >
                <Text style={styles.buttonText}>예</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}
              >
                <Text style={styles.buttonText}>아니오</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableNativeFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: "red",
  },
  cancelButton: {
    backgroundColor: "blue",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 50,
  },
});

export default DeleteAccountModal;
