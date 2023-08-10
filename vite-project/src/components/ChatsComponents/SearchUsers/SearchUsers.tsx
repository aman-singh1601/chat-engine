import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

type searchUserProps = {
  name: string;
  email: string;
  pic: string;
  _id?: string;
};

const SearchUsers = ({ name, email, pic }: searchUserProps) => {
  return (
    <div className="flex space-x-2 bg-slate-100 rounded-md py-2 mb-2 items-center">
      <Avatar className="ml-4 h-10 w-10 mr-4">
        <AvatarImage
          src={`http://localhost:5000/uploads/profilePic/${pic}`}
          alt="@shadcn"
        />
        <AvatarFallback>{`${name[0].toUpperCase()}${name
          .split(" ")[1][0]
          .toUpperCase()}`}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-sans font-medium text-lg">
          {name.toUpperCase()}
        </span>
        <span className="text-sm">
          <strong>Email : </strong>
          {email}
        </span>
      </div>
    </div>
  );
};

export default SearchUsers;
