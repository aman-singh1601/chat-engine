import { Input } from "@/components/ui/input";
import axios from "@/axios";
import ScrollableFeed from "react-scrollable-feed";
import { Key, SendHorizonal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { activeChatProps } from "@/features/activeChat";
import { Chat, User } from "@/features/chatSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
} from "./messageLogic";

export interface currentChatProps {
  activeChat: activeChatProps;
}
export interface messageProps {
  chat: Chat;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
  sender: User;
}
const ChatBox = () => {
  const { activeChat } = useSelector(
    (state: currentChatProps) => state.activeChat
  );
  //@ts-ignore
  const { result }: User = JSON.parse(localStorage.getItem("profile"));
  const [loading, setLoading] = useState(false);

  const [content, setContent] = useState("");

  const [activeMessages, setactiveMessages] = useState<messageProps[] | []>([]);

  const activeChatMessage = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/messages/getmessages/${activeChat?._id}`
      );
      console.log(data);
      setactiveMessages(data);
    } catch (err: any) {
      console.log(err.response.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    activeChatMessage();
  }, [activeChat]);

  const handlePress = async (e: any) => {
    if (e.key === "Enter" && content.length > 0) {
      let chatId = activeChat?._id;
      axios
        .post("/messages/sendmessage", { content, chatId })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      setContent("");
    }
  };
  return (
    <div className="bg-white flex flex-col  rounded-md mt-2 w-full h-full">
      {/* <ScrollableFeed> */}
      <div className="w-full h-[565px] p-2 bg-muted flex flex-col mt-auto  overflow-y-auto no-scrollbar">
        {loading
          ? "loading..."
          : activeMessages &&
            activeMessages.map((m, i) => (
              <div className="flex space-x-1  items-center">
                {(isSameSender(activeMessages, m, i, result._id) ||
                  isLastMessage(activeMessages, i, result._id)) && (
                  <Avatar className="ml-4 h-8 w-8 mr-2">
                    <AvatarImage
                      src={`http://localhost:5000/uploads/profilePic/${m.sender.pic}`}
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      {m.sender.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`w-fit font-medium rounded-3xl my-1 p-2 px-3`}
                  style={{
                    backgroundColor: `${
                      m.sender._id === result._id ? `#ffffff` : `#141414`
                    }`,
                    color: `${
                      m.sender._id === result._id ? "#141414" : "#ffffff"
                    }`,
                    marginLeft: isSameSenderMargin(
                      activeMessages,
                      m,
                      i,
                      result._id
                    ),
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
      </div>
      {/* </ScrollableFeed> */}
      <div className="relative">
        <Input
          className="text-base font-sans "
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="type..."
          onKeyDown={handlePress}
        />
        <SendHorizonal className="h-6 w-6 absolute right-2 top-2 cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatBox;
