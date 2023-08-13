import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Chat } from "./chatSlice";

export interface activeChatProps {
  activeChat: Chat | null;
}

const initialState: activeChatProps = {
  activeChat: null,
};

const activeChatSlice = createSlice({
  name: "activeChat",
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<Chat>) => {
      state.activeChat = action?.payload;
    },
  },
});

export default activeChatSlice.reducer;
export const { setActiveChat } = activeChatSlice.actions;
