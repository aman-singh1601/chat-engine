import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "@/axios";
import { useDispatch } from "react-redux";
import { chatsAddChat } from "@/features/chatSlice";
import { useState } from "react";
import { SheetClose } from "@/components/ui/sheet";

type searchUserProps = {
  name: string;
  email: string;
  pic: string;
  userId?: string;
};

const SearchUsers = ({ name, email, pic, userId }: searchUserProps) => {
  const dispatch = useDispatch();
  const accessChat = async () => {
    try {
      console.log(userId);
      const { data } = await axios.post("/chats/createchat", { userId });
      const newChat = data;
      if (!("isChat" in newChat)) {
        dispatch(chatsAddChat(data));
      } else {
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <SheetClose
      className="flex space-x-2 bg-slate-100 duration-300 hover:bg-slate-500 rounded-md py-2 mb-2 w-full items-center hover:cursor-pointer"
      onClick={accessChat}
    >
      <Avatar className="ml-4 h-10 w-10 mr-4">
        <AvatarImage
          src={`http://localhost:5000/uploads/profilePic/${pic}`}
          alt="@shadcn"
        />
        <AvatarFallback>{`${name[0]?.toUpperCase()}${name
          ?.split(" ")[1][0]
          ?.toUpperCase()}`}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-sans font-medium text-lg">
          {name?.toUpperCase()}
        </span>
        <span className="text-sm">
          <strong>Email : </strong>
          {email}
        </span>
      </div>
    </SheetClose>
  );
};

export default SearchUsers;
