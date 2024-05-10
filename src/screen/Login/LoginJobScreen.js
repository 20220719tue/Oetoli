import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getUserJob } from "../../Redux/reducers/user_reducer";
import { createUser } from "../../lib/user";

const LoginJobScreen = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.userId);
  const name = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.userId);
  const job = useSelector((state) => state.user.job);
  const photoURL = useSelector((state) => state.user.photoURL);
  const nickname = useSelector((state) => state.user.nickname);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setShowWarning(false); // 작업이 선택되면 경고를 재설정
  };

  const handleNextPress = async () => {
    if (selectedJob) {
      dispatch(getUserJob(selectedJob));

      await createUser({
        id: id,
        Name: name,
        Email: email,
        PhotoURL: photoURL,
        Nickname: nickname,
        Job: selectedJob,
      });

      navigation.navigate("LoginSignUp");
    } else {
      setShowWarning(true); // 작업이 선택되지 않았을 때 경고를 표시
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>현재 나는</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedJob === "취준생" && styles.selectedButton,
            ]}
            onPress={() => handleJobSelect("취준생")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedJob === "취준생" && styles.selectedButtonText,
              ]}
            >
              취준생
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedJob === "주부" && styles.selectedButton,
            ]}
            onPress={() => handleJobSelect("주부")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedJob === "주부" && styles.selectedButtonText,
              ]}
            >
              주부
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedJob === "학생" && styles.selectedButton,
            ]}
            onPress={() => handleJobSelect("학생")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedJob === "학생" && styles.selectedButtonText,
              ]}
            >
              학생
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedJob === "직장인" && styles.selectedButton,
            ]}
            onPress={() => handleJobSelect("직장인")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedJob === "직장인" && styles.selectedButtonText,
              ]}
            >
              직장인
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedJob === "기타" && styles.selectedButton,
            ]}
            onPress={() => handleJobSelect("기타")}
          >
            <Text
              style={[
                styles.buttonText,
                selectedJob === "기타" && styles.selectedButtonText,
              ]}
            >
              기타
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={handleNextPress} style={styles.buttonNext}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
      {showWarning && (
        <Text style={styles.warningText}>하나를 선택해주세요</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 5,
  },
  selectedButton: {
    backgroundColor: "#2ecc71", // 선택된 버튼의 색상
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  selectedButtonText: {
    fontWeight: "bold", // 선택된 버튼의 텍스트 스타일
  },
  buttonNext: {
    width: "80%",
    backgroundColor: "#3498db",
    borderRadius: 5,
    marginTop: 10, // 간격 조정
    alignItems: "center",
    padding: 10,
  },
  warningText: {
    color: "red",
    marginTop: 10,
  },
});

export default LoginJobScreen;
