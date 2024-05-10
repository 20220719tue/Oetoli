import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

const InputModal = ({ visible, onClose, onSave }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    // 입력값을 저장하고 모달을 닫음
    onSave(inputValue);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter something..."
          />
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  innerContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "blue",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default InputModal;

// import React, { useRef, useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from "react-native";
// import { TextInput } from "react-native-gesture-handler";
// import { useSelector } from "react-redux";

// const NickNameModal = ({ visible, onClose, onSave }) => {
//   const [newNickname, setNewNickname] = useState(""); // 입력된 닉네임을 저장할 상태
//   const [keyboardVisible, setKeyboardVisible] = useState(false);
//   const nickname = useSelector((state) => state.user.nickname);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (visible) {
//       setKeyboardVisible(true);
//       inputRef.current.focus();
//     } else {
//       setKeyboardVisible(false);
//     }
//   }, [visible]);

//   const handleSave = () => {
//     onSave(newNickname); // 저장 버튼을 누르면 입력된 닉네임을 전달하여 처리
//     onClose(); // 모달을 닫음
//   };

//   const handleInputPress = () => {
//     setNewNickname(""); // 인풋 값 초기화
//     setKeyboardVisible(true); // 키보드 표시 상태 업데이트
//   };

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <TouchableWithoutFeedback onPress={onClose}>
//         <View style={styles.modalBackground}>
//           <TouchableWithoutFeedback>
//             <View style={styles.modalContainer}>
//               <Text style={styles.modalTitle}>닉네임 수정</Text>
//               <TouchableOpacity
//                 onPress={handleInputPress}
//                 style={styles.inputContainer}
//               >
//                 <TextInput
//                   ref={inputRef}
//                   placeholder="닉네임을 입력하세요"
//                   value={newNickname}
//                   onChangeText={setNewNickname}
//                   style={styles.input}
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//                 <Text style={styles.saveButtonText}>저장</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableWithoutFeedback>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalBackground: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)", // 어두운 배경
//   },
//   modalContainer: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 20,
//     alignItems: "center",
//     elevation: 5,
//     width: "90%",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   inputContainer: {
//     width: "100%",
//     marginBottom: 20,
//   },
//   input: {
//     width: "100%",
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     paddingHorizontal: 10,
//   },
//   saveButton: {
//     width: "100%",
//     backgroundColor: "#3498db",
//     borderRadius: 10,
//     padding: 10,
//     alignItems: "center",
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default NickNameModal;
