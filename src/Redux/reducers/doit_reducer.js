import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doit: {
    건강: [
      {
        title: "물마시기",
        coin: 500,
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2Ftest.jpg?alt=media&token=a953491d-87de-4372-a30c-b37f8b142cfc",
      },
      {
        title: "공원산책하기",
        coin: 500,
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2Ftest.jpg?alt=media&token=a953491d-87de-4372-a30c-b37f8b142cfc",
      },
    ],
    일상생활: [
      {
        title: "아침기상",
        coin: 500,
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2Ftest.jpg?alt=media&token=a953491d-87de-4372-a30c-b37f8b142cfc",
      },
      {
        title: "방청소",
        coin: 500,
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2Ftest.jpg?alt=media&token=a953491d-87de-4372-a30c-b37f8b142cfc",
      },
    ],
    자기계발: [
      {
        title: "독서하기",
        coin: 500,
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2Ftest.jpg?alt=media&token=a953491d-87de-4372-a30c-b37f8b142cfc",
      },
      {
        title: "뉴스레터 읽기",
        coin: 500,
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2Ftest.jpg?alt=media&token=a953491d-87de-4372-a30c-b37f8b142cfc",
      },
    ],
    도전: [
      {
        title: "이력서 제출",
        coin: 500,
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2Ftest.jpg?alt=media&token=a953491d-87de-4372-a30c-b37f8b142cfc",
      },
    ],
  },
  doit_recommend: {
    건강: [
      {
        title: "물마시기",
        coin: 500,
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2Ftest.jpg?alt=media&token=a953491d-87de-4372-a30c-b37f8b142cfc",
      },
      {
        title: "공원산책하기",
        coin: 500,
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2Ftest.jpg?alt=media&token=a953491d-87de-4372-a30c-b37f8b142cfc",
      },
    ],
    일상생활: [
      {
        title: "아침기상",
        coin: 500,
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2Ftest.jpg?alt=media&token=a953491d-87de-4372-a30c-b37f8b142cfc",
      },
      {
        title: "방청소",
        coin: 500,
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2Ftest.jpg?alt=media&token=a953491d-87de-4372-a30c-b37f8b142cfc",
      },
    ],
    자기계발: [
      {
        title: "독서하기",
        coin: 500,
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2Ftest.jpg?alt=media&token=a953491d-87de-4372-a30c-b37f8b142cfc",
      },
      {
        title: "뉴스레터 읽기",
        coin: 500,
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2Ftest.jpg?alt=media&token=a953491d-87de-4372-a30c-b37f8b142cfc",
      },
    ],
    도전: [
      {
        title: "이력서 제출",
        coin: 500,
        img: "https://firebasestorage.googleapis.com/v0/b/oetoli-app-a754c.appspot.com/o/images-app%2Ftest.jpg?alt=media&token=a953491d-87de-4372-a30c-b37f8b142cfc",
      },
    ],
  },
};

const doitSlice = createSlice({
  name: "doit",
  initialState,
});

export default doitSlice.reducer;
