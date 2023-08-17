import { Input } from "@/components/ui/input";
import axios from "@/axios";
import ScrollableFeed from "react-scrollable-feed";
import { SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeChatProps } from "@/features/activeChat";
import { Chat, User } from "@/features/chatSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
} from "./messageLogic";
import { MessageSkeleton } from "./MessageBoxSkeleton";
import io from "socket.io-client";
import Lottie from "react-lottie-player";
import typingIndicator from "@/components/animations/typingIndicator.json";
import { commonDataProps, sendNotification } from "@/features/commonData";

export interface currentChatProps {
  activeChat: activeChatProps;
}
export interface newMessageRecievedProps {
  commonData: commonDataProps;
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

const ENDPOINT = "http://localhost:5000";

var socket: any, selectedChatCompare: any;

const ChatBox = () => {
  const dispatch = useDispatch();

  const { activeChat } = useSelector(
    (state: currentChatProps) => state.activeChat
  );
  const { notificationData } = useSelector(
    (state: newMessageRecievedProps) => state.commonData
  );
  //@ts-ignore
  const { result }: User = JSON.parse(localStorage.getItem("profile"));
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [activeMessages, setactiveMessages] = useState<messageProps[] | []>([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  //socket io
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", result);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);
  const activeChatMessage = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/messages/getmessages/${activeChat?._id}`
      );
      setactiveMessages(data);
    } catch (err: any) {
      console.log(err.response.data);
    } finally {
      setLoading(false);

      //join room
      socket.emit("join chat", activeChat?._id);
    }
  };
  useEffect(() => {
    activeChatMessage();
    selectedChatCompare = activeChat;
  }, [activeChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved: messageProps) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare?._id !== newMessageRecieved.chat._id
      ) {
        if (
          notificationData === null ||
          notificationData?.indexOf(newMessageRecieved) === -1
        ) {
          dispatch(sendNotification(newMessageRecieved));
        }
      } else {
        setactiveMessages([...activeMessages, newMessageRecieved]);
      }
    });
  });

  const handlePress = async (e: any) => {
    if (e.key === "Enter" && content.length > 0) {
      socket.emit("stop typing", activeChat?._id);
      let chatId = activeChat?._id;
      await axios
        .post("/messages/sendmessage", { content, chatId })
        .then((res) => {
          console.log(res);
          socket.emit("new message", res.data);
          setactiveMessages([...activeMessages, res.data]);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      setContent("");
    }
  };

  //typing
  const typingHandler = (e: any) => {
    setContent(e.target.value);

    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", activeChat?._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", activeChat?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div className="bg-white flex flex-col rounded-md mt-2 w-full h-[700px] sm:h-[600px] lg:h-[600px] ">
      <div className="w-full p-2 bg-muted flex flex-col justify-end overflow-y-auto no-scrollbar">
        <ScrollableFeed>
          {loading ? (
            <MessageSkeleton />
          ) : (
            activeMessages &&
            activeMessages.map((m, i) => (
              <div key={m._id} className="flex space-x-1  items-center">
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
            ))
          )}
        </ScrollableFeed>
      </div>
      <div className="relative">
        {istyping ? (
          <div className="absolute top-[-45px]">
            {" "}
            <Lottie
              loop
              animationData={typingIndicator}
              play
              style={{ width: 50, height: 50 }}
            />
          </div>
        ) : (
          <></>
        )}
        <Input
          className="text-base font-sans"
          value={content}
          onChange={(e) => typingHandler(e)}
          placeholder="type..."
          onKeyDown={handlePress}
        />
        <SendHorizonal className="h-6 w-6 absolute right-2 top-2 cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatBox;
