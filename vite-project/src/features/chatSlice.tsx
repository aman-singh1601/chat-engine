import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Chats {
  chats: Chat[] | null;
}

export interface Chat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  groupAmin?: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  pic: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const initialState: Chats = {
  chats: null,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    chatsGetAll: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action?.payload;
    },
    chatsAddChat: (state, action: PayloadAction<Chat>) => {
      state.chats?.unshift(action?.payload);
      console.log(state.chats);
    },
  },
});

export default chatsSlice.reducer;
export const { chatsAddChat, chatsGetAll } = chatsSlice.actions;
