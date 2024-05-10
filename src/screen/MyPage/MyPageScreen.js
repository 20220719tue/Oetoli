import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import {
  checkLogin,
  getPhotoURL,
  getUserJob,
} from "../../Redux/reducers/user_reducer";
import { deleteUserData, updateJob } from "../../lib/user";
import * as ImagePicker from "expo-image-picker";
import DeleteAccountModal from "./DeleteAccountModal"; // 모달 컴포넌트 불러오기
import NickNameModifyModal from "./NickNameModifyModal";
import JobModifyModal from "./JobModifyModal";
import { uploadImageToStorage } from "../../lib/image";

const MyPageScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const job = useSelector((state) => state.user.job);
  const photoURL = useSelector((state) => state.user.photoURL);
  const userId = useSelector((state) => state.user.userId);
  const nickname = useSelector((state) => state.user.nickname);

  const [profileImage, setProfileImage] = useState(photoURL);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false); // 모달의 가시성 상태
  const [isNickNameModalVisible, setNickNameModalVisible] = useState(false); // 닉네임 수정 모달 가시성 상태
  const [isJobModalVisible, setJobModalVisible] = useState(false);

  // 로그아웃
  const logout = async () => {
    // 로그아웃 관련 작업 수행
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
    dispatch(checkLogin(false));
    navigation.navigate("Login");
    // 로그아웃 시 AsyncStorage에서 로그인 정보 제거
    await AsyncStorage.removeItem("userInfo");
  };

  const handleDeleteAccount = async () => {
    // 사용자 계정 삭제 함수 호출
    await deleteUserData(userId);
    await AsyncStorage.removeItem("userInfo");
    dispatch(checkLogin(false));
    setDeleteModalVisible(false);
    navigation.navigate("GoodBye");
  };

  const onPressPickFile = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // 선택한 이미지를 업로드하고 프로필 사진으로 설정
      setProfileImage(result.assets[0].uri);
      uploadImageToStorage(userId, result.assets[0].uri)
        .then((downloadURL) => {
          // 이미지 업로드가 성공한 경우, 다운로드 URL을 사용하여 처리
          dispatch(getPhotoURL(downloadURL));
          console.log(
            "Image uploaded successfully. Download URL:",
            downloadURL
          );
        })
        .catch((error) => {
          // 이미지 업로드가 실패한 경우, 에러 처리
          console.error("Error uploading image:", error);
        });
    }
  });

  const openJobModal = () => {
    setJobModalVisible(true);
  };

  // JobModifyModal에서 수정된 직업을 저장
  const saveJobModal = async (newJob) => {
    try {
      // 직업을 저장하는 로직을 구현
      console.log("새로운 직업:", newJob);
      await updateJob(userId, newJob);
      dispatch(getUserJob(newJob));
      setJobModalVisible(false);
    } catch (error) {
      console.error("직업을 저장하는 동안 오류가 발생했습니다:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageButton} onPress={onPressPickFile}>
        <Image source={{ uri: photoURL }} style={styles.profileImage} />
      </TouchableOpacity>

      {/* 닉네임 수정 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setNickNameModalVisible(true)}
      >
        <Text style={styles.nameText}>닉네임</Text>
        <Text style={styles.nameTextValue}>{nickname}</Text>
        <Image
          source={require("../../images/right.png")}
          style={{ width: 20, height: 20, alignSelf: "center" }}
        />
      </TouchableOpacity>

      {/* 닉네임 수정 모달 */}
      <Modal
        visible={isNickNameModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setNickNameModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <NickNameModifyModal
            onSave={(newNickname) => {
              // 수정된 닉네임 저장 함수
              // 여기에 수정된 닉네임을 저장하는 함수 작성
              setNickNameModalVisible(false); // 모달 닫기
            }}
            onClose={() => setNickNameModalVisible(false)}
          />
        </View>
      </Modal>

      {/* 직업 수정 버튼 */}
      <TouchableOpacity style={styles.button} onPress={openJobModal}>
        <Text style={styles.nameText}>직업</Text>
        <Text style={styles.nameTextValue}>{job}</Text>
        <Image
          source={require("../../images/right.png")}
          style={{ width: 20, height: 20, alignSelf: "center" }}
        />
      </TouchableOpacity>

      {/* 직업 수정 모달 */}
      <Modal
        visible={isJobModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setJobModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <JobModifyModal
            visible={isJobModalVisible}
            onClose={() => setJobModalVisible(false)}
            onSave={saveJobModal}
          />
        </View>
      </Modal>
      {/* 로그아웃 버튼 */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
      {/* 회원탈퇴 버튼 */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => setDeleteModalVisible(true)} // 모달 표시
      >
        <Text style={styles.deleteText}>회원탈퇴</Text>
      </TouchableOpacity>
      {/* 회원탈퇴 모달 */}
      <DeleteAccountModal
        visible={isDeleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)} // 모달 닫기
        onDelete={handleDeleteAccount} // 회원탈퇴 함수 호출
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#eee",
    marginBottom: 10,
  },
  imageButton: {
    borderRadius: 50,
    overflow: "hidden",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginStart: 10,
  },
  nameTextValue: {
    fontSize: 18,
    alignSelf: "center",
    marginStart: 110,
  },
  jobText: {
    fontSize: 16,
  },
  logoutButton: {
    width: "80%",
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#3498db", // 파란색
    marginBottom: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // 흰색 텍스트
    textAlign: "center",
  },
  deleteButton: {
    width: "80%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "transparent", // 투명 배경

    borderColor: "#e74c3c", // 빨간색
  },
  deleteText: {
    marginTop: 40,
    fontSize: 13,
    color: "#e74c3c", // 빨간색 텍스트
    textAlign: "center",
  },
});

export default MyPageScreen;
