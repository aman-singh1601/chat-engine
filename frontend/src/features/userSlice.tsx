import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserData {
  userData: allData | null;
}
interface allData {
  result: User;
  token: string;
}
interface User {
  _id: string;
  name: string;
  email: string;
  pic: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const initialState: UserData = {
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSignin: (state, action: PayloadAction<allData>) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.userData = action?.payload;
    },
    authLogout: (state) => {
      localStorage.clear();
      state.userData = null;
    },
  },
});

export default authSlice.reducer;
export const { authSignin, authLogout } = authSlice.actions;
