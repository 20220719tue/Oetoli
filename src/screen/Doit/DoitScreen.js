import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const DoitScreen = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState("button1");

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
        <TouchableOpacity style={styles.longButton}>
          <Text>Long Button 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.longButton}>
          <Text>Long Button 2</Text>
        </TouchableOpacity>
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
