import React from "react";
import { AvatarDemo } from "./Avatar";
import SheetButton from "./SheetButton";
import { Bell } from "lucide-react";
import { Badge } from "../ui/badge";

interface MainNavProps {
  name: string;
  email: string;
  pic: string;
}

const MainNav: React.FC<MainNavProps> = ({ name, pic, email }) => {
  return (
    <div className="sticky top-0 h-12 w-full bg-muted flex items-center justify-between">
      <SheetButton />
      <div className="heading text-xl font-medium  ">ChatBox</div>
      <div className="user flex items-center pr-4">
        <div className="relative cursor-pointer">
          <Badge className="absolute right-2 top-[-7px]  bg-red-700 text-white rounded-[50%] text-[10px] w-2 h-5 justify-center">
            1
          </Badge>
          <Bell className="h-6 w-6  mr-4" />
        </div>
        <AvatarDemo name={name} pic={pic} email={email} />
      </div>
    </div>
  );
};

export default MainNav;
