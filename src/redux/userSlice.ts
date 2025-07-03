import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../types/user";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userInfo: {} as UserInfo,
  },
  reducers: {
    initUserInfo: (state, {payload}) => {
      state.userInfo = payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.userInfo = {} as UserInfo;
    },
    login: (state, {payload}) => {
      state.isLogin = true;
      state.userInfo = payload;
    },
  },
});

export default userSlice.reducer;
export const { initUserInfo, logout, login } = userSlice.actions;