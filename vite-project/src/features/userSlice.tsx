import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};
type logoutProps = {
  state?: any;
  action?: any;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSignin: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.userData = action?.payload;
      console.log("userSlice", action?.payload);
    },
    authLogout: (state, action) => {
      localStorage.clear();
      state.userData = null;
    },
  },
});

export default authSlice.reducer;
export const { authSignin, authLogout } = authSlice.actions;
