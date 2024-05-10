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
          <Text
            style={
              selectedButton === "button1"
                ? styles.selectedButton
                : styles.buttonText
            }
          >
            Button 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "button2" && styles.selectedButton,
          ]}
          onPress={() => setSelectedButton("button2")}
        >
          <Text
            style={
              selectedButton === "button2"
                ? styles.selectedButton
                : styles.buttonText
            }
          >
            Button 2
          </Text>
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
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "green",
    borderRadius: 30,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
    borderRadius: 25,
  },
  selectedButton: {
    backgroundColor: "white",
  },
  buttonText: {
    color: "white",
  },
  selectedButton_Text: {
    color: "black",
  },
  scrollView: {
    marginBottom: 20,
  },
  longButton: {
    backgroundColor: "#DDDDDD",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
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
