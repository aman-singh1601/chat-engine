import { useEffect, useState } from "react";
import MainNav from "../ChatsComponents/MainNav";
import MyChats from "../ChatsComponents/Mychats/MyChats";
import Chat from "../ChatsComponents/Chat";

import { useDispatch } from "react-redux";
import { authSignin } from "@/features/userSlice";

const Chats = () => {
  const dispatch = useDispatch();
  const [chatSelected, setChatSelected] = useState(false);
  // @ts-ignore
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(authSignin(user));
  }, []);
  return (
    <div className="flex flex-col h-[100vh] md:h-screen ">
      <MainNav
        name={user?.result?.name}
        email={user?.result?.email}
        pic={user?.result?.pic}
      />
      <div className="flex mt-4 h-[100%]   md:h-[90vh]">
        <MyChats
          chatSelected={chatSelected}
          setChatSelected={setChatSelected}
        />
        <Chat chatSelected={chatSelected} setChatSelected={setChatSelected} />
      </div>
    </div>
  );
};

export default Chats;
