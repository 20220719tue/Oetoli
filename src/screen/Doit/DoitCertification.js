import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const DoitCertification = ({ route, navigation }) => {
  const { item } = route.params;
  const [dateList, setDateList] = useState([]);
  const [week, setWeek] = useState([...item.week]);

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

  const onMoveDoitCheck = () => {
    if (item.title === "공원산책하기") {
      navigation.navigate("DoitGps", { item });
    } else if (item.auth === "사진인증") {
      navigation.navigate("DoitImageAI", { item });
    }
  };

  // 시작 날짜부터 종료 날짜까지의 모든 날짜를 배열에 추가
  useEffect(() => {
    setWeek([...item.week]);
    const startDate = new Date(item.dateStart);
    const endDate = new Date(item.dateEnd);
    const days = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const dateString = `${month}/${day}`;
      const fullDateString = `${year}-${month}-${day}`;
      days.push({ dateString, fullDateString });
      currentDate.setDate(currentDate.getDate() + 1); // 다음 날짜로 이동
    }
    setDateList(days);
  }, [item.dateStart, item.dateEnd, item.week]);

  return (
    <View style={styles.container}>
      <View style={styles.title_container}>
        <Text style={styles.text}>{item.title}</Text>
      </View>
      <View style={styles.container_des}>
        <Text>
          {item.check}일 이상 인증 시 {item.coin}코인
        </Text>
      </View>
      <View style={styles.title_container}>
        <Text style={styles.text}>인증방식: {item.auth}</Text>
      </View>
      <Text style={styles.button_text}>현재 진행상황</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.scrollContainer}
      >
        {dateList.map((dateObj, index) => (
          <View key={index} style={styles.dateContainer}>
            <Text>{dateObj.dateString}</Text>
            <Text>
              {week.includes(dateObj.fullDateString) ? "인증완료" : "미인증"}
            </Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.button_container}
        onPress={onMoveDoitCheck}
      >
        <Text style={styles.button_text}>인증하기</Text>
      </TouchableOpacity>
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
  text: {
    fontSize: 18,
  },
  title_container: {
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    textAlign: "center",
    width: "80%",
    backgroundColor: "pink",
    marginVertical: 10,
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  dateContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  container_des: {
    marginVertical: 20,
    backgroundColor: "white",
    textAlign: "right",
  },
  text_des: {
    textAlign: "right",
  },
  button_container: {
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    textAlign: "center",
    width: "80%",
    backgroundColor: "pink",
    marginVertical: 10,
  },
  button_text: {
    fontSize: 17,
  },
});

export default DoitCertification;
