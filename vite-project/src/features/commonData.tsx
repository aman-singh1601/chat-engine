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
      } else if (state.notificationData[0]._id !== action?.payload?._id) {
        state.notificationData.unshift(action.payload);
      }
    },
    seen: (state, action: PayloadAction<messageProps>) => {
      if (state.notificationData !== null) {
        const newList = state.notificationData.filter(
          (notification) => notification._id !== action.payload._id
        );
        if (newList.length == 0) {
          state.notificationData = null;
        } else state.notificationData = newList;
      }

      console.log("commonData : ", state.notificationData);
    },
  },
});

export default commonDataSlice.reducer;

export const { sendNotification, seen } = commonDataSlice.actions;
