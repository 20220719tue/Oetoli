import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useSelector } from "react-redux";

const JobModifyModal = ({ visible, onClose, onSave }) => {
  const Job = useSelector((state) => state.user.job);
  const jobList = ["취준생", "주부", "학생", "직장인", "기타"];

  const handleJobSelect = (job) => {
    onSave(job); // 선택된 직업을 처리하는 함수 호출
    onClose(); // 모달 닫기
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableOpacity style={styles.modalBackground} onPress={onClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>직업 선택</Text>
          <View style={styles.jobContainer}>
            {jobList.map((job, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.jobButton,
                  Job === job ? styles.jobButton_Select : styles.jobButton,
                ]}
                onPress={() => handleJobSelect(job)} // 직업 선택 시 처리 함수 호출
              >
                <Text style={styles.jobButtonText}>{job}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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

export default JobModifyModal;
