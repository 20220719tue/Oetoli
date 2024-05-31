import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doit: {
    건강: [
      {
        title: "물마시기",
        description: "물을 마시는 할일입니다",
        coin: 100,
        auth: "사진인증",
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-31%20130926.png?alt=media&token=f33ba49d-3756-4c4a-95fb-f0e56c9af49d",
      },
      {
        title: "공원산책하기",
        description: "주변 공원을 산책하는 할일입니다",
        coin: 200,
        auth: "gps 인증",
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-31%20131050.png?alt=media&token=fab43f19-b93b-4c94-acaf-28a5419ab4f8",
      },
    ],
    일상생활: [
      {
        title: "아침기상",
        description: "10시전까지 일어는 할일 입니다",
        coin: 100,
        auth: "사진인증",
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-31%20131750.png?alt=media&token=bd4b2274-1d34-4893-8392-4042a41e4e71",
      },
      {
        title: "방청소",
        description: "벙을 청소하는 할일 입니다",
        coin: 200,
        auth: "사진인증",
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-31%20131909.png?alt=media&token=11abc0ef-1322-4ca2-8fcf-434caea2b464",
      },
    ],
    자기계발: [
      {
        title: "독서하기",
        description: "책을 읽는 할일입니다",
        coin: 100,
        auth: "사진인증",
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-31%20131223.png?alt=media&token=94024f0e-676a-4729-a6bf-1b317557fafe",
      },
      {
        title: "뉴스레터 읽기",
        description: "뉴스레터를 읽는 할일 입니다",
        coin: 200,
        auth: "사진인증",
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-31%20131356.png?alt=media&token=34206e3d-635e-4209-9995-6a3039cb4acc",
      },
    ],
    도전: [
      {
        title: "이력서 제출",
        description: "이력서를 제출하는 할일 입니다",
        coin: 500,
        auth: "사진인증",
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-31%20131609.png?alt=media&token=35a14ed1-9db5-4e53-9263-c762d4398d65",
      },
    ],
  },
  doit_recommend: {
    건강: [
      {
        title: "물마시기",
        description: "물을 마시는 할일입니다",
        coin: 100,
        auth: "사진인증",
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-31%20130926.png?alt=media&token=f33ba49d-3756-4c4a-95fb-f0e56c9af49d",
      },
      {
        title: "공원산책하기",
        description: "주변 공원을 산책하는 할일입니다",
        coin: 200,
        auth: "gps 인증",
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-31%20131050.png?alt=media&token=fab43f19-b93b-4c94-acaf-28a5419ab4f8",
      },
    ],
    일상생활: [
      {
        title: "아침기상",
        description: "10시전까지 일어는 할일 입니다",
        coin: 100,
        auth: "사진인증",
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-31%20131750.png?alt=media&token=bd4b2274-1d34-4893-8392-4042a41e4e71",
      },
      {
        title: "방청소",
        description: "벙을 청소하는 할일 입니다",
        coin: 200,
        auth: "사진인증",
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-31%20131909.png?alt=media&token=11abc0ef-1322-4ca2-8fcf-434caea2b464",
      },
    ],
    자기계발: [
      {
        title: "독서하기",
        description: "책을 읽는 할일입니다",
        coin: 100,
        auth: "사진인증",
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-31%20131223.png?alt=media&token=94024f0e-676a-4729-a6bf-1b317557fafe",
      },
      {
        title: "뉴스레터 읽기",
        description: "뉴스레터를 읽는 할일 입니다",
        coin: 200,
        auth: "사진인증",
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-31%20131356.png?alt=media&token=34206e3d-635e-4209-9995-6a3039cb4acc",
      },
    ],
    도전: [
      {
        title: "이력서 제출",
        description: "이력서를 제출하는 할일 입니다",
        coin: 500,
        auth: "사진인증",
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-31%20131609.png?alt=media&token=35a14ed1-9db5-4e53-9263-c762d4398d65",
      },
    ],
  },
  add_list: [],
};

const doitSlice = createSlice({
  name: "doit",
  initialState,
  reducers: {
    addDoit: (state, action) => {
      state.add_list = [...state.add_list, action.payload];
    },
    clearAddList: (state) => {
      state.add_list = [];
    },
  },
});

export const { addDoit, clearAddList } = doitSlice.actions;
export default doitSlice.reducer;
