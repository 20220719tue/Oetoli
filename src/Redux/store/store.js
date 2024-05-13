import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user_reducer";
import doitReducer from "../reducers/doit_reducer";

const rootReducer = {
  user: userReducer,
  doit: doitReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
