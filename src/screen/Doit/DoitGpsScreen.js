import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  BackHandler,
} from "react-native";
import * as Location from "expo-location";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";
import { inputTodayDoit } from "../../lib/user";
import { TouchableOpacity } from "react-native-gesture-handler";

const DoitGpsScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [userLocation, setUserLocation] = useState(null);
  const [webViewUrl, setWebViewUrl] = useState(null);
  const [week, setWeek] = useState([...item.week]);

  const doitId = item.id;
  const userId = item.userId;

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1);
  const dd = String(today.getDate()).padStart(2, "0");
  const day = `${yyyy}-${mm}-${dd}`;

  const [isInPark, setIsInPark] = useState(() => {
    return week.includes(day);
  });

  useEffect(() => {
    const onBackPress = () => {
      console.log(item.week);
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

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
        updateWebViewUrl(location.coords);
      } else {
        console.log("사용자가 위치제공을 거부함");

        setUserLocation({ latitude: 37.5665, longitude: 126.978 });
        updateWebViewUrl({ latitude: 37.5665, longitude: 126.978 });
      }
    } catch (error) {
      console.error("사용자 위치 오류:", error);
    }
  };

  const updateWebViewUrl = (coords) => {
    const { latitude, longitude } = coords;
    const url = `https://20220719tue.github.io/oetoli_parkMap/?lat=${latitude}&lng=${longitude}`;
    setWebViewUrl(url);
  };

  const handleMessage = async (event) => {
    const data = event.nativeEvent.data;
    if (data === "true" && !week.includes(day)) {
      try {
        await inputTodayDoit(userId, doitId, day);
        const updatedWeek = [...week, day];
        setWeek(updatedWeek);
        setIsInPark(true);
        item.week = updatedWeek; // item의 week를 업데이트
        console.log("성공");
      } catch (error) {
        console.error("Firestore 업데이트 중 오류 발생:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title_container}>
        <Text style={styles.button_text}>{item.title}</Text>
      </View>

      {webViewUrl ? (
        <WebView
          source={{ uri: webViewUrl }}
          style={styles.Webview_container}
          onMessage={handleMessage} // 웹뷰로부터 메시지 수신
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <View style={styles.button_container}>
        {!week.includes(day) ? (
          <Text style={styles.button_text}>미인증</Text>
        ) : (
          <Text style={styles.button_text}>인증완료</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  Webview_container: {
    flex: 1,
    marginTop: 10,
    borderRadius: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
  },
  title_container: {
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    backgroundColor: "pink",
    marginVertical: 10,
  },
  button_container: {
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    backgroundColor: "pink",
    marginVertical: 10,
  },
  button_text: {
    fontSize: 17,
  },
});

export default DoitGpsScreen;
