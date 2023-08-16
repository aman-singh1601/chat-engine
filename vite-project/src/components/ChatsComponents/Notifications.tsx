import React from "react";
import { useSelector } from "react-redux";
import { newMessageRecievedProps } from "./ChatContent/ChatBox";

export const Notifications = () => {
  const { notificationData } = useSelector(
    (state: newMessageRecievedProps) => state.commonData
  );
  console.log("notification: ", notificationData);
  return <div>Notifications</div>;
};
