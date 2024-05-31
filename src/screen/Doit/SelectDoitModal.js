import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
} from "react-native";
import { inputDoit } from "../../lib/user";
import { useSelector } from "react-redux";

const SelectDoitModal = ({ isVisible, onClose, doit }) => {
  const userId = useSelector((state) => state.user.userId);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showPeriodError, setShowPeriodError] = useState(false); // 기간 선택 오류 메시지 표시 여부

  // 기간 설정 핸들러
  const handlePeriodPress = (period) => {
    setSelectedPeriod(period);
    setShowPeriodError(false);
  };

  // 모달닫기 핸들러
  const handleCloseModal = async () => {
    if (!selectedPeriod) {
      setShowPeriodError(true); // 오류 메시지 표시
    } else {
      let start, end, newDoit, today;
      today = new Date();
      start =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      if (selectedPeriod === "일주일") {
        today.setDate(today.getDate() + 7);
      } else if (selectedPeriod === "이주일") {
        today.setDate(today.getDate() + 14);
      }

      end =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      console.log(start);
      console.log(end);

      newDoit = await inputDoit(
        userId,
        doit.title,
        doit.description,
        (coin = selectedPeriod === "일주일" ? doit.coin : doit.coin * 2),
        doit.auth,
        doit.img,
        start,
        end,
        (check = selectedPeriod === "일주일" ? 5 : 10)
      );

      onClose(newDoit); // 새로 추가된 할일 데이터 전달
    }
  };

  const handleClose = () => {
    onClose(null); // 선택된 요일 전달
    // 선택된 요일 초기화
  };

  useEffect(() => {
    // 모달이 열릴 때 선택한 날짜 초기화
    if (isVisible) {
      setSelectedPeriod(null);
      setStartDate(null);
      setEndDate(null);
      setShowPeriodError(false); // 오류 메시지 감추기
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalContainer} onPress={handleClose}>
        <TouchableNativeFeedback onPress={() => {}}>
          <View style={styles.contentContainer}>
            {doit && (
              <>
                <View style={styles.X_Container}>
                  <Text style={styles.title}>{doit.title}</Text>
                  <TouchableOpacity onPress={handleClose}>
                    <Text style={styles.X_Text}>X</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.text}>{doit.description}</Text>
                <Text style={styles.button_title}>인증 방식</Text>
                <Text style={styles.text}>{doit.auth}</Text>
              </>
            )}

            {/* 선택 */}
            <Text style={styles.button_title}>선택</Text>

            {/* 일주일 */}
            <View style={styles.button_Container}>
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedPeriod === "일주일" && styles.selected,
                ]}
                onPress={() => handlePeriodPress("일주일")}
              >
                <Text style={styles.choice_period_text}>일주일</Text>
                <Text>5일이상 인증</Text>
                {doit && <Text>{doit.coin}코인</Text>}
              </TouchableOpacity>

              {/* 이주일 */}
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedPeriod === "이주일" && styles.selected,
                ]}
                onPress={() => handlePeriodPress("이주일")}
              >
                <Text style={styles.choice_period_text}>이주일</Text>
                <Text>10일이상 인증</Text>
                {doit && <Text>{doit.coin * 2}코인</Text>}
              </TouchableOpacity>
            </View>

            {/* 기간 선택 오류 메시지 */}
            {showPeriodError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  위 선택지 중 하나를 선택하세요
                </Text>
              </View>
            )}

            {/* 만들기 버튼 */}
            <View>
              <TouchableOpacity
                style={styles.button_save}
                onPress={handleCloseModal}
              >
                <Text style={styles.button_save_text}>만들기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableNativeFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 모달 배경색 및 투명도 조절
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    marginBottom: 10,
  },
  button_title: {
    fontSize: 17,
    fontWeight: "bold",
    marginVertical: 10,
    marginTop: 20,
  },
  button_Container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 20,
    paddingHorizontal: 20,
    backgroundColor: "pink",
    borderRadius: 15,
    marginHorizontal: 10,
    width: 140,
    height: 130,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  button_day: {
    padding: 10,
    backgroundColor: "pink",
    borderRadius: 25,
    marginHorizontal: 7,
  },
  button_save: {
    padding: 10,
    backgroundColor: "pink",
    borderRadius: 25,
    marginHorizontal: 7,
    marginTop: 20,
  },
  button_save_text: {
    textAlign: "center",
  },
  button_day_calendar: {
    padding: 10,
    backgroundColor: "gray",
    borderRadius: 10,
    width: 110,
    marginHorizontal: 7,
  },
  contentContainer: {
    padding: 20,
    borderRadius: 15,
    width: "95%",
    backgroundColor: "white",
  },
  selected: {
    backgroundColor: "lightblue",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  errorContainer: {
    alignItems: "center", // 세로 중앙 정렬
    justifyContent: "space-between",
    textAlign: "center",
  },
  X_Container: {
    flexDirection: "row", // 가로로 배치하기 위해
    alignItems: "center", // 세로 중앙 정렬
    justifyContent: "space-between",
  },
  X_Text: {
    fontSize: 30,
    marginTop: -20,
    fontWeight: "bold",
  },
  choice_period_text: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default SelectDoitModal;
