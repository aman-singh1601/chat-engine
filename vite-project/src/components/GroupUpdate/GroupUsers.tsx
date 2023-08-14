import { Dispatch, SetStateAction } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@/features/chatSlice";
import { Trash } from "lucide-react";

export const GroupUser = ({
  user,
  DeletedUsers,
  setDeletedUsers,
}: {
  user: User;
  DeletedUsers: User | null;
  setDeletedUsers: Dispatch<SetStateAction<User | null>>;
}) => {
  return (
    <div className="relative bg-slate-100 duration-300 hover:bg-slate-500 rounded-md py-2 w-full md:w-[50%] lg:w-[30%] pl-6  mb-2 items-center">
      <div className="flex items-center">
        <Avatar className="ml-4 h-8 w-8 mr-8">
          <AvatarImage
            src={`http://localhost:5000/uploads/profilePic/${user.pic}`}
            alt="@shadcn"
          />
          <AvatarFallback>
            {`${user.name[0]?.toUpperCase()}${user.name
              ?.split(" ")[1][0]
              ?.toUpperCase()}`}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-sans font-medium text-sm">
            {user.name?.toUpperCase()}
          </span>
          <span className="text-xs">
            <strong>Email : </strong>
            {user.email}
          </span>
        </div>
      </div>
      <div className="absolute right-4 top-4 cursor-pointer">
        <Trash className="h-5 w-5" onClick={() => setDeletedUsers(user)} />
      </div>
    </div>
  );
};
