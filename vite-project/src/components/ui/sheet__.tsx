import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./button";
import { Input } from "./input";
import axios from "../../axios";
import SearchUsers from "../ChatsComponents/SearchUsers/SearchUsers";
import { useDispatch } from "react-redux";

type userData = {
  email: string;
  name: string;
  pic: string;
  _id: string;
};
const Sheetcontainer = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<userData[] | []>([]);
  const findUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/user/findusers?search=${search}`);
      console.log(res.data.users);
      setUsers(res.data.users);
    } catch (err: any) {
      console.log(err.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Sheet key="left">
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-[380px]">
        <SheetHeader className="flex flex-col">
          <SheetTitle className="w-fit">Search User</SheetTitle>
          <SheetDescription className="w-fit mt-[-20px]">
            Search for a friend
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="flex h-8 space-x-4">
            <Input
              className=" outline-none  basis-[80%] ring-0 focus:ring-0  w-[80%] md:w-[200px]"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              className="rounded-md"
              disabled={loading}
              onClick={findUser}
            >
              Go
            </Button>
          </div>
          <div className="py-4">
            {users.length > 0 ? (
              users.map((user) => (
                <SearchUsers
                  key={user?._id}
                  userId={user?._id}
                  name={user?.name}
                  pic={user?.pic}
                  email={user?.email}
                />
              ))
            ) : (
              <strong>Nothing found</strong>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sheetcontainer;
