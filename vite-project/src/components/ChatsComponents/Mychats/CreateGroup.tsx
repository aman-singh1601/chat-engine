import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "@/axios";
import { User } from "@/features/chatSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FlipMove from "react-flip-move";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

type groupProps = {
  name: string;
  friends: string[] | [];
};
const groupDataState: groupProps = {
  name: "",
  friends: [],
};

export function CreateGroupChat({ children }: { children: React.ReactNode }) {
  const ref = useRef();

  const [groupData, setGroupData] = useState(groupDataState);
  const [friend, setFriend] = useState("");
  const [friendList, setFriendList] = useState<User[] | null>(null);
  const [displayList, setDisplayList] = useState<User[] | null>(null);

  useEffect(() => {
    axios.get(`/user/findusers`).then((res) => {
      setFriendList(res.data.users);
    });
  }, []);

  useEffect(() => {
    const newList = friendList?.filter((fr) => {
      return fr.name.includes(`${friend}`);
    });
    //@ts-ignore
    setDisplayList(newList);
  }, [friend]);

  const handleUserClick = (user: User | undefined) => {
    if (user) {
      const updatedFriends = [...groupData.friends, user.name];
      setGroupData({ ...groupData, friends: updatedFriends });
      console.log(groupData);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create A Group</DialogTitle>
          <DialogDescription>
            Create a group with your frineds
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={`${groupData.name}`}
              onChange={(e) =>
                setGroupData({ ...groupData, [e.target.name]: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Friends" className="text-right">
              Friends
            </Label>
            <Input
              id="Friends"
              value={friend}
              onChange={(e) => setFriend(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col py-4">
            <div className="flex flex-wrap space-x-2 justify-start">
              {groupData.friends.map((friend) => (
                <Badge
                  variant="destructive"
                  className="flex space-x-2 my-1 text-sm items-center cursor-pointer"
                >
                  <span>{friend}</span>
                  <X className="h-4 w-4" />
                </Badge>
              ))}
            </div>
            <div className="h-[350px] overflow-y-scroll no-scrollbar">
              <FlipMove enterAnimation="elevator" leaveAnimation="elevator">
                {displayList?.map((user) => (
                  <div
                    //@ts-ignore
                    ref={ref}
                    key={user.email}
                    className="flex space-x-2 bg-slate-100 duration-300 hover:bg-slate-500 rounded-md py-2 mb-2 w-full items-center hover:cursor-pointer"
                    onClick={() => handleUserClick(user)}
                  >
                    <Avatar className="ml-4 h-10 w-10 mr-4">
                      <AvatarImage
                        src={`http://localhost:5000/uploads/profilePic/${user.pic}`}
                        alt="@shadcn"
                      />
                      <AvatarFallback>{`${user.name[0]?.toUpperCase()}${user.name
                        ?.split(" ")[1][0]
                        ?.toUpperCase()}`}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-sans font-medium text-lg">
                        {user.name?.toUpperCase()}
                      </span>
                      <span className="text-sm">
                        <strong>Email : </strong>
                        {user.email}
                      </span>
                    </div>
                  </div>
                ))}
              </FlipMove>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
