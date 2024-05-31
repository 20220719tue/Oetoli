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
  const categories = useSelector((state) => state.doit.doit);
  console.log(categories);

  const moveHome = () => {
    navigation.navigate("Home");
  };

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

  const renderCategoryItems = () => {
    return Object.entries(categories).map(
      ([categoryTitle, categoryItems], index) => (
        <View key={index} style={styles.doit_container_middle}>
          <View style={styles.doit_container_middle_content}>
            <Text style={styles.doit_text_middle}>{categoryTitle}</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.scroll_container}>
              {categoryItems.map((item, idx) => (
                <View key={idx} style={styles.view_container}>
                  <TouchableOpacity style={styles.doit_itemContainer}>
                    <Image
                      source={{ uri: item.img }}
                      style={styles.doit_itemImg}
                    />
                  </TouchableOpacity>
                  <Text style={styles.text}>{item.title}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )
    );
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
    alignItems: "flex-start",
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
  scroll_container: {
    flexDirection: "row",
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
  text: {},
  view_container: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default HomeSubScreen;
