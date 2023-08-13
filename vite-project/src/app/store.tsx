import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/userSlice";
import chatReducer from "../features/chatSlice";
import activeChatReducer from "@/features/activeChat";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chats: chatReducer,
    activeChat: activeChatReducer,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
