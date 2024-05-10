import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage, firestore } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

// 사용자 이미지를 스토리지에 업로드하는 함수
export async function uploadImageToStorage(userId, imageUri) {
  try {
    // 스토리지 레퍼런스 생성
    const storageRef = ref(storage, `images/${userId}`);

    // 이미지를 Blob으로 변환
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // 이미지 업로드
    await uploadBytes(storageRef, blob);

    // 업로드된 파일의 다운로드 URL 가져오기
    const downloadURL = await getDownloadURL(storageRef);

    // 사용자 데이터 업데이트
    const userDocRef = doc(firestore, "users", userId);
    await updateDoc(userDocRef, {
      PhotoURL: downloadURL,
    });

    console.log("Image uploaded successfully");

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image: ", error);
  }
}
