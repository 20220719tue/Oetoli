import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { UpdateAllDoit, getAllDoit } from "../../lib/user";
import { useDispatch, useSelector } from "react-redux";
import { clearAddList } from "../../Redux/reducers/doit_reducer";

const DoitScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [selectedButton, setSelectedButton] = useState("button1");
  const [nowDoitList, setNowDoitList] = useState([]);
  const [completedDoitList, setCompletedDoitList] = useState([]);
  const userId = useSelector((state) => state.user.userId);
  const add_list = useSelector((state) => state.doit.add_list);

  const onMoveCertification = (item) => {
    navigation.navigate("DoitCertification", { item });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await getAllDoit(userId);

        setNowDoitList([]);
        setCompletedDoitList([]);

        list.forEach((value) => {
          if (!value.completed) setNowDoitList((list) => [...list, value]);
          else setCompletedDoitList((list) => [...list, value]);
        });
        console.log(nowDoitList);
      } catch (error) {
        console.error("할일 업데이트 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (add_list.length > 0) {
      // 배열의 길이가 0보다 큰 경우에만 처리
      setNowDoitList((prevList) => [...prevList, ...add_list]); // 배열 해체 사용
      dispatch(clearAddList());
    }
  }, [add_list, dispatch]);

  const moveNewDoit = () => {
    navigation.navigate("NewDoit");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "button1" && styles.selectedButton,
          ]}
          onPress={() => setSelectedButton("button1")}
        >
          <Text style={styles.buttonText}>진행중</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "button2" && styles.selectedButton,
          ]}
          onPress={() => setSelectedButton("button2")}
        >
          <Text style={styles.buttonText}>완료</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {selectedButton === "button1"
          ? nowDoitList.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.longButton}
                onPress={() => onMoveCertification(item)}
              >
                <Text>☐ {item.title}</Text>
              </TouchableOpacity>
            ))
          : completedDoitList.map((item, index) => (
              <TouchableOpacity key={index} style={styles.longButton}>
                <Text>{item.title}</Text>
              </TouchableOpacity>
            ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={moveNewDoit}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#f2eeeb",
  },
  button: {
    padding: 10,
    width: "30%",
    alignItems: "center",
    marginHorizontal: "10%",
    borderTopWidth: 2,
    borderTopColor: "transparent",
  },
  selectedButton: {
    backgroundColor: "#f2eeeb",
    borderBottomWidth: 2,
    borderBottomColor: "#c9a48f",
  },
  buttonText: {
    color: "black",
  },
  scrollView: {
    padding: 15,
    backgroundColor: "white",
  },
  longButton: {
    backgroundColor: "#DDDDDD",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#3498db",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 24,
    color: "#fff",
  },
});

export default DoitScreen;
