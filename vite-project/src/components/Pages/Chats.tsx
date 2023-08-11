import { useState, useEffect } from "react";
import MainNav from "../ChatsComponents/MainNav";
import MyChats from "../ChatsComponents/Mychats/MyChats";
import Chat from "../ChatsComponents/Chat";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authSignin } from "@/features/userSlice";

const Chats = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // @ts-ignore
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(authSignin(user));
  }, []);

  return (
    <div className="flex flex-col ">
      <MainNav
        name={user?.result?.name}
        email={user?.result?.email}
        pic={user?.result?.pic}
      />
      <div className="flex mt-4">
        <MyChats />
        <Chat />
      </div>
    </div>
  );
};

export default Chats;
