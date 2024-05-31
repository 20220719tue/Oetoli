import React, { useState, useEffect, useRef } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { inputTodayDoit } from "../../lib/user";

export default function DoitImageAIScreen({ route, navigation }) {
  const { item } = route.params;
  const webViewRef = useRef(null);

  const [authStatus, setAuthStatus] = useState("미인증");
  const [week, setWeek] = useState([...item.week]);
  const doitId = item.id;
  const userId = item.userId;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1);
  const dd = String(today.getDate()).padStart(2, "0");
  const day = `${yyyy}-${mm}-${dd}`;

  const isAuth = week.includes(day);

  useEffect(() => {
    const onBackPress = () => {
      console.log("넘겨줄 때" + item.week);
      navigation.navigate("DoitCertification", { item });
      return true; // 이벤트 처리 완료
    };

    // 컴포넌트가 마운트될 때 BackHandler 이벤트 추가
    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    // 컴포넌트가 언마운트될 때 BackHandler 이벤트 제거
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, [navigation]);

  const getModelType = (title) => {
    switch (title) {
      case "물마시기":
        return "water";
      case "뉴스레터 읽기":
        return "newsletter";
      case "이력서 제출":
        return "resume";
      case "아침기상":
        return "morning";
      case "방청소":
        return "cleaning";
      case "독서하기":
        return "reading";
      default:
        return "water";
    }
  };

  const modelType = getModelType(item.title);

  const handleMessage = async (event) => {
    const message = JSON.parse(event.nativeEvent.data);
    console.log(message.authenticated);
    if (message.authenticated === true && !week.includes(day)) {
      try {
        await inputTodayDoit(userId, doitId, day);
        const updatedWeek = [...week, day];
        setWeek(updatedWeek);
        item.week = updatedWeek; // item의 week를 업데이트
        console.log("성공");
      } catch (error) {
        console.error("Firestore 업데이트 중 오류 발생:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{
          uri: `https://20220719tue.github.io/oetoliAI/?isAuth=${isAuth}&modelType=${modelType}&modelTitle=${item.title}`,
        }}
        onMessage={handleMessage}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
