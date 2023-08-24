import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { setActiveChat } from "@/features/activeChat";
import { Chat } from "@/features/chatSlice";
import { Users, Users2 } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";

const UserCard = ({
  chat,
  setChatSelected,
}: {
  chat: Chat;
  setChatSelected: Dispatch<SetStateAction<boolean>>;
}) => {
  const isGroup = chat.isGroupChat;
  const { result } = JSON.parse(localStorage.getItem("profile") || "");
  const pic = isGroup
    ? "groupchat"
    : result.email === chat.users[0]?.email
    ? `${chat.users[1].pic}`
    : `${chat.users[0].pic}`;

  const dispatch = useDispatch();

  const handleActiveChat = (chat: Chat) => {
    dispatch(setActiveChat(chat));
  };
  const handleClick = () => {
    handleActiveChat(chat);
    setChatSelected(true);
  };
  return (
    <div
      className="flex relative space-x-2 bg-white duration-200 hover:bg-slate-500 active:bg-slate-500 rounded-md py-2 mb-2 w-full items-center hover:cursor-pointer"
      onClick={handleClick}
    >
      <Avatar className="ml-4 h-10 w-10 mr-4">
        <AvatarImage
          src={`http://localhost:5000/uploads/profilePic/${pic}`}
          alt="@shadcn"
        />
        <AvatarFallback>{isGroup && <Users />}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-sans font-medium text-lg">
          {/* name */}
          {isGroup
            ? chat.chatName
            : result.email === chat.users[0]?.email
            ? `${chat.users[1].name}`
            : `${chat.users[0].name}`}
        </span>
        <span className="text-sm">
          <strong>Message : </strong>
          {chat?.latestMessage?.content}
        </span>
      </div>
      {chat.isGroupChat && (
        <Badge className="absolute right-2 top-6 rounded-[100%]">
          <Users2 className="h-4 w-4" />
        </Badge>
      )}
    </div>
  );
};

export const MemoizedUserCard = React.memo(UserCard);
