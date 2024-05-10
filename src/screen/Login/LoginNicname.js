import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getUserNickname } from "../../Redux/reducers/user_reducer";

const LoginNicname = () => {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleInputChange = (text) => {
    setNickname(text);
    setError(false);
  };

  const handleSaveNickname = () => {
    if (!nickname.trim()) {
      // 입력값이 공백인 경우
      setError(true); // 에러 상태를 true로 설정
      return;
    } else {
      dispatch(getUserNickname(nickname));
      navigation.navigate("LoginJob");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>닉네임을 설정하세요</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleInputChange}
        value={nickname}
        placeholder="닉네임을 입력하세요"
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveNickname}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>닉네임을 입력해주세요</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  errorText: {
    color: "red", // 빨간색으로 표시
    marginTop: 5,
  },
  button: {
    width: "80%",
    backgroundColor: "#3498db",
    borderRadius: 5,
    marginTop: 10, // 간격 조정
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default LoginNicname;
