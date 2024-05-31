import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { BackHandler, Image, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

// 컴포넌트
import HomeScreen from "../Home/HomeScreen";
import ChatbotScreen from "../Chatbot/ChatbotScreen";
import DoitScreen from "../Doit/DoitScreen";
import InformationScreen from "../Informaiton/InformationScreen";
import ToliScreen from "../Toli/ToliScreen";
import HomeSubScreen from "../Home/HomeSubScreen";
import NewDoitScreen from "../Doit/NewDoitScreen";
import DoitCertification from "../Doit/DoitCertification";
import DoitGpsScreen from "../Doit/DoitGpsScreen";
import DoitImageAIScreen from "../Doit/DoitImageAIScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 로코 컴포넌트
const Logo = () => (
  <Image
    source={require("../../images/logo.png")}
    style={{ width: 50, height: 50 }}
  />
);

// 동그란 버튼 컴포넌트
const RoundButton = ({ onPress, imageURL }) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={{
        uri: imageURL,
      }}
      style={{ width: 30, height: 30, borderRadius: 30, marginEnd: 15 }}
    />
  </TouchableOpacity>
);

// 홈화면 스택구조
const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubPage"
        component={HomeSubScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// 할일화면 스택구조
const DoitStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Doit"
        component={DoitScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewDoit"
        component={NewDoitScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoitCertification"
        component={DoitCertification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoitGps"
        component={DoitGpsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoitImageAI"
        component={DoitImageAIScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function MainScreen() {
  const navigation = useNavigation();
  const PhotoURL = useSelector((state) => state.user.photoURL);

  //뒤로가기하면 앱종료
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // 뒤로 가기 버튼 누르면 앱 종료
        BackHandler.exitApp();
        return true;
      };

      // 뒤로 가기 버튼 이벤트 등록
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      // 언마운트될 때 이벤트 해제
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const getTabBarIcon = (routeName, focused) => {
    let icon;

    if (routeName === "홈") {
      icon = focused ? (
        <Image
          source={require("../../images/home_black.png")}
          style={{ width: 30, height: 30, marginTop: 13 }}
        />
      ) : (
        <Image
          source={require("../../images/home_gray.png")}
          style={{ width: 30, height: 30, marginTop: 13 }}
        />
      );
    } else if (routeName === "챗봇") {
      icon = focused ? (
        <Image
          source={require("../../images/chat_black.png")}
          style={{ width: 30, height: 30, marginTop: 13 }}
        />
      ) : (
        <Image
          source={require("../../images/chat_gray.png")}
          style={{ width: 30, height: 30, marginTop: 13 }}
        />
      );
    } else if (routeName === "할일") {
      icon = focused ? (
        <Image
          source={require("../../images/doit_black.png")}
          style={{ width: 30, height: 30, marginTop: 13 }}
        />
      ) : (
        <Image
          source={require("../../images/doit_gray.png")}
          style={{ width: 30, height: 30, marginTop: 13 }}
        />
      );
    } else if (routeName === "상담") {
      icon = focused ? (
        <Image
          source={require("../../images/information_black.png")}
          style={{ width: 30, height: 30, marginTop: 15 }}
        />
      ) : (
        <Image
          source={require("../../images/information_gray.png")}
          style={{ width: 30, height: 30, marginTop: 15 }}
        />
      );
    } else if (routeName === "토리") {
      icon = focused ? (
        <Image
          source={require("../../images/toli_black.png")}
          style={{ width: 44, height: 44, marginTop: 12 }}
        />
      ) : (
        <Image
          source={require("../../images/toli_gray.png")}
          style={{ width: 40, height: 40, marginTop: 12 }}
        />
      );
    }
    return icon;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerTitle: (props) => <Logo {...props} />, // 로고를 헤더 타이틀로 설정
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "bold",
          justifyContent: "center",
          textAlign: "center",
        },
        tabBarItemStyle: {
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
        },
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name="홈"
        component={HomeStackScreen}
        options={{
          title: "",
          tabBarIcon: ({ color, size, focused }) =>
            getTabBarIcon("홈", focused),
          headerRight: () => (
            <RoundButton
              onPress={() => {
                navigation.navigate("MyPage");
              }}
              imageURL={PhotoURL}
            />
          ),
        }}
      />
      <Tab.Screen
        name="챗봇"
        component={ChatbotScreen}
        options={{
          title: "",
          tabBarIcon: ({ color, size, focused }) =>
            getTabBarIcon("챗봇", focused),
          headerRight: () => (
            <RoundButton
              onPress={() => {
                navigation.navigate("MyPage");
              }}
              imageURL={PhotoURL}
            />
          ),
        }}
      />
      <Tab.Screen
        name="할일"
        component={DoitStackScreen}
        options={{
          title: "",
          tabBarIcon: ({ color, size, focused }) =>
            getTabBarIcon("할일", focused),
          headerRight: () => (
            <RoundButton
              onPress={() => {
                navigation.navigate("MyPage");
              }}
              imageURL={PhotoURL}
            />
          ),
        }}
      />
      <Tab.Screen
        name="상담"
        component={InformationScreen}
        options={{
          title: "",
          tabBarIcon: ({ color, size, focused }) =>
            getTabBarIcon("상담", focused),
          headerRight: () => (
            <RoundButton
              onPress={() => {
                navigation.navigate("MyPage");
              }}
              imageURL={PhotoURL}
            />
          ),
        }}
      />
      <Tab.Screen
        name="토리"
        component={ToliScreen}
        options={{
          title: "",
          tabBarIcon: ({ color, size, focused }) =>
            getTabBarIcon("토리", focused),
          headerRight: () => (
            <RoundButton
              onPress={() => {
                navigation.navigate("MyPage");
              }}
              imageURL={PhotoURL}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
