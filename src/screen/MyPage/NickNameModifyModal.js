import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableNativeFeedback,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const NickNameModifyModal = ({ visible, onClose, onSave }) => {
  const [text, onChangeText] = React.useState("");

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableOpacity style={styles.modalBackground} onPress={onClose}>
        <TouchableNativeFeedback style={styles.modalContainer}>
          <View>
            <Text style={styles.modalTitle}>직업 선택</Text>
            <TextInput
              onChangeText={onChangeText}
              value={text}
              keyboardType="numeric"
            />
          </View>
        </TouchableNativeFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 어두운 배경
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    width: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  jobContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // 가운데 정렬로 수정
    marginBottom: 10,
  },
  jobButton: {
    width: "29%", // 한 줄에 3개의 버튼이 보이도록 수정
    height: 50,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  jobButton_Select: {
    backgroundColor: "green",
  },
  jobButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NickNameModifyModal;
