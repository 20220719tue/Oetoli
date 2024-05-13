import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import HomeSubScreen from "./HomeSubScreen";

const deviceWidth = Dimensions.get("window").width;

const HomeMainScreen = ({ navigation }) => {
  const categories = useSelector((state) => state.doit.doit_recommend);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const autoScrollInterval = 3000;

  // 배너 자동넘김
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (scrollViewRef.current) {
  //       setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
  //       scrollViewRef.current.scrollTo({
  //         x: deviceWidth * currentIndex,
  //         animated: true,
  //       });
  //     }
  //   }, autoScrollInterval);

  //   return () => clearInterval(intervalId);
  // }, [currentIndex]);

  const moveHomeSub = () => {
    // 더보기에서 서브페이지로 이동
    navigation.navigate("SubPage");
  };

  // 각 카테고리 별로 이미지를 한 줄에 표시하는 함수
  const renderCategoryItems = () => {
    return Object.entries(categories).map(
      ([categoryTitle, categoryItems], index) => (
        <View key={index} style={styles.doit_container_middle}>
          <View style={styles.doit_container_middle_content}>
            <Text style={styles.doit_text_middle}>{categoryTitle}</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categoryItems.map((item, idx) => (
              <TouchableOpacity key={idx} style={styles.doit_itemContainer}>
                <Image source={{ uri: item.img }} style={styles.doit_itemImg} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* 배너 */}
      <View style={styles.banner_container}>
        {/* 배너 스크롤 */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollTo({ x: deviceWidth * currentIndex })
          }
        >
          <TouchableOpacity style={styles.banner_itemContainer}>
            <Image
              source={require("../../images/test.jpg")}
              style={{ width: deviceWidth, height: 200 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.banner_itemContainer}>
            <Image
              source={require("../../images/test.jpg")}
              style={{ width: deviceWidth, height: 200 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.banner_itemContainer}>
            <Image
              source={require("../../images/test.jpg")}
              style={{ width: deviceWidth, height: 200 }}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* 채팅 */}
      <View style={styles.chat_buttonContainer}>
        <TouchableOpacity
          style={styles.chat_button}
          onPress={() => navigation.navigate("챗봇")}
        >
          <Text style={styles.chat_buttonText}>대화 시작하기</Text>
        </TouchableOpacity>
      </View>

      {/* 할일 추천 */}
      <View style={styles.doit_container}>
        {/* 할일 부분 - 더보기 */}
        <View style={styles.doit_container_top}>
          <Text style={styles.doit_container_top_left}>추천 할일</Text>
          <TouchableOpacity
            onPress={moveHomeSub}
            style={styles.doit_container_top_right}
          >
            <Text style={styles.doit_container_top_right_text}>더보기</Text>
          </TouchableOpacity>
        </View>

        {/* 할일 추천되는 부분 */}
        {renderCategoryItems()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  // 배너
  banner_container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  banner_scrollViewContent: {
    alignItems: "center",
  },
  banner_itemContainer: {
    width: deviceWidth,
    height: 200,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },

  // 챗봇 시작하기
  chat_buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginVertical: 40,
  },
  chat_button: {
    width: 250,
    height: 60,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#fff1ea",
  },
  chat_buttonText: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },

  // 할일 추천
  doit_container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    // marginVertical: 50,
  },
  doit_container_top: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  doit_container_top_left: {
    // 할일 텍스트 스타일
    flex: 1,
    marginStart: 20,
    fontSize: 17,
  },
  doit_container_top_right: {
    // 더보기 위치
    marginEnd: 20,
  },
  doit_container_top_right_text: {
    // 더보기 스타일
    fontSize: 17,
  },
  doit_container_middle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  doit_container_middle_content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  doit_text_middle: {
    // 건강, 자기계발... 텍스트
    flex: 1,
    marginStart: 20,
    fontSize: 15,
  },
  doit_itemContainer: {
    width: 170,
    height: 170,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    borderRadius: 20,
  },
  doit_itemImg: {
    width: 170,
    height: 170,
    borderRadius: 20,
  },
  separator: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    marginVertical: 30,
  },
});

export default HomeMainScreen;
