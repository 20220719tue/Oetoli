import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const GoodByeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login"); // 로그인 페이지로 이동
    }, 3000); // 3초 뒤에 이동

    return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 해제
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>그동안 함께해서 좋았어요.</Text>
      <Text style={styles.text}>당신의 삶이 언제나 행복하기를 바래요.</Text>
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
    textAlign: "center",
    fontSize: 20,
  },
});

export default GoodByeScreen;
