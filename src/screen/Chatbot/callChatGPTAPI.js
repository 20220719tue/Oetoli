import axios from "axios";
import { OPENAI_KEY } from "../../config/OpenAPI_Key";

const callChatGPTAPI = async (message) => {
  const apiKey = OPENAI_KEY;
  const endpoint = "https://api.openai.com/v1/chat/completions"; // ChatGPT API 엔드포인트

  try {
    const response = await axios.post(
      endpoint,
      {
        model: "ft:gpt-3.5-turbo-1106:personal::97EmmyNa", // 사용할 ChatGPT 모델 지정
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const data = response.data;
    const completion = data.choices[0].message.content; // ChatGPT의 응답 가져오기

    return completion;
  } catch (error) {
    console.error("Error calling ChatGPT API:", error);
    return "Error: Failed to get response from ChatGPT API";
  }
};

export default callChatGPTAPI;
