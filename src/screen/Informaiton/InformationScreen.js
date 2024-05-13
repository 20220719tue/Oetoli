import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";

const InformationScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [webViewUrl, setWebViewUrl] = useState(null);
  const nickname = useSelector((state) => state.user.nickname);

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

        setUserLocation([37.5665, 126.978]);
        updateWebViewUrl([37.5665, 126.978]);
      }
    } catch (error) {
      console.error("사용자 위치 오류:", error);
    }
  };

  const updateWebViewUrl = (coords) => {
    const { latitude, longitude } = coords;
    const url = `https://20220719tue.github.io/oetoli_map/?lat=${latitude}&lng=${longitude}`;
    setWebViewUrl(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {nickname}님의 근처에 있는 상담센터와 취업센터입니다.
      </Text>
      {webViewUrl ? (
        <WebView
          source={{ uri: webViewUrl }}
          style={styles.Webview_container}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 10,
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
});

export default InformationScreen;
