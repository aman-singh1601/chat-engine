import { AlignJustify, ArrowLeft } from "lucide-react";
import ChatBox from "./ChatContent/ChatBox";
import { useSelector } from "react-redux";
import { activeChatProps } from "@/features/activeChat";
import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

interface currentChatProps {
  activeChat: activeChatProps;
}

const Chat = ({
  chatSelected,
  setChatSelected,
}: {
  chatSelected: boolean;
  setChatSelected: Dispatch<SetStateAction<boolean>>;
}) => {
  const { activeChat } = useSelector(
    (state: currentChatProps) => state.activeChat
  );
  const isGroup = activeChat?.isGroupChat;

  return (
    <div
      className={` ${
        chatSelected ? `visible w-[100vw] px-2` : `invisible w-0 h-0`
      } md:visible  md:w-auto md:h-auto md:basis-[90%] md:ml-4 lg:basis-[70%] bg-muted md:flex flex-col rounded-md md:px-4 py-2`}
    >
      {activeChat ? (
        <>
          <div className="header flex justify-between items-center">
            <div className="flex space-x-1 items-center">
              <ArrowLeft
                className="h-5 w-5 md:hidden"
                onClick={() => setChatSelected(false)}
              />
              <div className="font-medium text-xl sm:text-3xl">
                {isGroup ? `${activeChat.chatName}` : "ChatName"}
              </div>
            </div>
            <Link to="/chats/settings">
              <AlignJustify className="h-6 w-6 duration-200 hover:text-white cursor-pointer" />
            </Link>
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
