import React, { useEffect } from "react";
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

const deviceWidth = Dimensions.get("window").width;

const HomeSubScreen = ({ navigation }) => {
  const userName = useSelector((state) => state.user.name);
  const moveHome = () => {
    navigation.navigate("Home");
  };

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

  useEffect(() => {
    const onBackPress = () => {
      navigation.navigate("Home");
      return true; // 이벤트 처리 완료
    };

    // 컴포넌트가 마운트될 때 BackHandler 이벤트 추가
    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    // 컴포넌트가 언마운트될 때 BackHandler 이벤트 제거
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, [navigation]);

  // 할일 추천
  const renderCategoryItems = () => {
    return categories.map((category, index) => (
      <View key={index} style={styles.doit_container_middle}>
        <View style={styles.doit_container_middle_content}>
          <Text style={styles.doit_text_middle}>{category.title}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {category.images.map((image, idx) => (
            <TouchableOpacity key={idx} style={styles.doit_itemContainer}>
              <Image source={image} style={styles.doit_itemImg} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={moveHome}>
        <Image
          source={require("../../images/left.png")}
          style={styles.left_Image}
        />
      </TouchableOpacity>
      <ScrollView>{renderCategoryItems()}</ScrollView>
    </View>
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
  doit_container_middle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    height: "100%",
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
    width: 200,
    height: 200,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    borderRadius: 20,
  },
  doit_itemImg: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
});

export default HomeSubScreen;