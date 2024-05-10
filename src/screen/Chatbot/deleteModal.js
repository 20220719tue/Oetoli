import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableNativeFeedback,
} from "react-native";

const DeleteModal = ({ visible, onCancel, onDelete, userId, chatId }) => {
  const handleDelete = async () => {
    try {
      await onDelete(chatId); // 선택된 메시지의 ID를 onDelete 함수로 전달
      onCancel();
    } catch (error) {
      console.error("메시지 삭제 중 오류 발생:", error);
    }
  };

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
            <Text style={styles.modalText}>메시지를 삭제하시겠습니까?</Text>
            {/* 선택 부분 */}
            <View style={styles.buttonContainer}>
              {/* 예 */}
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={handleDelete} // 삭제 함수 호출
              >
                <Text style={styles.buttonText}>예</Text>
              </TouchableOpacity>
              {/* 아니오 */}
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

export default DeleteModal;
