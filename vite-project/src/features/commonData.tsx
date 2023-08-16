import { messageProps } from "@/components/ChatsComponents/ChatContent/ChatBox";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface commonDataProps {
  notificationData: messageProps[] | null;
}

const initialState: commonDataProps = {
  notificationData: null,
};
const commonDataSlice = createSlice({
  name: "commonData",
  initialState,
  reducers: {
    sendNotification: (state, action: PayloadAction<messageProps>) => {
      if (state.notificationData === null) {
        state.notificationData = [action.payload];
      } else if (state.notificationData[0]._id !== action.payload._id) {
        state.notificationData.unshift(action.payload);
      }
    },
  },
});

export default commonDataSlice.reducer;

export const { sendNotification } = commonDataSlice.actions;
