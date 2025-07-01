import { createSlice } from "@reduxjs/toolkit";
import { LoginInfo } from "../types/user";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userInfo: {} as LoginInfo,
  },
  reducers: {
    initUserInfo: (state, {payload}) => {
      state.userInfo = payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.userInfo = {} as LoginInfo;
    },
    login: (state, {payload}) => {
      state.isLogin = true;
      state.userInfo = payload;
    },
  },
});

export default userSlice.reducer;