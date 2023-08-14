import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Chat, User } from "./chatSlice";

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
    deleteUser: (state, action: PayloadAction<User>) => {
      let newUsersList: User[] | undefined = state.activeChat?.users.filter(
        (user) => user.email !== action.payload.email
      );
      if (newUsersList && state.activeChat)
        state.activeChat.users = newUsersList;

      console.log("slice  : ", state.activeChat?.users);
    },
    renameGroup: (state, action: PayloadAction<string>) => {
      if (state.activeChat) state.activeChat.chatName = action?.payload;
    },
  },
});

export default activeChatSlice.reducer;
export const { setActiveChat, deleteUser, renameGroup } =
  activeChatSlice.actions;
