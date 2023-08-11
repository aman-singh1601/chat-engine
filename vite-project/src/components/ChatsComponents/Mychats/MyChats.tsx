import { Button } from "@/components/ui/button";
import axios from "@/axios";
import { Plus } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chat, Chats, chatsGetAll } from "@/features/chatSlice";
import UserCard from "./UserCard";
import { UserCardSkeleton } from "./UserCardSkeleton";
// import Chat from "../Chat";

const MyChats = () => {
  const dispatch = useDispatch();

  const { result } = JSON.parse(localStorage.getItem("profile") || "");
  // const [userChats, setUserChats] = useState<Chat[] | null>(null);
  const [loading, setLoading] = useState(true);
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/chats/fetchChats");
      dispatch(chatsGetAll(data));
      // console.log(userChats);
    } catch (err: any) {
      console.log(err.response.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  var userChats = useSelector((state: Chats) => state.chats);
  return (
    <div className=" basis-[40%] lg:basis-[30%] bg-muted flex flex-col ">
      <div className="flex justify-between mt-2">
        <div className="font-mono text-xl font-medium ml-4">My Chats</div>
        <Button variant="outline" className="h-fit mr-4">
          New Group Chat
          <Plus className="h-8 w-8 pl-2" />
        </Button>
      </div>
      <div className="w-[90%] mt-4 m-auto h-[600px] rounded-sm ">
        {!loading ? (
          userChats?.chats?.map((userChat, index) => {
            return (
              <UserCard
                key={index}
                name={
                  userChat?.users[1]?.name !== result?.name
                    ? userChat?.users[1]?.name
                    : userChat?.users[0]?.name
                }
              />
            );
          })
        ) : (
          <UserCardSkeleton />
        )}
      </div>
    </div>
  );
};

export default MyChats;
