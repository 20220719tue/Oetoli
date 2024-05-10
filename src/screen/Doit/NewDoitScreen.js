import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  BackHandler,
} from "react-native";
import { useSelector } from "react-redux";
import SelectDoitModal from "./SelectDoitModal"; // 모달 컴포넌트 import

const deviceWidth = Dimensions.get("window").width;

const NewDoitScreen = ({ navigation }) => {
  const userName = useSelector((state) => state.user.name);
  const moveHome = () => {
    navigation.navigate("Doit");
  };

  // 모달 관련 상태
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 이미지 클릭 시 모달 열기
  const openModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    const onBackPress = () => {
      navigation.navigate("Doit");
      return true; // 이벤트 처리 완료
    };

    // 컴포넌트가 마운트될 때 BackHandler 이벤트 추가
    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    // 컴포넌트가 언마운트될 때 BackHandler 이벤트 제거
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, [navigation]);

  // 할일 목록
  const categories = [
    {
      title: "건강",
      images: [
        require("../../images/test.jpg"),
        require("../../images/test.jpg"),
        require("../../images/test.jpg"),
      ],
    },
    {
      title: "일상생활",
      images: [
        require("../../images/test.jpg"),
        require("../../images/test.jpg"),
        require("../../images/test.jpg"),
      ],
    },
    {
      title: "자기계발",
      images: [
        require("../../images/test.jpg"),
        require("../../images/test.jpg"),
        require("../../images/test.jpg"),
      ],
    },
    {
      title: "도전",
      images: [
        require("../../images/test.jpg"),
        require("../../images/test.jpg"),
        require("../../images/test.jpg"),
      ],
    },
  ];

  // 할일 추천
  const renderCategoryItems = () => {
    return categories.map((category, index) => (
      <View key={index} style={styles.doit_container_middle}>
        <View style={styles.doit_container_middle_content}>
          <Text style={styles.doit_text_middle}>{category.title}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {category.images.map((image, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.doit_itemContainer}
              onPress={openModal}
            >
              <Image source={image} style={styles.doit_itemImg} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity onPress={moveHome}>
          <Image
            source={require("../../images/left.png")}
            style={styles.left_Image}
          />
        </TouchableOpacity>
        <Text style={styles.text_upStyle}>오직, {userName}님만을</Text>
        <Text style={styles.text_upStyle}>위해 준비했어요</Text>
        <Image
          source={require("../../images/test.jpg")}
          style={styles.middle_Image}
        />
        <Text style={styles.text_middleStyle}>
          {userName}님의 이야기를 듣고, {userName}님에게 도움을 주기 위해 저희가
          준비했어요.
        </Text>
      </View>
      {renderCategoryItems()}
      {/* 모달 */}
      <SelectDoitModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  left_Image: {
    width: 30,
    height: 30,
    marginStart: 10,
    marginBottom: 10,
  },
  text_upStyle: {
    marginStart: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  middle_Image: {
    width: deviceWidth,
    height: 200,
    marginVertical: 10,
  },
  text_middleStyle: {
    fontSize: 15,
    marginHorizontal: 50,
    marginBottom: 50,
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
});

export default NewDoitScreen;
