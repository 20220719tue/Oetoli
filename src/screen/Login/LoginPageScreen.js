import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { createUser, deleteUserData, getUserAll } from "../../lib/user";
import { WEBCLIENT_ID } from "../../config/Firebase";
import { auth } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  checkLogin,
  getPhotoURL,
  getUserEmail,
  getUserId,
  getUserJob,
  getUserName,
  getUserNickname,
} from "../../Redux/reducers/user_reducer";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.user.userId);
  const login = useSelector((state) => state.user.login);
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEBCLIENT_ID,
    });

    checkLoginStatus(); // 앱이 시작될 때 로그인 상태 확인
  }, []);

  // 앱이 시작될 때 로그인 상태 확인 함수
  const checkLoginStatus = async () => {
    try {
      const userString = await AsyncStorage.getItem("userInfo");
      if (userString) {
        const user = JSON.parse(userString);
        setUserInfo(user);

        // 정보를 리덕스에 저장
        dispatch(checkLogin(true));
        dispatch(getUserId(user.data.id));
        dispatch(getPhotoURL(user.data.PhotoURL));
        dispatch(getUserName(user.data.Name));
        dispatch(getUserEmail(user.data.Email));
        dispatch(getUserNickname(user.data.Nickname));
        dispatch(getUserJob(user.data.Job));

        // 메인 페이지로 이동
        navigation.navigate("Main");
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
      setError();

      // 데이터베이스에서 사용자 정보 가져오기
      const userExists = await getUserAll(user.user.id);

      if (userExists.exists) {
        // Redux에 사용자 정보 dispatch
        dispatch(getUserId(userExists.data.id));
        dispatch(getPhotoURL(userExists.data.PhotoURL));
        dispatch(getUserName(userExists.data.Name));
        dispatch(getUserEmail(userExists.data.Email));
        dispatch(getUserNickname(userExists.data.Nickname));
        dispatch(getUserJob(userExists.data.Job));
        dispatch(checkLogin(true));

        // 로그인 상태를 AsyncStorage에 저장

        await AsyncStorage.setItem("userInfo", JSON.stringify(userExists));

        // Main으로 이동
        navigation.navigate("Main");
      } else {
        // 유저 정보가 없는 경우 LoginNicname으로 이동
        dispatch(getUserId(user.user.id));
        dispatch(getPhotoURL(user.user.photo));
        dispatch(getUserName(user.user.name));
        dispatch(getUserEmail(user.user.email));
        navigation.navigate("LoginNicname");
      }
    } catch (e) {
      setError(e);
    }
  };

  const logout = async () => {
    setUserInfo();
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();

    // 로그아웃 시 AsyncStorage에서 로그인 정보 제거
    await AsyncStorage.removeItem("userInfo");
  };

  const handleDeleteAccount = async () => {
    if (userInfo) {
      // 사용자 계정 삭제 함수 호출
      await deleteUserData(userid);
      setUserInfo(); // 사용자 정보 초기화
    }
  };

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
        onPress={signin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: "80%",
  },
});

export default LoginScreen;
