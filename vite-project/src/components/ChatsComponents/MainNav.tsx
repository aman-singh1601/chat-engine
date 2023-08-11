import React from "react";
import { AvatarDemo } from "./Avatar";
import SheetButton from "./SheetButton";
import { Bell } from "lucide-react";

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
        <Bell className="h-6 w-6  mr-4" />
        <AvatarDemo name={name} pic={pic} email={email} />
      </div>
    </div>
  );
};

export default MainNav;
