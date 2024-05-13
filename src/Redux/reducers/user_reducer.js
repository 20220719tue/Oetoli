import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  photoURL: null,
  login: false,
  name: null,
  email: null,
  nickname: null,
  job: null,
  coin: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { userId, photoURL, name, email, nickname, job, coin } =
        action.payload;
      state.userId = userId;
      state.photoURL = photoURL;
      state.name = name;
      state.email = email;
      state.nickname = nickname;
      state.job = job;
      state.coin = coin;
      state.login = true;
    },
    getUserId: (state, action) => {
      state.userId = action.payload;
    },
    getPhotoURL: (state, action) => {
      state.photoURL = action.payload;
    },
    getUserName: (state, action) => {
      state.name = action.payload;
    },
    getUserEmail: (state, action) => {
      state.email = action.payload;
    },
    getUserNickname: (state, action) => {
      state.nickname = action.payload;
    },
    getUserJob: (state, action) => {
      state.job = action.payload;
    },
    getUserCoin: (state, action) => {
      state.coin = action.payload;
    },
    checkLogin: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const {
  getUserId,
  getPhotoURL,
  checkLogin,
  getUserName,
  getUserEmail,
  getUserNickname,
  getUserJob,
  getUserCoin,
  loginUser,
} = userSlice.actions;
export default userSlice.reducer;
