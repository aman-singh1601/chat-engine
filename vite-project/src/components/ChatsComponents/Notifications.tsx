import { useDispatch, useSelector } from "react-redux";
import {
  currentChatProps,
  messageProps,
  newMessageRecievedProps,
} from "./ChatContent/ChatBox";
import { Bell } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { setActiveChat } from "@/features/activeChat";
import { seen } from "@/features/commonData";

export const Notifications = () => {
  const dispatch = useDispatch();
  const { notificationData } = useSelector(
    (state: newMessageRecievedProps) => state.commonData
  );
  const { activeChat } = useSelector(
    (state: currentChatProps) => state.activeChat
  );
  console.log("notification: ", notificationData);
  const handleClick = (notification: messageProps) => {
    dispatch(setActiveChat(notification.chat));
    dispatch(seen(notification));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {notificationData && notificationData.length > 0 && (
          <div className="relative cursor-pointer mr-2">
            <Badge className="absolute right-[-9px] top-[-9px]  bg-red-700 text-white rounded-[50%] text-[10px] w-4 h-5 justify-center">
              {notificationData.length}
            </Badge>
            <Bell className="h-6 w-6  " />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-10 opacity-[50%] backdrop-blur-sm">
        <DropdownMenuLabel className="font-sans text-black">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="w-[90%] m-auto bg-slate-900" />

        {notificationData?.map((notification) => (
          <>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleClick(notification)}
            >{`New message from ${
              notification.chat.isGroupChat
                ? notification.chat.chatName
                : notification.sender.name
            }`}</DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
