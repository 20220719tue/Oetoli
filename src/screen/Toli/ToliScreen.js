import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const ToliScreen = () => {
  const coin = useSelector((state) => state.user.coin);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require("../../images/toli.png")}
          style={styles.image_ch}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.coinText}>현재 보유 코인: {coin}</Text>
          <Image
            source={require("../../images/coin.png")}
            style={styles.image_coin}
          />
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text>Button 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Button 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Button 3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text>Button 4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Button 5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Button 6</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  topContainer: {
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinText: {
    flex: 1,
    fontSize: 18,
    textAlign: "right",
    marginRight: 10,
  },
  image_ch: {
    width: 200,
    height: 200,
  },
  image_coin: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  scrollView: {
    flex: 1,
    width: "100%",
    marginTop: 10,
    backgroundColor: "pink", // 스크롤뷰 배경색 핑크로 변경
    padding: 10, // 패딩 추가
    paddingTop: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "lightblue",
    width: 100,
    height: 100,
    paddingVertical: 15, // 패딩 조정
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

export default ToliScreen;
