import { AlignJustify } from "lucide-react";
import ChatBox from "./ChatContent/ChatBox";
import { useSelector } from "react-redux";
import { activeChatProps } from "@/features/activeChat";
import { Link } from "react-router-dom";

interface currentChatProps {
  activeChat: activeChatProps;
}

const Chat = () => {
  const { activeChat } = useSelector(
    (state: currentChatProps) => state.activeChat
  );
  const isGroup = activeChat?.isGroupChat;

  return (
    <div className="basis-[90%] ml-4 lg:basis-[70%] bg-muted flex flex-col rounded-md px-4 py-2">
      {activeChat ? (
        <>
          <div className="header flex justify-between items-center">
            <div className="font-medium text-xs sm:text-3xl">
              {isGroup ? `${activeChat.chatName}` : "ChatName"}
            </div>
            <Link to="/chats/settings">
              <AlignJustify className="h-6 w-6 duration-200 hover:text-white cursor-pointer" />
            </Link>
            {/* {isGroup ? <UpdateGroup /> : null} */}
          </div>
          <ChatBox />
        </>
      ) : (
        <div className="m-auto ">
          <span className="text-3xl font-sans font-semibold">Click A chat</span>
        </div>
      )}
    </div>
  );
};

export default Chat;
