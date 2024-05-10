import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./Redux/store/store";
import MainScreen from "./screen/Main/MainScreen";
import LoginScreen from "./screen/Login/LoginPageScreen";
import LoginNicname from "./screen/Login/LoginNicname";
import LoginJobScreen from "./screen/Login/LoginJobScreen";
import LoginSignUpScreen from "./screen/Login/LoginSingupScreen";
import MyPageScreen from "./screen/MyPage/MyPageScreen";
import GoodByeScreen from "./screen/MyPage/GoodByeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginJob"
            component={LoginJobScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginNicname"
            component={LoginNicname}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginSignUp"
            component={LoginSignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MyPage"
            component={MyPageScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GoodBye"
            component={GoodByeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
