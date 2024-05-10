import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";

const LoginSignupScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Main"); // 5초 후에 Main 화면으로 이동
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트가 unmount 될 때 타이머 클리어
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>가입이 완료되었습니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default LoginSignupScreen;
