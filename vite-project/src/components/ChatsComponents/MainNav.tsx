import { Search, Bell } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { AvatarDemo } from "./Avatar";
import SheetButton from "./SheetButton";

interface MainNavProps {
  name: string;
  email: string;
  pic: string;
}

const MainNav: React.FC<MainNavProps> = ({ name, pic, email }) => {
  return (
    <div className="sticky top-0 h-12 w-full bg-muted flex items-center justify-between">
      {/* <Button
        className="search_user px-2 border-none duration-300 active:bg-white"
        variant="ghost"
      >
        <Search className="h-4 w-4 mr-2" />
        Search User
      </Button> */}
      <SheetButton />
      <div className="heading text-xl font-medium  ">ChatBox</div>
      <div className="user flex items-center pr-4">
        <Bell className="h-6 w-6  mr-4" />
        <AvatarDemo name={name} pic={pic} email={email} />
      </div>
    </div>
  );
};

export default MainNav;
