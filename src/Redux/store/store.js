import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user_reducer";

const rootReducer = {
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
