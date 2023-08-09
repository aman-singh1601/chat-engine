import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./button";
import { Input } from "./input";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const Sheetcontainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sheet key="left">
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-[320px]">
        <SheetHeader className="flex flex-col">
          <SheetTitle className="w-fit">Search User</SheetTitle>
          <SheetDescription className="w-fit mt-[-20px]">
            Search for a friend
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="flex h-8 justify-between">
            <Input className=" outline-none  ring-0 focus:ring-0  w-[80%] md:w-[200px]" />
            <Button className="rounded-md">Go</Button>
          </div>
          <div className="py-4">
            <div className="flex space-x-2 bg-slate-100 rounded-md py-2 mb-2 items-center">
              <Avatar className="ml-2 h-8 w-8">
                <AvatarImage
                  // src={`http://localhost:5000/uploads/profilePic/${pic}`}
                  alt="@shadcn"
                />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span>Piyush</span>
                <span>
                  <strong>Email : </strong>abc@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Sheetcontainer;
