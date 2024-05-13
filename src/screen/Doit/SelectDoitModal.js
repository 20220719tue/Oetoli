import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import React, { useState } from "react";

const SelectDoitModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalContainer} onPress={onClose}>
        <TouchableNativeFeedback onPress={() => {}}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>물마시기</Text>
            <Text style={styles.text}>물을 마시는 할일입니다.</Text>
            <Text style={styles.button_title}>인증 방식</Text>
            <Text style={styles.text}>인증방식에 대한 설명</Text>

            {/* 기간 */}
            <Text style={styles.button_title}>기간</Text>
            <View style={styles.button_Container}>
              <TouchableOpacity style={styles.button}>
                <Text>일주일</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text>이주일</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text>기타</Text>
              </TouchableOpacity>
            </View>

            {/* 요일 */}
            <Text style={styles.button_title}>요일</Text>
            <View style={styles.button_Container}>
              <TouchableOpacity style={styles.button_day}>
                <Text>월</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button_day}>
                <Text>화</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button_day}>
                <Text>수</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button_day}>
                <Text>목</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button_day}>
                <Text>금</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button_day}>
                <Text>토</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button_day}>
                <Text>일</Text>
              </TouchableOpacity>
            </View>

            {/* 만들기 버튼 */}
            <View>
              <TouchableOpacity style={styles.button_save} onPress={onClose}>
                <Text style={styles.button_save_text}>만들기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableNativeFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 모달 배경색 및 투명도 조절
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    marginBottom: 10,
  },
  button_title: {
    fontSize: 17,
    fontWeight: "bold",
    marginVertical: 10,
    marginTop: 20,
  },
  button_Container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "pink",
    borderRadius: 25,
    marginHorizontal: 7,
  },
  button_day: {
    padding: 10,
    backgroundColor: "pink",
    borderRadius: 25,
    marginHorizontal: 7,
  },
  button_save: {
    padding: 10,
    backgroundColor: "pink",
    borderRadius: 25,
    marginHorizontal: 7,
    marginTop: 50,
  },
  button_save_text: {
    textAlign: "center",
  },
  contentContainer: {
    padding: 20,
    borderRadius: 15,
    width: "95%",
    backgroundColor: "white",
  },
});

export default SelectDoitModal;
