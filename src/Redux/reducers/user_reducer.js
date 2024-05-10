import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  photoURL: null,
  login: false,
  name: null,
  email: null,
  nickname: null,
  job: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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
} = userSlice.actions;
export default userSlice.reducer;
