import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

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
import { toast } from "react-hot-toast";

export function CreateGroupChat({
  children,
  setGroupCreated,
  groupCreated,
}: {
  children: React.ReactNode;
  setGroupCreated: Dispatch<SetStateAction<boolean>>;
  groupCreated: Boolean;
}) {
  const ref = useRef();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [users, setUsers] = useState<User[] | []>([]);
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
      const newUsersList = [...users, user];
      setUsers(newUsersList);
      //removing selected friends from display
      if (displayList) {
        const newdisplayList = displayList?.filter(
          (friend) => friend.email != user.email
        );
        setDisplayList(newdisplayList);
      }
      if (friendList) {
        const newFriendList = friendList?.filter(
          (friend) => friend.email != user.email
        );
        setFriendList(newFriendList);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const newusers = JSON.stringify(users);
      const { data } = await axios.post("/chats/creategroupchat", {
        name,
        newusers,
      });
      if (data) {
        setGroupCreated(!groupCreated);
      }
      console.log("groupdadta : ", data?.newGroupChat);
      toast("Group Created!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err: any) {
      console.log(err.response);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = (friend: User) => {
    const newusers = users?.filter((user) => user.email !== friend.email);
    setUsers(newusers);
    if (displayList) setDisplayList([...displayList, friend]);
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
        <div className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={`${name}`}
              onChange={(e) => setName(e.target.value)}
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
            <div className=" flex flex-nowrap w-[380px] space-x-2 overflow-auto no-scrollbar">
              {users?.map((friend, index) => (
                <Badge
                  key={index}
                  variant="default"
                  onClick={() => handleDelete(friend)}
                  className="flex space-x-2 my-1 h-5 w-fit text-sm items-center cursor-pointer rounded-sm"
                >
                  <span className="text-white mr-1">
                    {" "}
                    {friend?.name.split(" ")[0]}
                  </span>
                  <span className="text-white">
                    {" "}
                    {friend?.name.split(" ")[1]}
                  </span>
                  <X className="h-4 w-4 text-white" />
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
          <DialogTrigger>
            <Button onClick={handleSubmit} disabled={loading}>
              Create
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
