import React from "react";
import { useSelector } from "react-redux";
import { newMessageRecievedProps } from "./ChatContent/ChatBox";
import { Bell } from "lucide-react";
import { Badge } from "../ui/badge";

export const Notifications = () => {
  const { notificationData } = useSelector(
    (state: newMessageRecievedProps) => state.commonData
  );
  console.log("notification: ", notificationData);
  return (
    <>
      {notificationData && notificationData.length > 0 && (
        <div className="relative cursor-pointer mr-2">
          <Badge className="absolute right-[-9px] top-[-9px]  bg-red-700 text-white rounded-[50%] text-[10px] w-4 h-5 justify-center">
            {notificationData.length}
          </Badge>
          <Bell className="h-6 w-6  " />
        </div>
      )}
    </>
  );
};
