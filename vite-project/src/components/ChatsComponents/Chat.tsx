import { AlignJustify } from "lucide-react";
import ChatBox from "./ChatContent/ChatBox";
import { useSelector } from "react-redux";
import { activeChatProps } from "@/features/activeChat";
import { useState } from "react";
import { GroupSettings } from "./ChatContent/GroupSettings";

interface currentChatProps {
  activeChat: activeChatProps;
}

const Chat = () => {
  const { activeChat } = useSelector(
    (state: currentChatProps) => state.activeChat
  );
  const [groupSettings, setGroupSettigs] = useState(false);
  const isGroup = activeChat?.isGroupChat;

  return (
    <div className="basis-[100%] ml-4 lg:basis-[70%] bg-muted flex flex-col rounded-md px-4 py-2">
      <div className="header flex justify-between items-center">
        <div className="font-medium text-xs sm:text-3xl">
          {isGroup ? `${activeChat.chatName}` : "ChatName"}
        </div>
        <AlignJustify
          className="h-6 w-6 duration-200 hover:text-white cursor-pointer"
          onClick={() => setGroupSettigs(!groupSettings)}
        />
        {/* {isGroup ? <UpdateGroup /> : null} */}
      </div>
      {groupSettings ? <GroupSettings /> : <ChatBox />}
    </div>
  );
};

export default Chat;
