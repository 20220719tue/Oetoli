import {
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";

// 사용자 컬렉션 참조
const userCollection = collection(firestore, "users");

// 사용자 정보 데이터베이스에 저장 함수
export async function createUser({ id, Name, Email, PhotoURL, Job, Nickname }) {
  try {
    // 사용자 문서 설정
    await setDoc(doc(userCollection, id), {
      id,
      Name,
      Email,
      PhotoURL,
      Nickname,
      Job,
    });
    console.log("User created successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// 사용자 존재 확인 함수
export async function doesUserExist(id) {
  try {
    const userDocRef = doc(userCollection, id);
    const docSnapshot = await getDoc(userDocRef);
    return docSnapshot.exists(); // 해당 문서가 존재하면 true, 아니면 false 반환
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false; // 에러 발생 시 false 반환
  }
}

// 사용자 관련 데이터 삭제 함수
export async function deleteUserData(userId) {
  try {
    // Firestore에서 사용자 정보 삭제
    await deleteDoc(doc(userCollection, userId));

    // 사용자의 대화 데이터 가져오기
    const userChatCollectionRef = collection(firestore, `user/${userId}/chat`);
    const querySnapshot = await getDocs(userChatCollectionRef);

    // 대화 데이터를 모두 삭제
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    console.log("사용자 관련 데이터가 성공적으로 삭제되었습니다.");
  } catch (error) {
    console.error("사용자 관련 데이터 삭제 중 오류 발생:", error);
  }
}

// 유저 정보 가져오는 함수
export async function getUserAll(id) {
  try {
    const userDocRef = doc(userCollection, id);
    const docSnapshot = await getDoc(userDocRef);
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const { Name, Email, PhotoURL, Nickname, Job } = userData;
      return {
        exists: true,
        data: { Name, Email, PhotoURL, Nickname, Job, id },
      };
    } else {
      return { exists: false };
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    return { exists: false };
  }
}

// 대화 저장
function getCurrentDateTime() {
  const currentDate = new Date();
  const year = currentDate.getFullYear(); // 년도
  const month = currentDate.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줌)
  const day = currentDate.getDate(); // 일
  const hours = currentDate.getHours(); // 시간 (24시간 형식)
  const minutes = currentDate.getMinutes(); // 분

  // 날짜와 시간을 원하는 형식으로 포맷
  const formattedDate = `${year}년 ${month}월 ${day}일`;
  const formattedTime = `${hours % 12 || 12}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${hours >= 12 ? "오후" : "오전"}`;

  return { formattedDate, formattedTime };
}

// 대화 저장
export async function inputChat(userId, content, role) {
  try {
    // 채팅 컬렉션 참조
    const chatCollectionRef = collection(userCollection, `${userId}/chat`);

    const currentTime = Timestamp.now();

    // 현재 날짜와 시간을 가져옴
    const { formattedDate, formattedTime } = getCurrentDateTime();

    const formattedTime_format = formattedTime.split(" ").reverse().join(" ");

    // 대화 추가
    const docRef = await addDoc(chatCollectionRef, {
      userId,
      content,
      role,
      date: formattedDate,
      time: formattedTime_format,
      timestamp: currentTime,
    });

    const id = docRef.id;

    const inputData = {
      id,
      userId,
      content,
      role,
      date: formattedDate,
      time: formattedTime_format,
      timestamp: currentTime,
    };

    console.log("Content added successfully");

    return inputData;
  } catch (error) {
    console.error("Error adding content:", error);
  }
}

// 대화 정보 가져오기
export async function getAllChat(userId) {
  try {
    // 채팅 컬렉션 참조
    const chatCollectionRef = collection(userCollection, `${userId}/chat`);

    // 채팅 컬렉션의 모든 문서 가져오기
    const querySnapshot = await getDocs(chatCollectionRef);

    // 각 문서의 데이터와 ID를 배열로 변환하여 반환
    const chats = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        content: data.content,
        role: data.role,
        date: data.date,
        time: data.time,
        timestamp: data.timestamp,
      };
    });

    chats.sort((a, b) => a.timestamp - b.timestamp);

    return chats;
  } catch (error) {
    console.error("Error fetching user chat:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
}

// 대화 삭제
export async function deleteChat(userId, chatId) {
  try {
    const chatCollectionRef = doc(userCollection, `${userId}/chat/${chatId}`);

    // // 대화 문서 삭제
    await deleteDoc(chatCollectionRef);

    console.log("대화가 성공적으로 삭제되었습니다.");
  } catch (error) {
    console.error("대화 삭제 중 오류 발생:", error);
  }
}

// 사용자의 프로필 이미지 URL 업데이트 함수
export async function updateUserPhotoURL(userId, newPhotoURL) {
  try {
    const userDocRef = doc(firestore, "users", userId);
    await updateDoc(userDocRef, {
      photoURL: newPhotoURL, // 사용자 정보에 새로운 프로필 이미지 URL 업데이트
    });
    console.log("User photo URL updated successfully!");
  } catch (error) {
    console.error("Error updating user photo URL:", error);
    throw error;
  }
}

// 사용자 데이터베이스에서 이전 이미지의 URL을 가져오는 함수
export async function getPreviousImageUrl(userId) {
  try {
    const userData = await getUserData(userId);
    if (userData && userData.photoURL) {
      return userData.photoURL;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting previous image URL:", error);
    return null;
  }
}

// 닉네임 수정 함수
export async function updateNickname(userId, newNickname) {
  try {
    const userDocRef = doc(userCollection, userId);
    await updateDoc(userDocRef, {
      Nickname: newNickname, // 사용자 정보에 새로운 닉네임 업데이트
    });
    console.log("User nickname updated successfully!");
  } catch (error) {
    console.error("Error updating user nickname:", error);
    throw error;
  }
}

// 직업 수정 함수
export async function updateJob(userId, newJob) {
  const userDocRef = doc(firestore, "users", userId); // 해당 사용자의 문서를 가져옵니다.

  try {
    await updateDoc(userDocRef, { Job: newJob }); // 해당 사용자의 Job을 새로운 직업으로 업데이트합니다.
    console.log("User job updated successfully!");
  } catch (error) {
    console.error("Error updating user job:", error);
    throw error;
  }
}
