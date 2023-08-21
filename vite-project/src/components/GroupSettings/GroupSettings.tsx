import { GroupUser } from "@/components/GroupUpdate/GroupUsers";
import { AlertModal } from "@/components/Pages/modals/alertModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  activeChatProps,
  deleteUser,
  renameGroup,
} from "@/features/activeChat";
import { User, deleteUserFromGroup, editChatName } from "@/features/chatSlice";
import axios from "@/axios";
import { MoveLeft, Pencil, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

interface currentChatProps {
  activeChat: activeChatProps;
}

export const GroupSettings = () => {
  const dispatch = useDispatch();
  const { activeChat } = useSelector(
    (state: currentChatProps) => state.activeChat
  );
  //@ts-ignore
  const currentUser: User = JSON.parse(localStorage.getItem("profile"));

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(activeChat?.groupAdmin?.name);
  const [deletedUser, setDeletedUser] = useState<User | null>(null);
  useMemo(async () => {
    if (deletedUser) {
      let putData = {
        chatId: activeChat?._id,
        userId: deletedUser?._id,
      };

      const { data } = await axios.put("/chats/removeusers", putData);
      if (deletedUser) {
        dispatch(deleteUser(deletedUser));
        dispatch(deleteUserFromGroup(data));
        toast("User Deleted!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#0a0a0a",
            color: "#ffffff",
          },
        });
      }
    }
  }, [deletedUser]);

  //not for admin;
  const LeaveGroup = async () => {
    try {
      const { data } = await axios.put("/chats/deletegroup", { activeChat });
      console.log(data);
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  const handleName = async () => {
    try {
      let putData = {
        chatId: activeChat?._id,
        chatName: name,
      };
      const { data } = await axios.put("/chats/renamegchat", putData);
      if (data) {
        toast("Name Updated!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#0a0a0a",
            color: "#ffffff",
          },
        });
        dispatch(renameGroup(data.chatName));
        dispatch(editChatName(data));
      }
    } catch (err: any) {
      console.log(err.response.data);
      toast.error("Something went wrong. Please try again.");
    }
  };
  console.log(activeChat);
  console.log("name: ", activeChat?.groupAdmin);
  return (
    <>
      <AlertModal
        title="Are your sure. You want to leave the group?"
        description=""
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={LeaveGroup}
        loading={loading}
      />
      <div className="bg-white flex flex-col rounded-md mt-2 w-full h-full p-4">
        <div className="flex justify-between    items-center">
          <div className="flex space-x-2 items-center">
            <Link to="/chats">
              <MoveLeft className="h-6 w-6 cursor-pointer" />
            </Link>
            <span className="text-2xl font-sans font-medium">
              Group Settings
            </span>
          </div>

          <Button
            variant="destructive"
            className="items-center"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-4 flex space-x-2 items-center">
          <span className="text-md font-sans font-medium">Edit Name</span>
          <Input
            className="w-[180px] text-base font-sans"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={handleName}
          >
            <Pencil className=" text-black" />
          </Button>
          {activeChat?.isGroupChat ? (
            <div className="flex space-x-1 items-center">
              <span className="text-xl font-semibold">Admin : </span>
              <span className="text-md font-medium">
                {activeChat.groupAdmin?.name}
              </span>
            </div>
          ) : null}
        </div>
        <div className="mt-4 flex flex-col max-h-[400px] overflow-y-scroll no-scrollbar">
          {activeChat?.users.map((user) => (
            <GroupUser
              key={user._id}
              setDeletedUsers={setDeletedUser}
              DeletedUsers={deletedUser}
              user={user}
            />
          ))}
        </div>
        <Button className="w-fit py-2 mt-4 justify-end" disabled={loading}>
          Save Changes
        </Button>
      </div>
    </>
  );
};
