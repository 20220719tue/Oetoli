import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import callChatGPTAPI from "./callChatGPTAPI";
import { inputChat, getAllChat, deleteChat } from "../../lib/user";
import { useSelector } from "react-redux";
import DeleteModal from "./deleteModal";

const ChatbotScreen = () => {
  const scrollViewRef = useRef();
  const scrollToBottom = () => {
    //스크롤을 맨 밑으로
    scrollViewRef.current.scrollToEnd({ animated: true });
  };
  const [messages, setMessages] = useState([]); //메시지 배열
  const [inputMessage, setInputMessage] = useState(""); //메시지 입력
  const [selectedMessageId, setSelectedMessageId] = useState(null); // 선택된 메시지 설정
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId !== null && userId !== undefined) {
        const user = await getAllChat(userId);
        setMessages(user); // 전체 대화 목록을 설정
        console.log(user);
      }
    };
    fetchUser();
    scrollToBottom();
  }, []);

  //메시지 보내고 저장
  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;
    // 사용자의 메시지를 전송하고 메시지 목록에 추가
    const savedUserMessage = await inputChat(userId, inputMessage, 0);
    setMessages((prevMessages) => [...prevMessages, savedUserMessage]);
    setInputMessage(""); // 입력 필드 초기화
    console.log("입력한 메시지 " + savedUserMessage);

    // 챗봇 응답 받기
    const response = await callChatGPTAPI(inputMessage);
    // // 챗봇 메시지 저장
    const savedBotMessage = await inputChat(userId, response, 1);
    setMessages((prevMessages) => [...prevMessages, savedBotMessage]);
    console.log("챗봇 메시지 " + savedBotMessage);
  };

  // 메시지 삭제
  const deleteMessage = async (chatId) => {
    try {
      console.log(userId, chatId);
      await deleteChat(userId, chatId);
      // 대화 배열에서 해당 대화 제거
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== chatId)
      );
    } catch (error) {
      console.error("대화 삭제 중 오류 발생:", error);
    }
  };

  // 메시지 눌렀을 때
  const showMessageId = (messageId) => {
    console.log("Selected Message ID:", messageId);
    setSelectedMessageId(messageId); // 선택된 메시지 ID 설정
  };

  let prevDate = null; //날짜 비교시 사용하는 변수

  return (
    <View style={styles.container}>
      {/* 메시지 출력란 */}
      <ScrollView
        contentContainerStyle={styles.messagesContainer}
        ref={scrollViewRef}
      >
        {messages.map((message, index) => {
          // 이전 메시지의 날짜와 현재 메시지의 날짜를 비교하여 날짜 표시 여부 결정
          const showDate = message.date !== prevDate;
          prevDate = message.date;

          return (
            <View key={index}>
              {/* 날짜를 표시하는 조건 */}
              {showDate && <Text style={styles.dateText}>{message.date}</Text>}

              <TouchableOpacity
                onPress={() => showMessageId(message.id)} // 메시지를 누를 때 id 출력 및 선택
              >
                <View
                  style={[
                    styles.messageContainer,
                    message.role === 0
                      ? styles.leftMessageContainer
                      : styles.rightMessageContainer,
                  ]}
                >
                  <Text
                    style={[
                      styles.timeText,
                      message.role === 1 ? styles.hiddenTime : null,
                    ]}
                  >
                    {message.time}
                  </Text>

                  <View style={styles.messageContent}>
                    <Text style={styles.messageText}>{message.content}</Text>
                  </View>
                  <Text
                    style={[
                      styles.timeText,
                      message.role === 0 ? styles.hiddenTime : null,
                    ]}
                  >
                    {message.time}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      {/* 메시지 입력란 및 전송 버튼 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="메시지를 입력하세요"
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
      {/* 삭제 모달 */}
      <DeleteModal
        visible={selectedMessageId !== null}
        onCancel={() => setSelectedMessageId(null)}
        onDelete={deleteMessage} // 삭제 함수 전달
        userId={userId}
        chatId={selectedMessageId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //전체 View 스타일
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  messagesContainer: {
    //메시지 출력란, 스크롤뷰 스타일
    flexGrow: 1,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "flex-end",
  },
  leftMessageContainer: {
    //사용자
    justifyContent: "flex-end", // 사용자 대화를 오른쪽에
  },
  rightMessageContainer: {
    //챗봇
    justifyContent: "flex-start", // 챗봇 대화를 왼쪽에
  },
  hiddenTime: {
    display: "none", // 시간을 숨김
  },
  messageContent: {
    //메시지 스타일
    padding: 10,
    borderRadius: 8,
    maxWidth: "80%",
    backgroundColor: "#007AFF", //대화 배경색
  },
  messageText: {
    //메시지 텍스트 색상
    color: "#FFFFFF",
  },
  timeText: {
    //시간 스타일
    marginLeft: 10,
    marginRight: 10,
    color: "#808080",
    fontSize: 10,
  },
  inputContainer: {
    //메시지 입력란
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    //메시지 입력란
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    //전송버튼
    backgroundColor: "#007AFF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    //전송 버튼 텍스트
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  dateText: {
    //날짜 스타일
    marginBottom: 20,
    alignItems: "center", // 수평 가운데 정렬
    alignSelf: "center", // 수직 가운데 정렬
  },
});

export default ChatbotScreen;
