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
  arrayUnion,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { current } from "@reduxjs/toolkit";

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
      Coin: 100,
    });
    console.log("회원가입성공");
  } catch (error) {
    console.error("회원가입오류: ", error);
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
    console.error("사용자 정보 확인 오류:", error);
    return false; // 에러 발생 시 false 반환
  }
}

// 사용자 관련 데이터 삭제 함수
export async function deleteUserData(userId) {
  try {
    // // Firestore에서 사용자 정보 삭제
    await deleteDoc(doc(userCollection, userId));

    // 채팅 컬렉션 참조
    const chatCollectionRef = collection(userCollection, `${userId}/chat`);

    // 채팅 컬렉션의 모든 문서 가져오기
    const querySnapshot = await getDocs(chatCollectionRef);

    // 각 문서 삭제
    querySnapshot.docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log(`문서 ${doc.id} 삭제 완료`);
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
      console.log(userData);
      const { Name, Email, PhotoURL, Nickname, Job, Coin } = userData;
      return {
        exists: true,
        data: { Name, Email, PhotoURL, Nickname, Job, id, Coin },
      };
    } else {
      return { exists: false };
    }
  } catch (error) {
    console.error("사용자 정보를 가져오는데 오류가 생겼습니다.", error);
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

    console.log("사용자 대화를 성공적으로 저장했습니다.");

    return inputData;
  } catch (error) {
    console.error("사용자 대화 저장 오류:", error);
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
    console.error("모든 대화 정보를 가져오는데 오류 발생:", error);
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
    console.log("사용자 이미지를 성공적으로 저장했습니다.");
  } catch (error) {
    console.error("사용자 이미지 저장중 오류발생:", error);
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
    console.error("이전 이미지의 URL을 가져오는데 오류 발생:", error);
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
    console.log("성공적으로 닉네임을 수정하였습니다.");
  } catch (error) {
    console.error("닉네임 수정중 오류 발생:", error);
    throw error;
  }
}

// 직업 수정 함수
export async function updateJob(userId, newJob) {
  const userDocRef = doc(firestore, "users", userId); // 해당 사용자의 문서를 가져옵니다.

  try {
    await updateDoc(userDocRef, { Job: newJob }); // 해당 사용자의 Job을 새로운 직업으로 업데이트합니다.
    console.log("사용자 직업 수정을 완료했습니다.");
  } catch (error) {
    console.error("사용자 직업 수정 중 오류 발생:", error);
    throw error;
  }
}

// 할일 저장 함수
export async function inputDoit(
  userId,
  title,
  description,
  coin,
  auth,
  img,
  dateStart,
  dateEnd,
  check
) {
  try {
    // 채팅 컬렉션 참조
    const chatCollectionRef = collection(userCollection, `${userId}/doit`);

    const currentTime = Timestamp.now();

    // 대화 추가
    const docRef = await addDoc(chatCollectionRef, {
      userId,
      title,
      description,
      coin,
      auth,
      img,
      dateStart,
      dateEnd,
      timestamp: currentTime,
      week: [],
      completed: false,
      check,
    });

    const id = docRef.id;

    const inputData = {
      id,
      userId,
      title,
      description,
      coin,
      auth,
      img,
      dateStart,
      dateEnd,
      week: [],
      completed: false,
      check,
    };

    console.log("사용자 할일을 성공적으로 저장했습니다.");
    return inputData;
  } catch (error) {
    console.error("사용자 할일 저장 오류:", error);
  }
}

const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1);
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

// 할일 업데이트 하기
export async function UpdateAllDoit(userId) {
  // await UpdateAllDoit(userId);
  try {
    // 할일 컬렉션 참조
    const doitCollectionRef = collection(userCollection, `${userId}/doit`);
    // 사용자 정보 가져오기
    const userDocRef = doc(firestore, "users", userId);

    // 사용자 정보 문서 가져오기
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data();

    // 사용자 정보에서 현재 코인 양 가져오기
    let currentCoin = userData.Coin;

    // 할일 컬렉션의 모든 문서 가져오기
    const querySnapshot = await getDocs(doitCollectionRef);

    const currentDate = getCurrentDate().split("-");

    // 각 문서의 데이터와 ID를 배열로 변환하여 반환
    const doit = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        auth: data.auth,
        coin: data.coin,
        dateEnd: data.dateEnd,
        dateStart: data.dateStart,
        description: data.description,
        img: data.img,
        timestamp: data.timestamp,
        title: data.title,
        week: data.week,
        check: data.check,
        completed: data.completed,
      };
    });

    for (const item of doit) {
      const dateEnd = item.dateEnd.split("-");

      // 이전 할일이 업데이트 되지 않았을 경우
      dateEnd[1].length === 1 ? (dateEnd[1] = "0" + dateEnd[1]) : 0;
      dateEnd[2].length === 1 ? (dateEnd[2] = "0" + dateEnd[2]) : 0;

      currentDate[1].length === 1 ? (currentDate[1] = "0" + currentDate[1]) : 0;
      currentDate[2].length === 1 ? (currentDate[2] = "0" + currentDate[2]) : 0;

      end = Number(dateEnd[0] + dateEnd[1] + dateEnd[2]);
      cur = Number(currentDate[0] + currentDate[1] + currentDate[2]);
      console.log(end);
      console.log("현재 " + cur);

      if (end < cur && item.completed === false) {
        if (item.week.length >= item.check) {
          // 해당 사용자의 코인 업데이트
          await updateDoc(userDocRef, { Coin: (currentCoin += item.coin) });
        }
        // 할일 완료 상태 업데이트
        const docRef = doc(doitCollectionRef, item.id);
        await updateDoc(docRef, {
          completed: true,
        });
      }
    }

    // 사용자 문서에 업데이트된 코인 반영

    console.log("할일 문서 업데이트가 완료되었습니다.");
  } catch (error) {
    console.error("모든 대화 정보를 가져오는데 오류 발생:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
}

// 할일 정보 가져오기
export async function getAllDoit(userId) {
  try {
    await UpdateAllDoit(userId);
    // 할일 컬렉션 참조
    const chatCollectionRef = collection(userCollection, `${userId}/doit`);

    // 할일 컬렉션의 모든 문서 가져오기
    const querySnapshot = await getDocs(chatCollectionRef);

    // 각 문서의 데이터와 ID를 배열로 변환하여 반환
    const doit = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        auth: data.auth,
        coin: data.coin,
        dateEnd: data.dateEnd,
        dateStart: data.dateStart,
        description: data.description,
        img: data.img,
        timestamp: data.timestamp,
        title: data.title,
        week: data.week,
        check: data.check,
        completed: data.completed,
      };
    });
    doit.sort((a, b) => b.timestamp - a.timestamp);

    console.log("모든 대화");
    return doit;
  } catch (error) {
    console.error("모든 대화 정보를 가져오는데 오류 발생:", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
}

// 인증완료시 week배열에 오늘 날짜 추가
export async function inputTodayDoit(userId, doitId, date) {
  // Firestore의 사용자 컬렉션 참조
  const userCollectionRef = collection(userCollection, `${userId}/doit`);

  // 특정 doitId 문서 참조
  const doitDocRef = doc(userCollectionRef, doitId);

  try {
    // 문서 업데이트: week 배열에 새로운 날짜 추가
    await updateDoc(doitDocRef, {
      week: arrayUnion(date),
    });
    console.log("인증완료 날짜를 추가하였습니다.");
  } catch (error) {
    console.error("인증완료 날짜 추가에 오류발생: ", error);
  }
}
