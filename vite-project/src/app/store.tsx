import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/userSlice";
import chatReducer from "../features/chatSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chats: chatReducer,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
